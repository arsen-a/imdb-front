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
      if (movies.elastic === true) {
        state.allMovies.data = movies.data;
      } else {
        state.allMovies = movies.data;
      }
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
    async fetchAllMovies(
      { commit },
      { page, searchTerm = "", genre = [], elastic = "off" }
    ) {
      var response = await movieService.getAllPaginated(
        page,
        searchTerm,
        genre,
        elastic
      );
      if (response.data.elastic === true) {
        commit("setAllMovies", { data: response.data.movies, elastic: true });
        return response;
      }
      commit("setAllMovies", { data: response.data, elastic: false });
      return response;
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
        commit("singleMovieLastPage", response.data.movie.comments.last_page);
      });
    },
    async reactToMovie(context, reaction) {
      var response = await movieService.reactToMovie(reaction);
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
