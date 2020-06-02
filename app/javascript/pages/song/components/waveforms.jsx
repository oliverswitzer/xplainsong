import React, { useEffect } from 'react'
import * as WaveformPlaylist from 'waveform-playlist'

export const Waveforms = ({ tracks }) => {
  useEffect(() => {
    const playlist = WaveformPlaylist.init({
      samplesPerPixel: 3000,
      mono: true,
      waveHeight: 70,
      container: document.getElementById('playlist'),
      state: 'cursor',
      colors: {
        waveOutlineColor: '#E0EFF1',
        timeColor: 'grey',
        fadeColor: 'black'
      },
      controls: {
        show: true,
        width: 400
      },
      zoomLevels: [500, 1000, 3000, 5000]
    });

    const loadableTracks = tracks.map(track => ({
      src: track.url,
      name: track.name
    }));

    playlist.load(loadableTracks);

    const ee = playlist.getEventEmitter();

    const playButton = document.querySelector('#waveform .btn-play');
    const stopButton = document.querySelector('#waveform .btn-stop');

    const onPlayListener = () => ee.emit("play");
    playButton.addEventListener("click", onPlayListener);

    const onStopListener = () => ee.emit("stop");
    stopButton.addEventListener("click", onStopListener);

    return () => {
      stopButton.removeEventListener('click', onStopListener);
      playButton.removeEventListener('click', onPlayListener);
    }
  });

  return (
    <div id="waveform">
      <div id="top-bar" className="playlist-top-bar">
        <div className="playlist-toolbar">
          <div className="btn-group">
            <span className="btn-play btn btn-success"><i className="fa fa-play"></i></span>
            <span className="btn-stop btn btn-danger"><i className="fa fa-stop"></i></span>
          </div>
          <span className="audio-pos"/>
        </div>
      </div>

      <div id="playlist" />
    </div>
  )
};

