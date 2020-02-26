<template>
  <div class="container">
    <div v-if="allMovies.data">
      <MoviePagination
      :firstPage="firstPage"
      :lastPage="lastPage"
      :currentPage="currentPage"
      @go-previous-page="goPreviousPage"
      @go-next-page="goNextPage"
      @go-last-page="goLastPage"
      @go-page-num="fetchAllMovies"
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

export default {
  name: "Movies",
  components: {
    MovieItem,
    MoviePagination
  },
  created() {
    this.$store.dispatch("fetchAllMovies", 1);
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
  methods: {
    ...mapActions({
      fetchAllMovies: "fetchAllMovies"
    }),
    goNextPage() {
      if (this.currentPage == this.lastPage) {
        return;
      } else {
        this.fetchAllMovies(this.currentPage + 1);
      }
    },
    goPreviousPage() {
      if (this.currentPage == 1) {
        return;
      } else {
        this.fetchAllMovies(this.currentPage - 1);
      }
    },
    goLastPage() {
      if (this.currentPage == this.lastPage) {
        return;
      } else {
        this.fetchAllMovies(this.lastPage);
      }
    }
  }
};
</script>
