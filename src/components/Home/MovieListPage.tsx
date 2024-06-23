import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard"; // Passe den Importpfad an deine Projektstruktur an
import { Movie } from "../../types/movie"; // Passe den Importpfad an deine Projektstruktur an
import Navbar from "../Navbar/Navbar";

const MovieListPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    genre: "",
    duration: "",
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:3080/api/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleAddMovie = async () => {
    try {
      await axios.post("http://localhost:3080/api/movies", newMovie);
      fetchMovies(); // Aktualisiere die Filmliste nach dem Hinzufügen
      setNewMovie({
        title: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: "",
        genre: "",
        duration: "",
      }); // Reset the form
    } catch (error) {
      console.error("Failed to add movie", error);
    }
  };

  return (
    <div className="bg-cover w-full h-full bg-[#141414]">
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-white my-20">Movies</h1>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {movies.map((movie) => (
            <MovieCard key={movie._id} data={movie} onInfoClick={() => {}} />
          ))}
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-white">Add New Movie</h2>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newMovie.title}
              onChange={handleInputChange}
              className="p-2 border border-gray-400 rounded"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newMovie.description}
              onChange={handleInputChange}
              className="p-2 border border-gray-400 rounded"
            />
            <input
              type="text"
              name="videoUrl"
              placeholder="Video URL"
              value={newMovie.videoUrl}
              onChange={handleInputChange}
              className="p-2 border border-gray-400 rounded"
            />
            <input
              type="text"
              name="thumbnailUrl"
              placeholder="Thumbnail URL"
              value={newMovie.thumbnailUrl}
              onChange={handleInputChange}
              className="p-2 border border-gray-400 rounded"
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={newMovie.genre}
              onChange={handleInputChange}
              className="p-2 border border-gray-400 rounded"
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={newMovie.duration}
              onChange={handleInputChange}
              className="p-2 border border-gray-400 rounded"
            />
            <button
              onClick={handleAddMovie}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Add Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieListPage;
