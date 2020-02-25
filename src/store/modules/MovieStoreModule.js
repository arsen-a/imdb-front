import { movieService } from "../../services/MovieService";

export const MovieStoreModule = {
  state: {
    allMovies: null
  },
  mutations: {
    setAllMovies(state, movies) {
      state.allMovies = movies;
    }
  },
  actions: {
    fetchAllMovies(context) {
      movieService.getAll().then(r => {
        context.commit("setAllMovies", r.data);
      });
    }
  },
  getters: {
    allMovies(state) {
      return state.allMovies;
    }
  }
};
