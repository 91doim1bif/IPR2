import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useMovie from "../../hooks/useMovie"; // Adjust the path as needed

interface InfoModalProps {
  visible?: boolean;
  onClose: () => void;
  movieId: string | null;
  setMovieId: (id: string | null) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
  visible = false,
  onClose,
  movieId,
  setMovieId,
}) => {
  const [isVisible, setIsVisible] = useState(visible);

  const { data: movie, error, isLoading } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setMovieId(null);
    }, 300);
  }, [onClose, setMovieId]);

  if (!visible) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !movie) {
    return <div>Error loading movie information</div>;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`transform duration-300 ${
            isVisible ? "scale-100" : "scale-0"
          }`}
        >
          <div className="relative flex-auto bg-zinc-900 drop-shadow-md">
            <div className="relative h-96">
              <video
                className="w-full brightness-[60%] object-cover h-full"
                autoPlay
                muted
                loop
                poster={movie.thumbnailUrl}
                src={movie.videoUrl}
              ></video>
              <div
                onClick={handleClose}
                className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
              >
                <AiOutlineClose className="text-white" size={20} />
              </div>
              <div className="absolute bottom-[10%] left-10">
                <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                  {movie.title}
                </p>
                <div className="flex flex-row gap-4 items-center">
                  <PlayButton movieId={movie._id} />
                  <FavoriteButton movieId={movie._id} />
                </div>
              </div>
            </div>
            <div className="px-12 py-8">
              <p className="text-green-400 font-semibold text-lg">New</p>
              <p className="text-white text-lg">{movie.duration}</p>
              <p className="text-white text-lg">{movie.genre}</p>
              <p className="text-white text-lg">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
//test