import React, { useEffect, useState } from "react";
import WaveSurfer from 'wavesurfer';

export const Track = ({ track }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: '#waveform',
      scrollParent: true
    });

    wavesurfer.on('ready', () => setIsLoading(false));

    wavesurfer.load(track.url)
  }, []);

  return (
    <>
      <div id="waveform"/>
    </>
  );
};
