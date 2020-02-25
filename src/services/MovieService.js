import { HttpService } from "./HttpService";

class MovieService extends HttpService {
  getAllPaginated(page) {
    return this.axios.get(`/movies?page=${page}`);
  }

  getSingle(id) {
    return this.axios.get(`/movies/${id}`);
  }
}

export const movieService = new MovieService();
