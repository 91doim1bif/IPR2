import React, { useState, useEffect } from "react";
import MoviePoster from "./MoviePoster";
import { getPublicContent } from "../../services/user.service";
import "./Home.scss";

const movies = [
  {
    id: 1,
    image: "/images/kevin.jpg",
  },
  {
    id: 2,
    image: "/images/spidy.png",
  },
  {
    id: 3,
    image: "/images/terminator.jpeg",
  },
  {
    id: 4,
    image: "/images/pulp-fiction.jpg",
  },
  {
    id: 5,
    image: "images/witcher.jpg",
  },
  {
    id: 3,
    image: "/images/terminator.jpeg",
  },
  {
    id: 4,
    image: "/images/pulp-fiction.jpg",
  },
  {
    id: 5,
    image: "images/witcher.jpg",
  },
];

const Home: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <>
      <div>
        <h2 className="label">My List</h2>
      </div>
      <div className="wrapper">
        {movies.map((movie) => (
          <MoviePoster id={movie.id} image={movie.image} />
        ))}
      </div>
      <div>
        <h2 className="label">Continue Watching</h2>
      </div>
      <div className="wrapper">
        {movies.map((movie) => (
          <MoviePoster id={movie.id} image={movie.image} />
        ))}
      </div>
    </>
  );
};

export default Home;
