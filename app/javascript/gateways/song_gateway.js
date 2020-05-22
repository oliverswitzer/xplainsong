import { axios } from './support/axios'

export class SongGateway {
  static CACHE_KEYS = {
    all: '/songs'
  };

  static all = async () => {
    const response = await axios.get(CACHE_KEYS.all);

    console.log('yo');
    console.log(response);

    return response;
  }
}