import axios from "axios";

class OmdbService {
  constructor() {
    this.axios = axios;
  }

  connectOmdb(title) {
    delete this.axios.defaults.headers.common.Authorization;
    return this.axios.get(`http://www.omdbapi.com/?t=${title}&apikey=19b445f7`);
  }
}

export const omdbService = new OmdbService();
