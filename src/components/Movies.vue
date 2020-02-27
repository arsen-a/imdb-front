<template>
  <div class="container">
    <div v-if="allMovies.data">
      <MoviesSearch @search-movie="searchMovies" />
      <div class="card">
        <div v-for="genre in genres" :key="genre.id">
          <input
            type="checkbox"
            @change="searchMovies(toSearch)"
            :name="genre.name"
            :value="genre.id"
            v-model="genreSelected"
          />
          <label class="card-text" :for="genre.name">{{ genre.name }}</label>
        </div>
      </div>
      <MoviePagination
        :firstPage="firstPage"
        :lastPage="lastPage"
        :currentPage="currentPage"
        @go-previous-page="goPreviousPage"
        @go-next-page="goNextPage"
        @go-last-page="goLastPage"
        @go-page-num="goPageNum"
      />
      <MovieItem :allMovies="allMovies.data" />
    </div>
    <div v-else>
      <h3 class="alert alert-danger">There are no movies in our database.</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MovieItem from "./layout/MovieItem";
import MoviePagination from "./layout/MoviesPagination";
import MoviesSearch from "./layout/MoviesSearch";
import { paginationMixin } from "../mixins/Pagination";

export default {
  name: "Movies",
  components: {
    MovieItem,
    MoviePagination,
    MoviesSearch
  },
  mixins: [paginationMixin],
  created() {
    this.$store.dispatch("fetchAllMovies", { page: 1, searchTerm: "" });
    this.$store.dispatch("fetchGenres");
  },
  computed: {
    ...mapGetters({
      allMovies: "allMovies",
      genres: "genres"
    })
  },
  data() {
    return {
      toSearch: "",
      genreSelected: []
    };
  },
  methods: {
    ...mapActions({
      fetchAllMovies: "fetchAllMovies"
    }),
    searchMovies(searchTerm) {
      this.toSearch = searchTerm;
      this.fetchAllMovies({
        page: 1,
        searchTerm: searchTerm,
        genre: this.genreSelected
      });
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 30vw;
  padding: 8px;
  margin-top: 2vw;
}

.card-text {
  margin-left: 5px;
  margin-right: 10px;
}
</style>