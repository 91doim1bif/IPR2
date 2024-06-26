import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useMovie from "../../hooks/useMovie";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const { data: movie, isLoading, error } = useMovie(movieId ?? null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !movie) {
    return <div>Error loading movie</div>;
  }

  const isYouTube = (url: string) => {
    const isYoutubeLink = url.includes("youtube") || url.includes("youtu");
    return isYoutubeLink;
  };

  const youtubeId = isYouTube(movie.videoUrl);

  return (
    <div className="relative w-full h-screen bg-black">
      <div className="absolute top-0 left-0 p-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-50 transition"
        >
          <AiOutlineArrowLeft size={30} />
        </button>
      </div>
      {youtubeId ? (
        <iframe
          className="w-full h-full"
          src={`${movie.videoUrl}`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube video player"
        ></iframe>
      ) : (
        <video
          className="w-full h-full object-cover"
          autoPlay
          controls
          src={movie.videoUrl}
          data-testid="video-element"
        ></video>
      )}
    </div>
  );
};

export default Watch;
