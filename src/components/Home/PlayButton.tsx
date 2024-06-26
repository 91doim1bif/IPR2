import axios from "axios";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useHistories from "../../hooks/useHistories";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const { histories, isLoading: historiesLoading } = useHistories();
  const navigate = useNavigate();

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

  return (
    <button
      onClick={() => addHistory(movieId)}
      className="
        bg-white
        rounded-md
        py-1
        md:py-2
        px-2
        md:px-4
        w-auto
        text-xs
        lg:text-lg
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
      "
    >
      <BsFillPlayFill size={25} className="mr-1" data-testid="BsFillPlayFill" />
      Play
    </button>
  );
};

export default PlayButton;
