import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { SongsList } from "../components/songs_list";
import { CreateSongForm } from "../components/create_song_form";
import useSWR from "swr";
import { SongGateway } from "../gateways/song_gateway";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";


export const SongsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: songs, mutate: refreshSongs } = useSWR(SongGateway.CACHE_KEYS.all, SongGateway.all);

  const onSubmit = async () => {
    await refreshSongs();
    setIsModalOpen(false)
  };

  return (
    !songs ? 'Loading' : (
      <>
        <h1>Songs</h1>
        <Button onClick={() => setIsModalOpen(true)}>Create new song</Button>
        <SongsList songs={songs}/>

        <Dialog fullWidth maxWidth='md' open={isModalOpen} onClose={() => setIsModalOpen(false) }>
          <DialogTitle>New Song</DialogTitle>
          <DialogContent>
            <CreateSongForm onSubmit={onSubmit}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  )
};