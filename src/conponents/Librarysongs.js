import React from "react";

const Librarysong = ({
  song,
  setCurrentsongs,
  audioRef,
  isPlaying,
  songs,
  setSongs,
}) => {
      const librarySonghandler =async () => {
       await setCurrentsongs(song);
        // console.log(newsongs);
        if(isPlaying) audioRef.current.play();
      };
  return (
    <div
      className={`librarysong-container ${song.active ? "selected" : ""}`}
      onClick={librarySonghandler}
    >
      {/* {console.log(song.cover)} */}
      <img src={song.cover} alt="{song.name}" />
      <div className="sond-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default Librarysong;
