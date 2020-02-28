import { movieService } from "../../services/MovieService";

export const MovieModule = {
  state: {
    allMovies: [],
    singleMovie: {},
    genres: [],
    singleMovieComments: []
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
    }
  },
  actions: {
    fetchAllMovies({ commit }, { page, searchTerm = "", genre = [] }) {
      movieService.getAllPaginated(page, searchTerm, genre).then(response => {
        commit("setAllMovies", response.data);
      });
    },
    async fetchGenres({ commit }) {
      var response = await movieService.getGenres();
      commit("setGenres", response.data);
    },
    async fetchSingleMovie(context, id) {
      movieService.getSingle(id).then(response => {
        context.commit("setSingleMovie", response.data);
        context.commit("setSingleMovieComments", response.data.comments.data);
        return response;
      });
    },
    async loadMoreComments({ commit }, { mId, page}) {
      movieService.loadMoreComments(mId, page).then(response => {
        commit("pushMoreComments", response.data.comments.data);
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
    }
  }
};
