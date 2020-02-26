import { HttpService } from "./HttpService";

class MovieService extends HttpService {
  getAllPaginated(page, searchTerm) {
    if (searchTerm.length) {
      return this.axios.get(`/movies?page=${page}&search=${searchTerm}`);
    }

    return this.axios.get(`/movies?page=${page}`);
  }

  getSingle(id) {
    return this.axios.get(`/movies/${id}`);
  }
}

export const movieService = new MovieService();
