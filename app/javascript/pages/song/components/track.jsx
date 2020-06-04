import React, { useEffect, useState } from "react";
import WaveSurfer from 'wavesurfer';

export const Track = ({ track, play }) => {
  const containerClass = `waveform-${track.id}`;

  const [wavesurferInstance, setWavesurferInstance] = useState();

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: `.${containerClass}`,
      scrollParent: true
    });

    setWavesurferInstance(wavesurfer);

    wavesurfer.load(track.url)
  }, []);

  useEffect(() => {
    if(wavesurferInstance) {
      !!play ? wavesurferInstance.play() : wavesurferInstance.stop();
    }
  }, [wavesurferInstance, play]);

  return (
    <>
      <p>{track.name}</p>
      <div className={containerClass}/>
    </>
  );
};
