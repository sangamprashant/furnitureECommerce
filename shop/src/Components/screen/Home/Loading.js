import React from 'react';

const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner-border text-primary spinner-border-lg" role="status">
        <span className="sr-only"></span>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
