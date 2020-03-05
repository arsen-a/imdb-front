<template>
  <div class="container m-0 p-0">
    <div class="movies-search">
      <input
        class="form-control"
        placeholder="Type to search..."
        v-model="searchTerm"
        @keyup="searchMovie"
        type="text"
      />
      <div class="mt-2">
        <input
          @change="changeParentElastic"
          id="elSearch"
          value="on"
          v-model="useElastic"
          type="checkbox"
        />
        <label class="ml-2" for="elSearch">Elastic Search</label>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "MoviesSearch",
  data() {
    return {
      searchTerm: "",
      useElastic: false
    };
  },
  methods: {
    searchMovie: _.debounce(function() {
      this.$emit("search-movie", this.searchTerm);
    }, 750),
    changeParentElastic() {
      this.$emit("change-elastic", this.useElastic);
    }
  }
};
</script>

<style scoped>
.movies-search {
  margin-top: 2vw;
  max-width: 20vw;
}
</style>