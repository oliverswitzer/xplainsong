import { SongGateway } from "../../gateways/song_gateway";
import React, { useEffect } from "react";
import { useFetch } from "../../shared/hooks/use_fetch";

export default ({
  match: {
    params: { songId },
  },
}) => {
  const song = useFetch(async () => await SongGateway.find({ songId }));

  return !song ? (
    "Loading"
  ) : (
    <>
      <h1>{song.title}</h1>
      <div>
        {song.tracks.map((track) => (
          <audio data-test="track" key={track.id} controls>
            <source src={track.url} />
          </audio>
        ))}
      </div>
    </>
  );
};
