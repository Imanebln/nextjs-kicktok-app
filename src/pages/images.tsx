import ImageCard from "../components/ImageCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import { FiLoader } from "react-icons/fi";
const Images = () => {
  const [imageData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate a random number between 1 and 1000
    const randomPage = Math.floor(Math.random() * 1000) + 1;

    // Make a request to the Unsplash API when the component mounts
    axios
      .get(`https://api.unsplash.com/photos?page=${randomPage}`, {
        params: {
          client_id: "WZvQi8paj4VtNEANcHjXbhyf6rviQZbtSRQV59kJoUk",
          // query: "mercedes",
          per_page: 30, // Number of images to retrieve
        },
      })
      .then((response) => {
        setImageData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const breakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    486: 1,
  };
  return (
    <div>
      {isLoading ? (
        <div className="flex flex-row text-2xl font-bold justify-center align-middle mt-28 gap-5 m-auto">
          {" "}
          <FiLoader />
          <span>Loading...</span>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {imageData.map((image, index) => (
            <div key={index}>
              <ImageCard image={image} />
            </div>
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default Images;
