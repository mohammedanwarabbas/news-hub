// Displays a spinner animation to indicate a loading state.
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    // Container for the loading spinner
    <div className="spinner-container">
      {/* Spinner element with animation */}
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
