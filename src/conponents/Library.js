import React from "react";

import Librarysong from "./Librarysongs";

const Library = ({
  songs,
  setCurrentsongs,
  audioRef,
  isPlaying,
  setSongs,
  libraryOpen,
}) => {
  return (
    <div className={`library ${libraryOpen ? "library-active" : ""}`}>
      <h2>Library</h2>
      <div className="song-library">
        {/* {console.log(songs[0].name)} */}
        {songs.map((song) => (
          <Librarysong
            song={song}
            setCurrentsongs={setCurrentsongs}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            songs={songs}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
