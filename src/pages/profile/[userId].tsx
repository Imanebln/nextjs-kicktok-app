import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import { IUser, Video } from "../../../types";
import { BASE_URL } from "../../../utils";
import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const { user, userVideos, userLikedVideos } = data;
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };
    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos]);

  const getUserLikes = () => {
    let likes = 0;
    if (userVideos && userVideos.length) {
      userVideos.map((video) => {
        likes += video.likes?.length ?? 0;
      });
    }
    return likes;
  };

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            width={120}
            height={120}
            layout="responsive"
            className="rounded-full"
            src={user.image}
            alt="user-profile"
          />
        </div>

        <div className="mt-3">
          <div className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-start lowercase">
            <span>{user.userName.replace(/\s+/g, "")} </span>
            <GoVerified className="text-blue-400 md:text-xl text-md" />
          </div>
          <p className="text-sm font-medium"> {user.userName}</p>
          <div className="flex flex-row gap-3 mt-8">
            <div>
              <strong>0</strong> Following
            </div>
            <div>
              <strong>0</strong> Followers
            </div>
            <div>
              <strong> {getUserLikes()} </strong>{" "}
              {getUserLikes() > 1 ? "Likes" : "Like"}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} isShowingOnHome={false} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const response = await axios.get(`${BASE_URL}/api/profile/${userId}`);
  return { props: { data: response.data } };
};

export default Profile;
