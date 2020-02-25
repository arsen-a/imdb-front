import { HttpService } from "./HttpService";

class MovieService extends HttpService {
  getAll() {
    return this.axios.get("/movies");
  }

  getSingle(id) {
    return this.axios.get(`/movies/${id}`);
  }
}

export const movieService = new MovieService();
