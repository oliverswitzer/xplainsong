import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { SongsList } from "../components/songs_list";
import { CreateSongForm } from "../components/create_song_form";
import useSWR from "swr";
import { SongGateway } from "../gateways/song_gateway";

export const SongsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: songs, mutate: refreshSongs } = useSWR(SongGateway.CACHE_KEYS.all, SongGateway.all);

  const onSumbit = async () => {
    await refreshSongs();
    setIsModalOpen(false)
  };

  return (
    !songs ? 'Loading' : (
      <>
        <h1>Songs</h1>
        <Button onClick={() => setIsModalOpen(true)}>Create new song</Button>
        <SongsList songs={songs}/>

        <Modal open={isModalOpen}>
          <>
            <CreateSongForm onSubmit={onSumbit}/>
          </>
        </Modal>
      </>
    )
  )
};