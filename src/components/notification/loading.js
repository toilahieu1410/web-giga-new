import React from "react";

const Loading = () => {

  return (
    <div className="position-relative bg-white d-inline-block position-loading">
      <div className="position-relative loading loading-screen ">
        <div className="loadingspinner"></div>
      </div>
    </div>
  );
};

export default Loading;
