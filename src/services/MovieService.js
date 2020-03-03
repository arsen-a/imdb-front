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
