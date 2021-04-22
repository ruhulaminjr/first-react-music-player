import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsplaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentsongs,
  setSongs,
}) => {
  const timeUpdate = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const playSongHandler = async () => {
    if (isPlaying) {
      audioRef.current.pause();
      await setIsplaying(!isPlaying);
    } else {
      audioRef.current.play();
      await setIsplaying(!isPlaying);
    }
  };
  const UseEffectHandler = (nexsong)=>{
        const newsongs = songs.map((s) => {
          if (s.id === nexsong.id) {
            return {
              ...s,
              active: true,
            };
          } else {
            return {
              ...s,
              active: false,
            };
          }
        });
        setSongs(newsongs);
        // console.log(54);
  }
  const inputHandler = async (e) => {
    // console.log(audioRef.current.value);
    // console.log(audioRef);
    audioRef.current.currentTime = e.target.value;
    await setSongInfo({ ...songInfo, currentDuration: e.target.value });
  };
  const skipSongHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skipForward") {
      await setCurrentsongs(songs[(currentIndex + 1) % songs.length]);
      // console.log(currentIndex+1,songs.length)
      UseEffectHandler(songs[(currentIndex + 1) % songs.length]);
      // console.log(currentIndex + 1 %  songs.length);
    }
    if (direction === "skipBack") {
      if ((currentIndex - 1) % songs.length < 0) {
        await setCurrentsongs(songs[songs.length - 1]);
        UseEffectHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentsongs(songs[(currentIndex - 1) % songs.length]);
      UseEffectHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };
  // animate track
  const animatetrack = {
    transform: `translateX(${songInfo.animateDuration}%)`,
  };
  // console.log(animatetrack);
  const songColor = {
    background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
  };
  // console.log(songColor)
  return (
    <div className="player">
      <div className="time-control">
        <p>{timeUpdate(songInfo.currentDuration)}</p>
        <div className="track" style={songColor}>
          <input
            type="range"
            min={0}
            max={songInfo.Duration || 0}
            onChange={inputHandler}
            value={songInfo.currentDuration}
          />
          <div style={animatetrack} className="animate-track"></div>
        </div>
        <p>{songInfo.Duration ? timeUpdate(songInfo.Duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipSongHandler("skipBack")}
        />
        <FontAwesomeIcon
          className="play"
          size="2x"
          icon={!isPlaying ? faPlay : faPause}
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipSongHandler("skipForward")}
        />
      </div>
     <div className="download">
        <button className="download-btn">
          <a href={link}>Download Now</a>
        </div>
    </div>
  );
};

export default Player;
