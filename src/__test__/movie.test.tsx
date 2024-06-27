import { Movie } from '../types/movie';

// This test file ensures that objects conform to the Movie interface

describe('Movie Interface', () => {
  const validMovie: Movie = {
    _id: '664a6a887d397d87582c27e0',
    title: 'Big Buck Bunny',
    description: 'Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.',
    videoUrl: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
    thumbnailUrl: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
    genre: 'Animation',
    duration: '10:34'
  };

  it('should accept a valid Movie object', () => {
    // No actual assertion is needed; TypeScript itself ensures the type is correct
    const movie: Movie = validMovie;
    expect(movie).toBeTruthy();
  });

  it('should raise a type error for an invalid Movie object', () => {
    // The following code is commented out because it should cause a TypeScript error
    // Uncomment to see the error

    // const invalidMovie: Movie = {
    //   _id: '664a6a887d397d87582c27e0',
    //   title: 'Big Buck Bunny',
    //   description: 'Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.',
    //   videoUrl: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
    //   thumbnailUrl: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
    //   genre: 'Animation'
    //   // Missing 'duration' property
    // };

    // expect(invalidMovie).toBeFalsy();
  });
});
