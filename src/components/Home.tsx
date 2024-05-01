import React, { useState, useEffect } from "react";
import { getPublicContent } from "../services/user.service";

const Home: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("./videos/test.mp4"); // Assuming the video file is in the 'public/videos' folder
  const audioUrl = "/audio/background_music.mp3"; // Assuming the audio file is in the 'public/audio' folder
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.loop = true;
    video.muted = false; // Mute the video to prevent its audio from overlapping with the background music
    video.play().catch(error => {
      console.error("Error playing video:", error);
    });
    setVideoElement(video);

    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
    setAudioElement(audio);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        audio.pause();
      } else {
        video.play().catch(error => {
          console.error("Error resuming video:", error);
        });
        audio.play().catch(error => {
          console.error("Error resuming audio:", error);
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Cleanup
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.pause();
      audio.pause();
    };
  }, [videoUrl, audioUrl]);

  return (
    <div className="container mt-3">
      <header>
        <h1>Startseite</h1>
      </header>
      {/* Video Player */}
      <div className="video-container">
        <video className="background-video" autoPlay muted loop ref={setVideoElement}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="bottom-text">
          <h4>About "Jujutsu Kaisen"</h4>
          <p>"Jujutsu Kaisen" is a Japanese manga series written and illustrated by Gege Akutami. The story follows high school student Yuji Itadori as he joins a secret organization of sorcerers to fight curses and demons.</p>
          <h4>About Episode 1</h4>
          <p>The first episode introduces Yuji Itadori, a high school student with incredible physical abilities. When he encounters a cursed object, he is thrust into the world of curses and sorcerers, setting the stage for an epic adventure.</p>
      </div>
    </div>
  );
};

export default Home;
