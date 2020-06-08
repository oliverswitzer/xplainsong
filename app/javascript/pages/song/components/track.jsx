import React, { useEffect } from "react";
import WaveSurfer from "wavesurfer";

export const Track = ({ track, songController }) => {
  const containerClass = `waveform-${track.id}`;

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      waveColor: "#65913b",
      progressColor: "#7858a0",
      container: `.${containerClass}`,
      scrollParent: true,
      hideScrollbar: true,
    });

    songController.register(wavesurfer);

    wavesurfer.load(track.url);
  }, []);

  return (
    <>
      <p>{track.name}</p>
      <div className={containerClass} />
    </>
  );
};
