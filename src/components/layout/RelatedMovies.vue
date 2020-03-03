<template>
  <div>
    <div class="related-movies" v-if="relatedMovies.length > 0">
      <p>
        <strong>Related movies:</strong>
      </p>
      <ul class="list-group">
        <li class="list-group-item" v-for="movie in relatedMovies" :key="movie.id">
          <router-link :to="{ name: 'single-movie', params: { id: movie.id }}">{{ movie.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RelatedMovies",
  computed: {
    ...mapGetters({
      relatedMovies: "relatedMovies"
    })
  }
};
</script>

<style scoped>
.related-movies {
  width: 20vw;
  margin-top: 20px;
}
</style>