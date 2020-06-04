import { SongGateway } from "../../gateways/song_gateway";
import React, { useState } from "react";
import { useFetch } from "../../shared/hooks/use_fetch";
import { Track } from "./components/track";

export default ({
  match: {
    params: { songId },
  },
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const song = useFetch(async () => await SongGateway.find({ songId }));

  return song && (
    <>
      <h1>{song.title}</h1>
      <button onClick={() => setIsPlaying(true)}>Play</button>
      <button onClick={() => setIsPlaying(false)}>Stop</button>
      <div>
        {song.tracks.map((track) => (
          <div key={track.id} data-test="track">
            <Track play={isPlaying} track={track} />
          </div>
        ))}
      </div>
    </>
  );
};
