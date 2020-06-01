import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";

export const SongsList = ({ songs }) => (
  <Table stickyHeader aria-label="sticky table">
    <TableHead>
      <TableRow>
        <TableCell>Title</TableCell>
        <TableCell>Tracks</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {songs.map(song => (
        <TableRow key={song.id}>
          <TableCell><span data-test="title">{song.title}</span></TableCell>
          <TableCell>
            <span data-test="tracks">
              {song.tracks.map(track => (
                <audio controls>
                  <source src={track.url} type="audio/mp3"/>
                </audio>
              ))}

            </span>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);