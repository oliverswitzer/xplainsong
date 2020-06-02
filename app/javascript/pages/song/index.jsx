import { SongGateway } from "../../gateways/song_gateway";
import React from "react";
import { useFetch } from "../../shared/hooks/use_fetch";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Waveforms } from "./components/waveforms";

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
      <Waveforms tracks={song.tracks} />
    </>
  );
};
