import { axios } from './support/axios'

export class SongGateway {
  static CACHE_KEYS = {
    all: '/songs'
  };

  static all = async (f) => {
    const response = await axios.get(this.CACHE_KEYS.all);

    return response.data;
  };

  static create = async ({ title }) => {
    return await axios.post('/songs', { title })
  }
}