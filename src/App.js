import "./styles/App.scss";
import data from "./data";
import { useState, useRef } from "react";
// add components
import Song from "./conponents/Song";
import Player from "./conponents/Player";
import Library from "./conponents/Library";
import Nav from "./conponents/nav";

function App() {
  const [songs, setSongs] = useState(data());
  const [isPlaying, setIsplaying] = useState(false);
  const [currentSong, setCurrentsongs] = useState(songs[0]);
  const audioRef = useRef(null);
  const timeUpdateHandler = (e) => {
    const duration = e.target.duration;
    const currentDuration = e.target.currentTime;
    const animation = Math.round(
      (Math.round(currentDuration) / Math.round(duration)) * 100
    );
    // console.log(animation);
    setSongInfo({
      currentDuration: currentDuration,
      Duration: duration,
      animateDuration: animation,
    });
  };
  const [songInfo, setSongInfo] = useState({
    currentDuration: 0,
    Duration: 0,
    animateDuration: 0,
  });
  const [libraryOpen, setLibraryOpen] = useState(false);
  const skipSongHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentsongs(songs[(currentIndex + 1) % songs.length]);
    // console.log(currentIndex+1,songs.length)
    // console.log(currentIndex + 1 %  songs.length);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className="App">
      <Nav libraryOpen={libraryOpen} setLibraryOpen={setLibraryOpen} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsplaying={setIsplaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentsongs={setCurrentsongs}
        setSongs={setSongs}
      />

      <Library
        songs={songs}
        setCurrentsongs={setCurrentsongs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryOpen={libraryOpen}
      />

      <audio
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        src={currentSong.audio}
        onEnded={skipSongHandler}
      ></audio>
    </div>
  );
}
export default App;
