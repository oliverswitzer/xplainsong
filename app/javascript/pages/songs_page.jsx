import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

export const SongsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({ title: '' });

  const onSongSubmit = async () => {
    let options = {
      url: '/api/v1/songs',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: { formState }
    };

    await axios(options);
  };

  return (
    <>
      <h1>Songs</h1>
      <Button onClick={() => setIsModalOpen(true)}>Create new song</Button>
      <Modal open={isModalOpen}>
        <div style={{ backgroundColor: 'white', textAlign: 'center' }}>
          <h1>New Song</h1>
          <TextField id="song-title" label="Title"
                     value={formState.title}
                     onChange={e => setFormState({ ...formState, title: e.target.value })}/>
          <Button onClick={() => onSongSubmit()}>Save</Button>
        </div>
      </Modal>
    </>
  );
};