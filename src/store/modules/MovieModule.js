import { movieService } from "../../services/MovieService";

export const MovieModule = {
  state: {
    allMovies: [],
    singleMovie: {},
    genres: [],
    singleMovieComments: [],
    popularMovies: [],
    relatedMovies: []
  },
  mutations: {
    setAllMovies(state, movies) {
      state.allMovies = movies;
    },
    setSingleMovie(state, movie) {
      state.singleMovie = movie;
    },
    setGenres(state, genres) {
      state.genres = genres;
    },
    setSingleMovieComments(state, comments) {
      state.singleMovieComments = comments;
    },
    pushMoreComments(state, comments) {
      state.singleMovieComments.push(...comments);
    },
    setPopularMovies(state, movies) {
      state.popularMovies = movies;
    },
    setRelatedMovies(state, movies) {
      state.relatedMovies = movies;
    }
  },
  actions: {
    fetchAllMovies({ commit }, { page, searchTerm = "", genre = [] }) {
      movieService.getAllPaginated(page, searchTerm, genre).then(response => {
        commit("setAllMovies", response.data);
      });
    },
    async fetchPopularMovies({ commit }) {
      var response = await movieService.getPopularMovies();
      commit("setPopularMovies", response.data);
    },
    async fetchRelatedMovies({ commit }, genres) {
      var filtered = genres.map(e => {
        return e.name;
      });
      var response = await movieService.getRelatedMovies(filtered);
      commit("setRelatedMovies", response.data);
    },
    async fetchGenres({ commit }) {
      var response = await movieService.getGenres();
      commit("setGenres", response.data);
    },
    async fetchSingleMovie(context, id) {
      const response = await movieService.getSingle(id);
      context.commit("setSingleMovie", response.data.movie);
      context.commit(
        "setSingleMovieComments",
        response.data.movie.comments.data
      );
      return response;
    },
    async loadMoreComments({ commit }, { mId, page }) {
      movieService.loadMoreComments(mId, page).then(response => {
        commit("pushMoreComments", response.data.movie.comments.data);
      });
    },
    async reactToMovie(context, reaction) {
      var response = await movieService.reactToMovie(reaction);
      alert(response.data.message);
      return response.data;
    },
    async addComment(context, data) {
      var response = await movieService.storeComment(data);
      return response;
    },
    async handleWatchMark(context, mId) {
      const response = await movieService.handleWatchlist(mId);
      return response;
    }
  },
  getters: {
    allMovies(state) {
      return state.allMovies;
    },
    singleMovie(state) {
      return state.singleMovie;
    },
    genres(state) {
      return state.genres;
    },
    singleMovieComments(state) {
      return state.singleMovieComments;
    },
    popularMovies(state) {
      return state.popularMovies;
    },
    relatedMovies(state) {
      return state.relatedMovies;
    }
  }
};
