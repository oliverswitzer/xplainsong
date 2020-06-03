import { SongGateway } from "../../gateways/song_gateway";
import React from "react";
import { useFetch } from "../../shared/hooks/use_fetch";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

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
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Audio</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {song.tracks.map((track) => (
          <TableRow key={song.id} data-test="track">
            <TableCell>{track.name}</TableCell>
            <TableCell>
              <audio key={track.id} controls>
                <source src={track.url} />
              </audio>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};
