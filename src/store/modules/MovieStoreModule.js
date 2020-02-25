import { movieService } from "../../services/MovieService";

export const MovieStoreModule = {
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
    fetchAllMovies(context, page) {
      movieService.getAllPaginated(page).then(r => {
        context.commit("setAllMovies", r.data);
      });
    },
    fetchSingleMovie(context, id) {
      movieService.getSingle(id).then(r => {
        context.commit("setSingleMovie", r.data);
      });
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
