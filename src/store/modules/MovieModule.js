import { movieService } from "../../services/MovieService";

export const MovieModule = {
  state: {
    allMovies: [],
    singleMovie: {}
  },
  mutations: {
    setAllMovies(state, movies) {
      state.allMovies = movies;
    },
    setSingleMovie(state, movie) {
      state.singleMovie = movie;
    }
  },
  actions: {
    fetchAllMovies({ commit }, { page, searchTerm = "" }) {
      movieService.getAllPaginated(page, searchTerm).then(response => {
        commit("setAllMovies", response.data);
      });
    },
    async fetchSingleMovie(context, id) {
      var response = await movieService.getSingle(id);
      context.commit("setSingleMovie", response.data);
      return response;
    }
  },
  getters: {
    allMovies(state) {
      return state.allMovies;
    },
    singleMovie(state) {
      return state.singleMovie;
    }
  }
};
