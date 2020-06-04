import { SongGateway } from "../../gateways/song_gateway";
import React, { useEffect, useState } from "react";
import { useFetch } from "../../shared/hooks/use_fetch";
import { Track } from "./components/track";

export default ({
  match: {
    params: { songId },
  },
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackStates, setTrackStates] = useState([]);
  const [showTracks, setShowTracks] = useState(false);

  const song = useFetch(async () => await SongGateway.find({ songId }));

  useEffect(() => {
    if (song) {
      setTrackStates(new Array(song.tracks.length).fill("loading"));
    }
  }, [song]);

  const handleOnTrackLoaded = (trackIndex) => {
    trackStates[trackIndex] = "loaded";

    if (trackStates.every((state) => state === "loaded")) {
      setShowTracks(true);
    } else {
      setTrackStates(trackStates);
    }
  };

  return (
    song && (
      <>
        <h1>{song.title}</h1>

        { !showTracks && <h1>Loading tracks...</h1>}
        <div style={showTracks ? {} : { display: "none" }}>
          <button onClick={() => setIsPlaying(true)}>Play</button>
          <button onClick={() => setIsPlaying(false)}>Stop</button>
          <div>
            {song.tracks.map((track, trackIndex) => (
              <div
                key={track.id}
                data-test="track"
              >
                <Track
                  onTrackLoaded={() => handleOnTrackLoaded(trackIndex)}
                  play={isPlaying}
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
