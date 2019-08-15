import React from 'react';

import './preloader.scss';

const Preloader = () => {

  return (
    <div className="preloader-container">
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>

  )
}


export default Preloader;