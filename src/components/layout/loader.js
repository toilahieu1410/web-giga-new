import React, { Fragment  } from 'react';

const Loader = (props) => {

  const { show } = props;

    return (
      <Fragment>
        {show && (
          <div className='loader-container'>
            <div className="mosaic-loader">
              <div className="cell d-0"></div>
              <div className="cell d-1"></div>
              <div className="cell d-2"></div>
              <div className="cell d-3"></div>
              <div className="cell d-1"></div>
              <div className="cell d-2"></div>
              <div className="cell d-3"></div>
              <div className="cell d-4"></div>
              <div className="cell d-2"></div>
              <div className="cell d-3"></div>
              <div className="cell d-4"></div>
              <div className="cell d-5"></div>
              <div className="cell d-3"></div>
              <div className="cell d-4"></div>
              <div className="cell d-5"></div>
              <div className="cell d-6"></div>
            </div>
          </div>
        )}
      </Fragment>
    )
};

export default Loader;