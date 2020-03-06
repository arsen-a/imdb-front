import { HttpService } from "./HttpService";

class MovieService extends HttpService {
  getAllPaginated(page, searchTerm, genre, elastic = "off") {
    if (searchTerm.length && !genre.length) {
      return this.axios.get(
        `/movies?page=${page}&search=${searchTerm}&elastic=${elastic}`
      );
    }

    if (genre.length && !searchTerm.length) {
      return this.axios.get(
        `/movies?page=${page}&genre=${genre}&elastic=${elastic}`
      );
    }

    if (searchTerm.length && genre.length) {
      return this.axios.get(
        `/movies?page=${page}&search=${searchTerm}&genre=${genre}&elastic=${elastic}`
      );
    }

    return this.axios.get(`/movies?page=${page}&elastic=${elastic}`);
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

  handleWatchlist(mId) {
    return this.axios.post("/movies/watchlist", { movie_id: mId });
  }

  getPopularMovies() {
    return this.axios.get("/movies?popular=true");
  }

  getRelatedMovies(genresArr) {
    var genres = {
      genres: genresArr
    };
    return this.axios.post(`/movies/related`, genres);
  }

  createMovie(movie) {
    return this.axios.post("/movies", movie);
  }
}

export const movieService = new MovieService();
