import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import axios from "axios";

export const CreateSongForm = ({ onSubmit }) => {
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

    onSubmit()
  };

  return (
    <div style={{ backgroundColor: 'white', textAlign: 'center' }}>
      <h1>New Song</h1>
      <TextField id="song-title" label="Title"
                 value={formState.title}
                 onChange={e => setFormState({ ...formState, title: e.target.value })}/>
      <Button onClick={() => onSongSubmit()}>Save</Button>
    </div>
  );
};