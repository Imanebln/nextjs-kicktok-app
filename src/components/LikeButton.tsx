import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";

import { NextPage } from "next";

import useAuthStore from "../../store/authStore";

interface IProps {
  comments: any;
  likes: any;
  flex: string;
  handleLike: () => void;
  handleDislike: () => void;
}
const LikeButton: NextPage<IProps> = ({
  comments,
  likes,
  flex,
  handleDislike,
  handleLike,
}) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  let filterLikes = likes?.filter(
    (like: any) => like._ref === userProfile?._id
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className={`${flex} gap-6`}>
      <div className="mt-4 flex flex-row justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#DE3155]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4 "
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0} </p>
      </div>
      {/* comments */}
      <div className="mt-4 flex flex-row justify-center items-center">
        <div
          className="bg-primary rounded-full p-2 md:p-4 "
          onClick={handleLike}
        >
          <FaCommentDots className="text-lg md:text-2xl" />
        </div>

        <p className="text-md font-semibold">{comments?.length || 0} </p>
      </div>
    </div>
  );
};

export default LikeButton;
