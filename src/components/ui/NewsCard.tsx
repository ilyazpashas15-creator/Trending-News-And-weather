import React from 'react';
import { NewsArticle } from '@/types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {article.urlToImage && (
        <img 
          src={article.urlToImage} 
          alt={article.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite loop
            target.style.display = 'none';
          }}
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{article.title}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
          <span className="font-medium">{article.source.name}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        <div className="flex justify-between items-center">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Read more →
          </a>
          {article.author && (
            <span className="text-gray-500 text-xs">By {article.author}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;