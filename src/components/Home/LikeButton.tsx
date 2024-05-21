import React, { useState, useEffect } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai"; // Icons für den Like-Button
import axios from "axios";

interface LikeButtonProps {
  movieId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ movieId }) => {
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    // Initiale Überprüfung, ob der Film bereits geliked wurde
    const checkIfLiked = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}/like-status`);
        setLiked(response.data.liked);
      } catch (error) {
        console.error("Failed to fetch like status", error);
      }
    };

    checkIfLiked();
  }, [movieId]);

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.post(`/api/movies/${movieId}/unlike`);
      } else {
        await axios.post(`/api/movies/${movieId}/like`);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Failed to toggle like status", error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="text-white bg-black bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
    >
      {liked ? (
        <AiFillLike size={25} className="mr-1" />
      ) : (
        <AiOutlineLike size={25} className="mr-1" />
      )}
      Like
    </button>
  );
};

export default LikeButton;
