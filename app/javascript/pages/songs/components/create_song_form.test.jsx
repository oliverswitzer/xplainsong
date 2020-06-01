import { SongGateway } from "../../../gateways/song_gateway";
import { CreateSongForm } from "./create_song_form";
import { shallow } from 'enzyme'
import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

jest.mock('../../../gateways/song_gateway');

describe('CreateSongForm', () => {
  let componentWrapper;
  let onSubmitSpy;

  beforeEach(() => {

    onSubmitSpy = jest.fn();
    SongGateway.mockClear();
    componentWrapper = shallow(<CreateSongForm onSubmit={onSubmitSpy}/>);

    componentWrapper.find('input[type="file"]').simulate('change', {
      target: {
        files: [
          'some.mp3'
        ]
      }
    });

    componentWrapper.find(TextField).simulate('change', { target: { value: 'Some title' } });
    componentWrapper.find(Button).simulate('click');
  });

  describe('when form is filled and submitted', () => {
    it('calls SongGateway.create with the song data', () => {
      expect(SongGateway.create).toHaveBeenCalledWith({
        title: 'Some title',
        tracks: ['some.mp3']
      })
    });

    it('calls the onSubmit callback', () => {
      expect(onSubmitSpy).toHaveBeenCalledWith()
    });
  })
});