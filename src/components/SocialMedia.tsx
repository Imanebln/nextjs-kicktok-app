import React from "react";
import { FaFacebookF, FaShare } from "react-icons/fa";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoMdShareAlt } from "react-icons/io";
const SocialMedia = () => {
  return (
    <div className="flex flex-row gap-2">
      <button
        type="button"
        className="bg-rose-600 mb-2 inline-block rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
      >
        <RiSendPlaneFill className="h-5 w-5" />
      </button>
      <button
        type="button"
        className="bg-blue-600 mb-2 inline-block rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
      >
        <FaFacebookF className="h-5 w-5" />
      </button>
      <button
        type="button"
        className="bg-green-600 mb-2 inline-block rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
      >
        <AiOutlineWhatsApp className="h-5 w-5" />
      </button>
      <button
        type="button"
        className="bg-sky-500 mb-2 inline-block rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
      >
        <AiOutlineTwitter className="h-5 w-5" />
      </button>
      <button
        type="button"
        className="bg-black mb-2 inline-block rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
      >
        <FaShare className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SocialMedia;
