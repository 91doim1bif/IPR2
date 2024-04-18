import React, { useState, useEffect } from "react";
import MoviePoster from "./MoviePoster";
import { getPublicContent } from "../../services/user.service";
import "./Home.scss";

const movies = [
  {
    id: 1,
    image: "/images/kevin.png",
  },
  {
    id: 2,
    image: "/images/spidy.png",
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
    <div className="container">
      <h1>Czerwony</h1>
      <h2 className="h1_special">Here is red colour</h2>
      {movies.map((movie) => (
        <MoviePoster id={movie.id} image={movie.image} />
      ))}
    </div>
  );
};

export default Home;
