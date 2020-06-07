import { SongGateway } from "../../gateways/song_gateway";
import React, { useEffect, useState } from "react";
import { useFetch } from "../../shared/hooks/use_fetch";
import { Track } from "./components/track";
import LinearProgress from "@material-ui/core/LinearProgress";
import {TrackController} from "./track_controller";

function percentageOfLoadedTracks(trackStates, tracks) {
  return (trackStates.filter((trackState) => trackState === "loaded")
      .length /
    tracks.length) *
    100;
}

export default ({
  match: {
    params: { songId },
  },
  trackController
}) => {
  const [trackStates, setTrackStates] = useState([]);
  const [showTracks, setShowTracks] = useState(false);

  useEffect(() => {
    return () => {
      trackController.unsubscribe();
    }
  }, [])

  const song = useFetch(async () => await SongGateway.find({ songId }));

  useEffect(() => {
    if (song) {
      setTrackStates(new Array(song.tracks.length).fill("loading"));
    }
  }, [song]);

  useEffect(() => {
    if (trackStates.length > 0 && trackStates.every((state) => state === "loaded")) {
      setShowTracks(true);
    }
  }, [trackStates]);

  const handleOnTrackLoaded = (trackIndex) => {
    // It is necessary to pass a function to setTrackStates so that we always
    // have the latest version of trackStates. This was not happening by default,
    // likely due to a stale closure reference to trackState whenever this function
    // (handleOnTrackLoad) was called on each render.

    setTrackStates(trackStates => {
      const newTrackStates = [...trackStates];
      newTrackStates[trackIndex] = 'loaded';

      return newTrackStates
    });
  };

  return (
    song && (
      <>
        <h1>{song.title}</h1>

        {!showTracks && (
          <LinearProgress
            variant="determinate"
            value={percentageOfLoadedTracks(trackStates, song.tracks)}
          />
        )}
        <div style={showTracks ? {} : { display: "none" }}>
          <button onClick={() => trackController.play()}>Play</button>
          <button onClick={() => trackController.stop()}>Stop</button>
          <div>
            {song.tracks.map((track, trackIndex) => (
              <div key={track.id} data-test="track">
                <Track
                  trackController={trackController}
                  onTrackLoaded={() => handleOnTrackLoaded(trackIndex)}
                  track={track}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
};
