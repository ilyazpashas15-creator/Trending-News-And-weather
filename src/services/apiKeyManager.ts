/**
 * API Key Manager - Automatic Failover System
 * Manages multiple NewsData.io API keys and automatically switches when rate limits are hit
 */

interface APIKeyConfig {
  key: string;
  name: string;
  limitReached: boolean;
  lastErrorTime: Date | null;
  dailyLimit: number;
  currentUsage: number;
}

interface APIKeyStore {
  primary: APIKeyConfig;
  secondary: APIKeyConfig;
}

class APIKeyManager {
  private keys: APIKeyStore;
  private currentActive: 'primary' | 'secondary';
  private readonly RESET_HOURS = 24; // Reset after 24 hours

  constructor() {
    const primaryKey = process.env.NEXT_PUBLIC_NEWS_API_KEY_PRIMARY || process.env.NEWS_API_KEY_PRIMARY || '';
    const secondaryKey = process.env.NEXT_PUBLIC_NEWS_API_KEY_SECONDARY || process.env.NEWS_API_KEY_SECONDARY || '';

    console.log('🔑 Initializing API Key Manager');
    console.log(`Primary Key: ${primaryKey ? primaryKey.substring(0, 10) + '...' : 'NOT FOUND'}`);
    console.log(`Secondary Key: ${secondaryKey ? secondaryKey.substring(0, 10) + '...' : 'NOT FOUND'}`);

    if (!primaryKey && !secondaryKey) {
      console.error('❌ No API keys found in environment variables!');
    }

    this.keys = {
      primary: {
        key: primaryKey,
        name: 'Primary Key',
        limitReached: false,
        lastErrorTime: null,
        dailyLimit: 200, // NewsData.io free tier limit
        currentUsage: 0,
      },
      secondary: {
        key: secondaryKey,
        name: 'Secondary Key',
        limitReached: false,
        lastErrorTime: null,
        dailyLimit: 200,
        currentUsage: 0,
      },
    };

    this.currentActive = 'primary';
    this.checkAndResetLimits();
  }

  /**
   * Get the currently active API key
   */
  getActiveKey(): string {
    // Check if keys need to be reset
    this.checkAndResetLimits();

    // Try primary key first
    if (!this.keys.primary.limitReached && this.keys.primary.key) {
      this.currentActive = 'primary';
      return this.keys.primary.key;
    }

    // Fallback to secondary key
    if (!this.keys.secondary.limitReached && this.keys.secondary.key) {
      this.currentActive = 'secondary';
      console.log('🔄 Switched to Secondary API Key');
      return this.keys.secondary.key;
    }

    // Both keys exhausted
    throw new Error('All API keys have reached their rate limits. Please wait for reset.');
  }

  /**
   * Check if an error is a rate limit error
   */
  isLimitError(error: any): boolean {
    const errorString = String(error).toLowerCase();
    const limitIndicators = [
      'rate limit',
      'quota exceeded',
      'insufficient credits',
      'limit reached',
      'too many requests',
      '429',
      'apilimitexceeded',
    ];

    // Don't treat 401 (unauthorized) as a rate limit error
    if (errorString.includes('401') || errorString.includes('unauthorized') || errorString.includes('not valid')) {
      console.error('❌ API Key is invalid or unauthorized');
      return false;
    }

    return limitIndicators.some(indicator => errorString.includes(indicator));
  }

  /**
   * Mark the current key as exhausted and switch to the next one
   */
  markCurrentKeyExhausted(): void {
    const currentKey = this.keys[this.currentActive];
    currentKey.limitReached = true;
    currentKey.lastErrorTime = new Date();

    console.warn(`⚠️ ${currentKey.name} has reached its rate limit`);

    // Try to switch to the other key
    const otherKey = this.currentActive === 'primary' ? 'secondary' : 'primary';
    if (!this.keys[otherKey].limitReached) {
      console.log(`🔄 Automatically switching to ${this.keys[otherKey].name}`);
    } else {
      console.error('❌ Both API keys are exhausted. Please wait for daily reset.');
    }
  }

  /**
   * Increment usage counter for the current key
   */
  incrementUsage(): void {
    this.keys[this.currentActive].currentUsage++;
  }

  /**
   * Check if keys should be reset based on time elapsed
   */
  private checkAndResetLimits(): void {
    const now = new Date();

    Object.entries(this.keys).forEach(([keyName, keyData]) => {
      if (keyData.limitReached && keyData.lastErrorTime) {
        const hoursSinceError = (now.getTime() - keyData.lastErrorTime.getTime()) / (1000 * 60 * 60);

        if (hoursSinceError >= this.RESET_HOURS) {
          keyData.limitReached = false;
          keyData.currentUsage = 0;
          keyData.lastErrorTime = null;
          console.log(`✅ ${keyData.name} has been reset after ${this.RESET_HOURS} hours`);
        }
      }
    });
  }

  /**
   * Get current status of all keys
   */
  getStatus(): string {
    const primaryStatus = this.keys.primary.limitReached ? '❌ EXHAUSTED' : '✅ ACTIVE';
    const secondaryStatus = this.keys.secondary.limitReached ? '❌ EXHAUSTED' : '✅ ACTIVE';
    const currentIndicator = (key: 'primary' | 'secondary') => this.currentActive === key ? '👉' : '  ';

    return `
API Key Status:
${currentIndicator('primary')} Primary Key: ${primaryStatus} (${this.keys.primary.currentUsage}/${this.keys.primary.dailyLimit} requests)
${currentIndicator('secondary')} Secondary Key: ${secondaryStatus} (${this.keys.secondary.currentUsage}/${this.keys.secondary.dailyLimit} requests)
    `.trim();
  }

  /**
   * Make an API call with automatic failover
   */
  async makeAPICall<T>(
    apiCallFunction: (apiKey: string) => Promise<T>,
    maxRetries: number = 2
  ): Promise<T> {
    let lastError: any;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const activeKey = this.getActiveKey();
        const result = await apiCallFunction(activeKey);
        this.incrementUsage();
        return result;
      } catch (error) {
        lastError = error;

        if (this.isLimitError(error)) {
          this.markCurrentKeyExhausted();
          
          // Check if we have another key to try
          const otherKey = this.currentActive === 'primary' ? 'secondary' : 'primary';
          if (!this.keys[otherKey].limitReached) {
            console.log(`🔄 Retrying with ${this.keys[otherKey].name}...`);
            continue; // Retry with the other key
          } else {
            throw new Error('All API keys exhausted. Please wait for daily reset.');
          }
        } else {
          // Not a rate limit error, throw immediately
          throw error;
        }
      }
    }

    throw lastError;
  }
}

// Create a singleton instance
const apiKeyManager = new APIKeyManager();

export default apiKeyManager;
