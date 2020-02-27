import { movieService } from "../../services/MovieService";

export const MovieModule = {
  state: {
    allMovies: [],
    singleMovie: {},
    genres: []
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
        return response;
      });
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
    }
  }
};
