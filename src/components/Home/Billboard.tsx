import React, { useEffect, useState } from "react";
import useBillboard from "../../hooks/useBillboard";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";

interface BillboardProps {
  onInfoClick: (movieId: string) => void;
}

const Billboard: React.FC<BillboardProps> = ({ onInfoClick }) => {
  const { data, isLoading, error } = useBillboard();
  const [isFaded, setIsFaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading billboard data</div>;
  }

  return (
    <div className="relative h-[45vw]">
      <img
        className={`
          w-full h-[45vw] object-cover brightness-[60%] transition-opacity duration-700
          ${isFaded ? "opacity-0" : "opacity-100"}
        `}
        src={data?.thumbnailUrl}
        alt="Thumbnail"
      />
      <video
        className={`
          w-full h-[45vw] object-cover brightness-[60%] transition-opacity duration-700
          absolute top-0 left-0
          ${isFaded ? "opacity-100" : "opacity-0"}
        `}
        autoPlay
        muted
        loop
        src={data?.videoUrl}
      ></video>
      <div className="absolute top-[40%] md:top-[45%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          {data?._id && <PlayButton movieId={data._id} />}
          <button
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
            onClick={() => data?._id && onInfoClick(data._id)}
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-[#141414] to-transparent"></div>
    </div>
  );
};

export default Billboard;
