import React from "react";
const ImageCard = ({ image }: any) => {
  return (
    <img
      className="rounded-2xl cursor-pointer"
      src={image.urls.regular}
      alt={image.alt_description}
    />
  );
};

export default ImageCard;
