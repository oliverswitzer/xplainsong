import { SongGateway } from "../../gateways/song_gateway";
import React from "react";
import { useFetch } from "../../shared/hooks/use_fetch";
import { Track } from "./components/track";

export default ({
  match: {
    params: { songId },
  },
}) => {
  const song = useFetch(async () => await SongGateway.find({ songId }));

  return song && (
    <>
      <h1>{song.title}</h1>
      <div>
        {song.tracks.map((track) => (
          <div key={track.id} data-test="track">
            <Track track={track} />
          </div>
        ))}
      </div>
    </>
  );
};
