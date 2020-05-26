import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { SongGateway } from "../gateways/song_gateway";

export const CreateSongForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState({ title: '' });

  const onSongSubmit = async () => {
    await SongGateway.create({ title: formState.title });

    onSubmit()
  };

  return (
    <div style={{ backgroundColor: 'white', textAlign: 'center' }}>
      <TextField id="song-title" label="Title"
                 value={formState.title}
                 onChange={e => setFormState({ ...formState, title: e.target.value })}/>
      <Button onClick={() => onSongSubmit()}>Save</Button>
    </div>
  );
};