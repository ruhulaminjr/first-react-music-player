export const playAudio = (isPlaying,audioRef)=>{
    if (isPlaying) {
      const playAudio = audioRef.current.play();
      // console.log(playAudio);
      if (playAudio !== undefined) {
        playAudio.then(
          (audio) => audioRef.current.play()
          //  console.log(playAudio)
        );
      }
    }
}