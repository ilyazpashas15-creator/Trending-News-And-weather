import { NewsArticle } from '@/types';

export const mockNewsArticlesByCategory: Record<string, NewsArticle[]> = {
  general: [
    {
      source: { id: 'reuters', name: 'Global Wire' },
      author: 'Sarah Jenkins',
      title: 'Global Summit Unveils New Climate Resilience and Clean Energy Accord',
      description: 'World leaders and climate researchers have ratified an ambitious initiative to accelerate green energy adoption and safeguard vulnerable regions against extreme weather.',
      url: 'https://example.com/news/climate-accord-2026',
      urlToImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30m ago
      content: 'International representatives finalized a framework to support renewable infrastructure investments and climate early warning systems worldwide.'
    },
    {
      source: { id: 'associated-press', name: 'Daily Chronicle' },
      author: 'David Chen',
      title: 'Breakthrough Transit Network Connects Major Megacities with Zero-Emission Rail',
      description: 'The continent-spanning high-speed transit project completes its primary line, cutting travel time by 60% while drastically lowering carbon emissions.',
      url: 'https://example.com/news/highspeed-rail-zero-emissions',
      urlToImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(), // 1.5h ago
      content: 'Engineers demonstrated the maglev-assisted track system that powers trains at up to 450 km/h with whisper-quiet operation.'
    },
    {
      source: { id: 'bbc-news', name: 'World Herald' },
      author: 'Elena Rostova',
      title: 'Ocean Exploration Mission Maps Hundreds of Previously Undiscovered Deep-Sea Species',
      description: 'Marine biologists returning from a four-month deep ocean expedition publish catalog of bioluminescent creatures that thrive near volcanic ocean ridges.',
      url: 'https://example.com/news/deep-sea-discoveries',
      urlToImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      content: 'The findings promise to unlock novel biochemical enzymes with broad applications in sustainable biotech.'
    }
  ],
  technology: [
    {
      source: { id: 'techcrunch', name: 'Silicon Dispatch' },
      author: 'Alex Vance',
      title: 'Next-Generation Neural Accelerators Promise 10x Efficiency in Real-Time Edge Computing',
      description: 'Hardware developers unveil novel 2-nanometer architecture enabling complex machine learning models to run locally on phones and autonomous devices with negligible battery drain.',
      url: 'https://example.com/news/neural-accelerators-2nm',
      urlToImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      content: 'The breakthrough bypasses standard silicon heat bottlenecks using diamond substrate micro-cooling channels.'
    },
    {
      source: { id: 'wired', name: 'Next Tech' },
      author: 'Maya Lin',
      title: 'Web Standards Coalition Adopts Universal Local Privacy and Quantum-Resistant Encryption',
      description: 'A coalition of global browser engines and internet architects has standardized post-quantum cryptography algorithms for every secure web connection starting this year.',
      url: 'https://example.com/news/quantum-crypto-standards',
      urlToImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      content: 'Lattice-based encryption safeguards sensitive user communications against future decryption advances.'
    },
    {
      source: { id: 'the-verge', name: 'Digital Pulse' },
      author: 'Marcus Brody',
      title: 'Open Source Robotics Platform Achieves Dexterous Human-Level Bimanual Manipulation',
      description: 'Researchers release open-weights robotic policy models that allow budget robotic arms to fold laundry, assemble circuit boards, and cook meals autonomously.',
      url: 'https://example.com/news/open-robotics-manipulation',
      urlToImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
      content: 'The open release is hailed as a major milestone for home robotics accessibility and assistive tech.'
    }
  ],
  business: [
    {
      source: { id: 'bloomberg', name: 'Market Watch' },
      author: 'Jonathan Sterling',
      title: 'Global Tech & Semiconductor Indices Reach Fresh Highs Amid Surging AI Hardware Demand',
      description: 'Markets rally as quarterly financial disclosures exceed projections across cloud infrastructure providers and automated semiconductor equipment manufacturers.',
      url: 'https://example.com/news/market-indices-fresh-highs',
      urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      content: 'Institutional capital flows into supply chain manufacturers as demand outpaces initial production forecasts.'
    },
    {
      source: { id: 'ft', name: 'Financial Times' },
      author: 'Alicia Thorne',
      title: 'Green Hydrogen Venture Closes $4B Financing Round for Gigawatt Electrolysis Plants',
      description: 'Industrial consortium backs large-scale zero-emission hydrogen generation facilities designed to decarbonize steel production and maritime freight shipping.',
      url: 'https://example.com/news/green-hydrogen-financing',
      urlToImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
      content: 'The facilities are slated to enter commercial operations by mid-2027 along prime coastal trade corridors.'
    },
    {
      source: { id: 'reuters', name: 'Commerce Post' },
      author: 'Vijay Sharma',
      title: 'Fintech Startups Revolutionize Cross-Border Settlement with Sub-Second Transactions',
      description: 'New unified payment rails slash inter-bank transfer fees by 90% while providing instant foreign exchange conversion for international businesses.',
      url: 'https://example.com/news/fintech-cross-border-settlement',
      urlToImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      content: 'Over 40 regional central banks have integrated the standardized settlement protocols.'
    }
  ],
  sports: [
    {
      source: { id: 'espn', name: 'Sports Arena' },
      author: 'Carlos Mendes',
      title: 'World Championship Thriller: Underdog Squad Triumphs in Dramatic Stoppage-Time Victory',
      description: 'An electric finale witnessed a 94th-minute volley that secured the continental championship cup in front of 85,000 roaring fans in the capital stadium.',
      url: 'https://example.com/news/world-championship-final',
      urlToImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      content: 'The team completed an undefeated tournament run after entering as 50-to-1 outsiders.'
    },
    {
      source: { id: 'athletic', name: 'Track & Field Tribune' },
      author: 'Kendra Washington',
      title: 'Decathlon World Record Shattered with Unprecedented Performance Across 10 Events',
      description: 'Olympic prodigy logs historic personal bests in pole vault and 1500-meter dash to eclipse the long-standing international decathlon point barrier.',
      url: 'https://example.com/news/decathlon-record-shattered',
      urlToImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 190).toISOString(),
      content: 'Pundits praise the balanced athleticism and rigorous biomechanical training regimen behind the feat.'
    }
  ],
  science: [
    {
      source: { id: 'nature', name: 'Scientific Frontier' },
      author: 'Dr. Liam O’Connor',
      title: 'Space Telescope Detects Water Vapor and Organic Molecules on Habitable-Zone Exoplanet',
      description: 'Spectroscopic observations of LHS 1140 b reveal thick atmospheric signatures of moisture and carbon compounds, establishing it as prime astrobiology candidate.',
      url: 'https://example.com/news/exoplanet-atmosphere-water',
      urlToImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      content: 'Follow-up orbital surveys with high-resolution coronagraphs are planned for the upcoming observing cycle.'
    },
    {
      source: { id: 'science-daily', name: 'Biotech Review' },
      author: 'Priya Narayanan',
      title: 'Engineered Microbial Envoys Successfully Neutralize Microplastics in Wastewater Tests',
      description: 'Synthetic biologists cultivate non-pathogenic bacterial strains capable of breaking down PET and polyurethane polymers into harmless organic water in under 48 hours.',
      url: 'https://example.com/news/microbial-plastic-degradation',
      urlToImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 130).toISOString(),
      content: 'Municipal water reclamation facilities are preparing pilot integration tests across five metropolitan regions.'
    }
  ],
  health: [
    {
      source: { id: 'medical-news', name: 'Health Ledger' },
      author: 'Dr. Emily Watson',
      title: 'Universal mRNA Vaccine Candidate for Seasonal Respiratory Viruses Enters Phase 3',
      description: 'A multi-target formulation shows 92% efficacy in guarding against mutating flu, RSV, and coronavirus strains simultaneously in extensive clinical evaluations.',
      url: 'https://example.com/news/universal-mrna-respiratory-vaccine',
      urlToImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
      content: 'Regulatory fast-track review has been granted following exceptional safety records in cohort studies.'
    },
    {
      source: { id: 'wellness', name: 'Longevity Focus' },
      author: 'Dr. Rajiv Patel',
      title: 'Study Correlates Consistent Circadian Lighting with Significant Cognitive Longevity',
      description: 'Longitudinal analysis across 12,000 participants highlights how natural spectral light cycles optimize melatonin rhythms and reduce long-term neural inflammation.',
      url: 'https://example.com/news/circadian-lighting-longevity',
      urlToImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
      content: 'Experts recommend prioritizing daylight exposure in early mornings to sync cellular clocks.'
    }
  ],
  entertainment: [
    {
      source: { id: 'variety', name: 'Culture & Screen' },
      author: 'Chloe Dupont',
      title: 'Groundbreaking Sci-Fi Epic Sweeps Global Box Office with Stunning Practical Visuals',
      description: 'Director’s choice to favor physical miniature sets and 70mm IMAX cinematography over total CGI pays off with unanimous critical acclaim and record attendance.',
      url: 'https://example.com/news/sci-fi-epic-box-office',
      urlToImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop',
      publishedAt: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
      content: 'Audience exit polling praised the immersive sound design and compelling philosophical themes.'
    }
  ]
};

export const getMockArticlesForCategory = (category?: string, limit: number = 20): NewsArticle[] => {
  const catKey = (category || 'general').toLowerCase();
  
  if (mockNewsArticlesByCategory[catKey]) {
    return mockNewsArticlesByCategory[catKey].slice(0, limit);
  }

  // If unknown category, return combined headlines
  const allArticles = Object.values(mockNewsArticlesByCategory).flat();
  return allArticles.slice(0, limit);
};
