import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import { Link } from "react-router-dom";

export const SongsList = ({ songs }) => (
  <Table stickyHeader aria-label="sticky table">
    <TableHead>
      <TableRow>
        <TableCell>Title</TableCell>
        <TableCell>Track Count</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {songs.map(song => (
          <TableRow key={song.id}>
            <TableCell><Link to={`/songs/${song.id}`}><span data-test="title">{song.title}</span></Link></TableCell>
            <TableCell><span data-test="track-count">{song.tracks.length}</span></TableCell>
          </TableRow>
      ))}
    </TableBody>
  </Table>
);