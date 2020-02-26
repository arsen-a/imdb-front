<template>
  <div class="container">
    <div class="movie-container" v-for="movie in allMovies" :key="movie.id">
      <h3>{{ movie.title }}</h3>
      <img class="movie-image" :src="movie.image_url" :alt="movie.title">
      <p>
        {{ movie.description | shortDescription }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Movies",
  created() {
    this.$store.dispatch("fetchAllMovies");
  },
  computed: {
    ...mapGetters({
      allMovies: "allMovies"
    })
  },
  filters: {
    shortDescription(description) {
      return description.substr(0, 50) + '...';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-container {
  border: 1px solid rgb(226, 226, 226);
  border-radius: 3px;
  padding: 10px;
  margin: 14px 0 14px 0;
}

.movie-image {
  max-height: 150px;
}
</style>
