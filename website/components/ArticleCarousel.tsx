import React from 'react';

interface Article {
  title: string;
  url: string;
  preview: string;
}

interface ArticleCarouselProps {
  articles: Article[];
}

const ArticleCarousel: React.FC<ArticleCarouselProps> = ({ articles }) => {
  return (
    <div className="flex overflow-x-auto space-x-4 pb-4">
      {articles.map((article, index) => (
        <div key={index} className="flex-none w-64 bg-white shadow-md rounded-lg p-4">
          <h3 className="font-bold mb-2">{article.title}</h3>
          <p className="text-sm mb-4">{article.preview}</p>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default ArticleCarousel;
