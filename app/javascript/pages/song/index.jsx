import { SongGateway } from "../../gateways/song_gateway";
import React, { useEffect, useState } from "react";
import { useFetch } from "../../shared/hooks/use_fetch";
import { Track } from "./components/track";
import LinearProgress from "@material-ui/core/LinearProgress";

export default ({
  match: {
    params: { songId },
  },
  songController,
}) => {
  const [trackStates, setTrackStates] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0.0);

  useEffect(() => {
    songController.onTrackLoaded((progress) => setLoadingPercentage(progress));

    return () => {
      songController.unsubscribe();
    };
  }, []);

  const song = useFetch(async () => await SongGateway.find({ songId }));

  return (
    song && (
      <>
        <h1>{song.title}</h1>

        {loadingPercentage !== 100 && (
          <LinearProgress variant="determinate" value={loadingPercentage} />
        )}
        <div style={loadingPercentage === 100 ? {} : { display: "none" }}>
          <button onClick={() => songController.play()}>Play</button>
          <button onClick={() => songController.stop()}>Stop</button>
          <div>
            {song.tracks.map((track, trackIndex) => (
              <div key={track.id} data-test="track">
                <Track songController={songController} track={track} />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
};
