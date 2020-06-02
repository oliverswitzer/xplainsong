import { axios } from "./support/axios";

export class SongGateway {
  static CACHE_KEYS = {
    all: () => "/songs",
    find: ({ songId }) => `/songs/${songId}`,
  };

  static all = async () => {
    const response = await axios.get(this.CACHE_KEYS.all());

    return response.data;
  };

  static find = async ({ songId }) => {
    const response = await axios.get(this.CACHE_KEYS.find({ songId }));

    return response.data;
  };

  static create = async ({ title, tracks }) => {
    const formData = new FormData();

    formData.append("title", title);
    Array.from(tracks).forEach((track) => {
      formData.append("tracks[]", track);
    });

    return await axios.post("/songs", formData);
  };
}
