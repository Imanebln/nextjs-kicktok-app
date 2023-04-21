import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../../utils/me4.jpg";
import axios from "axios";
const ImageCard = ({ image }: any) => {
  return (
    <div>
      <div className="flex gap-4 relative">
        <div className="rounded-3xl">
          {/* {imageData.map((image) => ( */}
          <Link href="/">
            <>
              <Image
                width={180}
                height={300}
                className="h-[100px] w-[50px] rounded-2xl cursor-pointer object-cover"
                src={image.urls.regular}
                alt="user-profile"
              />
            </>
          </Link>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
