import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { FaUserAltSlash } from "react-icons/fa";
interface IProps {
  text: string;
}
import { FaCommentSlash } from "react-icons/fa";
const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">
        {text.includes("comment") ? (
          <FaCommentSlash />
        ) : text.includes("Video") ? (
          <MdOutlineVideocamOff />
        ) : (
          <FaUserAltSlash />
        )}
      </p>
      <p className="mt-6 text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
