import React, { useEffect, useState } from "react";
import WaveSurfer from 'wavesurfer';

export const Track = ({ track, play, onTrackLoaded, trackController }) => {
  const containerClass = `waveform-${track.id}`;

  const [wavesurferInstance, setWavesurferInstance] = useState();

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      waveColor: '#65913b',
      progressColor: '#7858a0',
      container: `.${containerClass}`,
      scrollParent: true,
      hideScrollbar: true
    });

    setWavesurferInstance(wavesurfer);
    trackController.register(wavesurfer)

    wavesurfer.load(track.url)
  }, []);

  useEffect(() => {
    if(wavesurferInstance) {
      wavesurferInstance.on('ready', () => {
        onTrackLoaded()
      })
    }
  }, [wavesurferInstance]);

  return (
    <>
      <p>{track.name}</p>
      <div className={containerClass}/>
    </>
  );
};
