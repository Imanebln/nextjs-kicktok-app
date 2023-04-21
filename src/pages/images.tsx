import ImageCard from "../components/ImageCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
const Images = () => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    // Make a request to the Unsplash API when the component mounts
    axios
      .get("https://api.unsplash.com/photos", {
        params: {
          client_id: "WZvQi8paj4VtNEANcHjXbhyf6rviQZbtSRQV59kJoUk",
          per_page: 50, // Number of images to retrieve
        },
      })
      .then((response) => {
        setImageData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex flex-wrap gap-3 h-full">
      {imageData.map((image) => (
        <ImageCard image={image} />
      ))}
    </div>
  );
};

export default Images;
