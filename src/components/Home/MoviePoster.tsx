import React, { useState, useEffect } from 'react';
import './MoviePoster.scss';

interface Movie {
  id: number;
  image: string;
}

function MoviePoster(movie: Movie) {
  return (
    <div className="movie-poster">
      <img src={movie.image} alt="test" />
    </div>
  );
}

export default MoviePoster;
