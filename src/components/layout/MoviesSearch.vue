<template>
  <div class="container m-0 p-0">
    <div class="movies-search">
      <input
        class="form-control"
        placeholder="Search movies..."
        v-model="searchTerm"
        @keyup="searchMovie"
        type="text"
      />
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "MoviesSearch",
  data() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    searchMovie: _.debounce(function() {
      this.$emit("search-movie", this.searchTerm);
    }, 750)
  }
};
</script>

<style scoped>
.movies-search {
  margin-top: 2vw;
  max-width: 20vw;
}
</style>