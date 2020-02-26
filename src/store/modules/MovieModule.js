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
    async fetchAllMovies(context, page) {
      var response = await movieService.getAllPaginated(page);
      context.commit("setAllMovies", response.data);
      return response;
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
