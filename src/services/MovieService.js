import { HttpService } from "./HttpService";

class MovieService extends HttpService {
  getAllPaginated(page, searchTerm, genre) {
    if (searchTerm.length && !genre.length) {
      return this.axios.get(`/movies?page=${page}&search=${searchTerm}`);
    }

    if (genre.length && !searchTerm.length) {
      return this.axios.get(`/movies?page=${page}&genre=${genre}`);
    }

    if (searchTerm.length && genre.length) {
      return this.axios.get(
        `/movies?page=${page}&search=${searchTerm}&genre=${genre}`
      );
    }

    return this.axios.get(`/movies?page=${page}`);
  }

  getSingle(id) {
    return this.axios.get(`/movies/${id}`);
  }

  getGenres() {
    return this.axios.get("/genres");
  }

  reactToMovie(reaction) {
    return this.axios.post("/movies/reactions", reaction);
  }

  storeComment(data) {
    return this.axios.post("/comments", data);
  }

  loadMoreComments(mId, page) {
    return this.axios.get(`/movies/${mId}?page=${page}`);
  }
}

export const movieService = new MovieService();
