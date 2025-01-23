// This component displays a popup with full news details, including title, source, image, URL, author, content, and more.
import React from "react";

// Props interface defining the structure of data required by the component
interface NewsDetailModalProps {
  article: {
    title: string;
    source: string;
    imageUrl: string | undefined;
    url: string | undefined;
    author: string | undefined;
    content: string | null;
    description?: string;
    publishedAt?: string;
  } | null;
  show: boolean;
  onClose: () => void;
}

const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  article,
  show,
  onClose,
}) => {
  // If no article is provided, render nothing
  if (!article) return null;

  return (
    // Modal wrapper with conditional visibility based on the `show` prop
    <div
      className={`modal newsdetailmodal ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
      tabIndex={-1}
      role="dialog"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{article.title}</h5>
            <button type="button" aria-label="Close" className="btn-close" onClick={onClose}>
            </button>
          </div>

          {/* Modal body with detailed news information */}
          <div className="modal-body">
            {/* Display image if available */}
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="img-fluid mb-3 news-image"
              />
            )}

            {/* Display author name */}
            <p>
              <strong>Author:</strong> {article.author || "Unknown"}
            </p>

            {/* Display publication date */}
            <p>
              <strong>Published At:</strong> {article.publishedAt || "N/A"}
            </p>

            {/* Display source name */}
            <p>
              <strong>Source:</strong> {article.source}
            </p>

            {/* Display description if available */}
            {article.description && (
              <div>
                <h6>Description:</h6>
                <p>{article.description}</p>
              </div>
            )}

            {/* Display content if available */}
            {article.content && (
              <div>
                <h6>Content:</h6>
                <div
                  className="news-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            )}

            {/* Display button that redirects to the original article in the source platform if available */}
            {article.url && (
              <div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-danger"
                >
                  Read Full Article
                </a>
              </div>
            )}
          </div>

          {/* Modal footer with close button */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailModal;
