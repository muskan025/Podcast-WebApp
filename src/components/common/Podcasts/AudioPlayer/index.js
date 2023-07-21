import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
const AudioPlayer = ({ audioSrc, image }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [volume, setVolume] = useState(1);
  const audioRef = useRef();

  function handleDuration(e) {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  }

  function togglePlay() {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }
  function toggleMute() {
    if (isMute) {
      setIsMute(false);
    } else {
      setIsMute(true);
    }
  }

  function handleVolume(e) {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  }

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  },[]);

  function handleTimeUpate() {
    setCurrentTime( audioRef.current.currentTime);
  }
  function handleLoadedMetadata() {
    setDuration( audioRef.current.duration);
  }
  function handleEnded() {
    setCurrentTime(0);
    setIsPlaying(false);
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isMute) {
      audioRef.current.volume = volume;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMute]);

  function formatTime(time){
    const minutes=Math.floor(time/60)
    const seconds=Math.floor(time % 60)
    return `${minutes}:${seconds<10?"0":""}${seconds}`
  }

  return (
    <div className="custom-audio-player">
      <img src={image} className="display-image-player" />
      <audio ref={audioRef} src={audioSrc} />
      <p className="audio-btn" onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </p>
      <div className="duration-flex">
        <p>{formatTime(currentTime)}</p>

        <input
          type="range"
          onChange={handleDuration}
          value={currentTime}
          max={duration}
          className="duration-range"
        />
        <p>{formatTime(duration - currentTime)}</p>
        <p className="audio-btn" onClick={toggleMute}>
          {!isMute ? <FaVolumeUp /> : <FaVolumeMute />}
        </p>

        <input
          type="range"
          max={1}
          min={0}
          step={0.0001}
          value={volume}
          onChange={handleVolume}
          className="volume-range"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
