import React from "react";

const NotFound = ({ location }) => {
  const src =
    "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png";

  if (location && location.state && location.state.id) {
    return (
      <div className="container">
        <img
          className="mx-auto d-block"
          src={src}
          alt="Image indicating content not found"
        />
        <h5 className="text-center">
          Question &#40; ID: {location.state.id} &#41; Is Not Found
        </h5>
      </div>
    );
  } else {
    return (
      <div className="container">
        <img
          className="mx-auto d-block"
          src={src}
          alt="Image indicating content not found"
        />
        <h5 className="text-center">Page Not Found</h5>
      </div>
    );
  }
};

export default NotFound;
