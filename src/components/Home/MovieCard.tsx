import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { BiChevronDown, BiX } from "react-icons/bi";
import FavoriteButton from "./FavoriteButton";
import { Movie } from "../../types/movie"; // Pfad anpassen
import axios from "axios";
import useHistories from "../../hooks/useHistories";

interface MovieCardProps {
  data: Movie;
  onInfoClick: (movieId: string) => void; // Funktion zum Anzeigen weiterer Informationen
  history: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  data,
  onInfoClick,
  history,
}) => {
  const navigate = useNavigate();
  const { histories, isLoading: historiesLoading } = useHistories();
  const [isHovered, setIsHovered] = useState(false);

  const addHistory = async (movieIdd: string) => {
    if (historiesLoading) {
      return; // Wait until histories are loaded
    }

    // Check if the movie ID already exists in histories
    const movieExists = histories.some((history) => history._id === movieIdd);

    if (movieExists) {
      navigate(`/watch/${movieIdd}`);
      return;
    }

    let currentProfile = localStorage.getItem("profile");
    try {
      const response = await axios.post(
        `http://localhost:3080/api/histories/${currentProfile}`,
        {
          movieId: movieIdd,
        }
      );
      navigate(`/watch/${movieIdd}`);
    } catch (error) {
      console.error("Error adding histories:", error);
    }
  };

  const del = async (movieIdd: any) => {
    let currentProfile = localStorage.getItem("profile");
    try {
      const response = await axios.delete(
        `http://localhost:3080/api/history/${currentProfile}/${movieIdd}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error adding histories:", error);
    }
  };

  return (
    <div
      className={`group bg-zinc-900 col-span relative ${
        isHovered ? "h-[16vw]" : "h-[12vw]"
      } ${isHovered ? "z-50" : "z-10"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative
          w-full
          h-full
          overflow-hidden
          transition-transform
          duration-500
          ${isHovered ? "scale-125" : "scale-100"}
        `}
      >
        <img
          className={`
            cursor-pointer
            object-cover
            transition-opacity
            duration-500
            shadow-xl
            rounded-md
            w-full
            h-[12vw]
          `}
          src={data.thumbnailUrl}
          alt="Thumbnail"
        />
        {isHovered && (
          <video
            className={`
            cursor-pointer
            object-cover
            transition-opacity
            duration-500
            shadow-xl
            rounded-md
            w-full
            h-[12vw]
            absolute
            top-0
            left-0
            opacity-100
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
            src={data.videoUrl}
            autoPlay
            muted
            loop
          />
        )}
        <div
          className={`
            absolute
            bottom-0
            w-full
            bg-black
            transition-opacity
            duration-300
            ${isHovered ? "opacity-100 h-[5vw]" : "opacity-0 h-0"}
          `}
        >
          <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="
                  bg-white
                  rounded-full
                  h-10
                  w-10
                  flex
                  justify-center
                  items-center
                  transition
                  hover:bg-neutral-300
                "
                onClick={() => addHistory(data._id)}
              >
                <BsFillPlayFill size={30} />
              </div>
              <FavoriteButton movieId={data._id} />
              {history && (
                <div
                  className="
                    bg-white
                    rounded-full
                    h-10
                    w-10
                    flex
                    justify-center
                    items-center
                    transition
                    hover:bg-neutral-300
                  "
                  onClick={() => del(data._id)}
                >
                  <BiX size={30} />
                </div>
              )}
              <div
                onClick={() => onInfoClick(data._id)}
                className="
                  ml-auto
                  group/item
                  w-6
                  h-6
                  lg:w-10
                  lg:h-10
                  border-white
                  border-2
                  rounded-full
                  flex
                  justify-center
                  items-center
                  transition
                  hover:border-neutral-300
                "
              >
                <BiChevronDown
                  size={30}
                  className="text-white group-hover/item:text-neutral-300"
                />
              </div>
            </div>
            <p className="text-green-400 font-semibold">
              New <span className="text-white">2023</span>
            </p>
            <div className="flex flex-row gap-2 items-center mt-2">
              <p className="text-white text-[10px] lg:text-sm">
                {data.duration}
              </p>
              <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
