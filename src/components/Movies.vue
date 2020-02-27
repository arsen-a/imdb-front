<template>
  <div class="container">
    <div v-if="allMovies.data">
      <MoviesSearch @search-movie="searchMovies" />
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

export default {
  name: "Movies",
  components: {
    MovieItem,
    MoviePagination,
    MoviesSearch
  },
  created() {
    this.$store.dispatch("fetchAllMovies", { page: 1, searchTerm: "" });
  },
  computed: {
    ...mapGetters({
      allMovies: "allMovies"
    }),
    firstPage() {
      return this.allMovies.first_page;
    },
    lastPage() {
      return this.allMovies.last_page;
    },
    currentPage() {
      return this.allMovies.current_page;
    }
  },
  data() {
    return {
      toSearch: ""
    };
  },
  methods: {
    ...mapActions({
      fetchAllMovies: "fetchAllMovies"
    }),
    searchMovies(searchTerm) {
      this.toSearch = searchTerm;
      this.fetchAllMovies({ page: 1, searchTerm: searchTerm });
    },
    goNextPage() {
      if (this.currentPage == this.lastPage) {
        return;
      }
      // if (this.hasSearchTerm) {
      //   this.fetchAllMovies({ page: this.currentPage + 1, searchTerm: this.toSearch });
      // }
      this.fetchAllMovies({
        page: this.currentPage + 1,
        searchTerm: this.toSearch
      });
    },
    goPreviousPage() {
      if (this.currentPage == 1) {
        return;
      } else {
        this.fetchAllMovies({
          page: this.currentPage - 1,
          searchTerm: this.toSearch
        });
      }
    },
    goLastPage() {
      if (this.currentPage == this.lastPage) {
        return;
      } else {
        this.fetchAllMovies({ page: this.lastPage, searchTerm: this.toSearch });
      }
    },
    goPageNum(page) {
      this.fetchAllMovies({ page: page, searchTerm: this.toSearch });
    }
  }
};
</script>
