import { axios } from './support/axios'

export class SongGateway {
  static CACHE_KEYS = {
    all: '/songs'
  };

  static all = async (f) => {
    const response = await axios.get(this.CACHE_KEYS.all);

    return response.data;
  };

  static create = async ({ title, tracks }) => {
    const formData = new FormData();

    formData.append('title', title);
    Array.from(tracks).forEach(track => {
      formData.append('tracks[]', track);
    });

    return await axios.post('/songs', formData)
  }
}