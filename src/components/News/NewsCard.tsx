/* NewsCard component that displays individual news article details such as title, image, and source.
   It also includes a button to open the detailed news modal for a more comprehensive view. */

import React, { useState } from "react";
import NewsDetailModal from "./NewsDetailModal";

// Interface defining the structure of the article prop
interface NewsCardProps {
  article: {
    title: string;
    source: string;
    imageUrl: string | undefined;
    url: string | undefined;
    author: string | undefined;
    content: string | null;
    description?: string;
    publishedAt?: string;
  };
}

// Functional component to display a news card
const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  // State to control visibility of the news detail modal
  const [showNewsDetailModal, setShowNewsDetailModal] =
    useState<boolean>(false);

  // // Opens the news detail modal - popup
  const handleOpenNewsDetailModal = () => {
    setShowNewsDetailModal(true);
  };

  // // Closes the news detail modal - popup
  const handleCloseNewsDetailModal = () => {
    setShowNewsDetailModal(false);
  };

  return (
    <div className="col-md-4">
      <div className="card h-100 news-card">
        {/* Background image of the news card */}
        <div
          className="news-card-image"
          style={{
            backgroundImage: `url(${
              article.imageUrl ||
              `/assets/img/img${Math.floor(Math.random() * 6) + 1}.jpg`
            })`,
          }}
        ></div>
        <div className="card-body">
          {/* title of the article */}
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">
            {/* source of the article  example:NewsAPI,NYTimes etc*/}
            <strong>Source:</strong> {article.source}
          </p>

          {/* Button to open the news detail modal */}
          <button
            className="btn btn-danger"
            onClick={handleOpenNewsDetailModal}
          >
            Read More
          </button>
        </div>
      </div>

      {/* Modal for displaying detailed news content */}
      <NewsDetailModal
        article={article}
        show={showNewsDetailModal}
        onClose={handleCloseNewsDetailModal}
      />
    </div>
  );
};

export default NewsCard;
