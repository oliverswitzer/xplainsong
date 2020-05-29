import { axios } from './support/axios'

export class SongGateway {
  static CACHE_KEYS = {
    all: '/songs'
  };

  static all = async (f) => {
    const response = await axios.get(this.CACHE_KEYS.all);

    return response.data;
  };

  static create = async ({ title, stems }) => {
    const formData = new FormData();

    formData.append('title', title);
    Array.from(stems).forEach(stem => {
      formData.append('stems[]', stem);
    });

    return await axios.post('/songs', formData)
  }
}