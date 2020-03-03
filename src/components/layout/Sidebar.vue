<template>
  <div class="container mt-4">
    <p>
      <strong>Most popular:</strong>
    </p>
    <ul class="list-group">
      <li
        class="list-group-item list-group-item-action"
        v-for="movie in popularMovies"
        :key="movie.id"
      >
        <router-link :to="{ name: 'single-movie', params: { id: movie.id } }">{{ movie.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",
  created() {
    this.$store.dispatch("fetchPopularMovies");
  },
  computed: {
    ...mapGetters({
      popularMovies: "popularMovies"
    })
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
</style>