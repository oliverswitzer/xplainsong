import React, { useEffect, useState } from "react";
import WaveSurfer from 'wavesurfer';

export const Track = ({ track, play, onTrackLoaded }) => {
  const containerClass = `waveform-${track.id}`;

  const [wavesurferInstance, setWavesurferInstance] = useState();

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      waveColor: '#65913b',
      progressColor: '#7858a0',
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
