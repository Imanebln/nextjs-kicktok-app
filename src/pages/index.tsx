import React from "react";
import axios from "axios";
import { Video } from "../../types";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { BASE_URL } from "../../utils";
interface IProps {
  videos: Video[];
}

export default function Home({ videos }: IProps) {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        ))
      ) : (
        <NoResults text={"No Videos"} />
      )}
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: { videos: data },
  };
};
