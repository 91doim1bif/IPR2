import React, { useState, useEffect } from "react";

interface Movie {
  id: number;
  image: string;
}

function MoviePoster(movie: Movie) {
  return <img src={movie.image} alt={movie.id.toString()} />;
}

export default MoviePoster;
