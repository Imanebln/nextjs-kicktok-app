import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../../utils/me4.jpg";
import axios from "axios";
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
