import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useRef, useState } from "react";
import { SongGateway } from "../../../gateways/song_gateway";

export const CreateSongForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState({ title: "", stems: [] });

  const onSongSubmit = async () => {
    await SongGateway.create(formState);

    onSubmit();
  };

  const onStemFileChange = (e) => {
    setFormState({ ...formState, stems: e.target.files })
  };

  return (
    <div style={{ backgroundColor: "white", textAlign: "center" }}>
      <TextField
        id="song-title"
        name="title"
        label="Title"
        value={formState.title}
        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
      />
      <input
        name="stems"
        type="file"
        onChange={onStemFileChange}
        accept=".mp3"
        multiple
      />
      <Button onClick={() => onSongSubmit()}>Save</Button>
    </div>
  );
};
