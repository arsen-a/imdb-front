<template>
  <div class="container">
    <div class="movie">
      <h1 class="movie-title">{{ singleMovie.title }}</h1>
      <img class="movie-image" :src="singleMovie.image_url" :alt="singleMovie.title" />
      <div class="movie-genre" v-if="singleMovie.genre">
        <p>Genre:</p>
        <p class="ml-2" v-for="genre in singleMovie.genre" :key="genre.id">
          <i>{{ genre.name }}</i>
        </p>
      </div>
      <p class="movie-description">{{ singleMovie.description }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SingleMovie",
  created() {
    this.$store.dispatch("fetchSingleMovie", this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      singleMovie: "singleMovie"
    })
  }
};
</script>

<style scoped>
.movie {
  display: flex;
  flex-direction: column;
  margin-top: 4vw;
}

.movie-title {
  margin: 10px 0 50px 0;
}

.movie-image {
  max-width: 20vw;
}

.movie-genre {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.movie-description {
  margin-top: 20px;
  margin-bottom: 40px;
  max-width: 60vw;
}
</style>