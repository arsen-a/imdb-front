<template>
  <div class="container">
    <div class="movie">
      <h1 class="movie-title">{{ singleMovie.title }}</h1>
      <img class="movie-image" :src="singleMovie.image_url" :alt="singleMovie.title" />
      <div class="movie-genre" v-if="singleMovie.genres">
        <p>Genre:</p>
        <p class="ml-2" v-for="genre in genres" :key="genre.id">
          <i>{{ genre.name }}</i>
        </p>
      </div>
      <p class="movie-description">{{ singleMovie.description }}</p>
      <div class="like-dislike-container">
        <div class="d-flex justify-content-between mt-3">
          <div class="d-flex align-items-center">
            <p class="likes m-0 mr-2 p-0">Likes:</p>
            <span>{{ singleMovie.likes }}</span>
          </div>
          <button @click="like" type="button" class="btn btn-success">Like</button>
        </div>
        <div class="d-flex justify-content-between mt-3">
          <div class="d-flex align-items-center">
            <p class="dislikes m-0 mr-2 p-0">Dislikes:</p>
            <span>{{ singleMovie.dislikes }}</span>
          </div>
          <button @click="dislike" type="button" class="btn btn-danger">Dislike</button>
        </div>
      </div>
      <div class="d-flex flex-row mt-3">
        <p>Visit count:</p>
        <span class="ml-2">{{ singleMovie.visit_count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SingleMovie",
  created() {
    this.$store.dispatch("fetchSingleMovie", this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      singleMovie: "singleMovie"
    }),
    genres() {
      return this.singleMovie.genres;
    }
  },
  methods: {
    ...mapActions({
      reactToMovie: "reactToMovie"
    }),
    like() {
      this.reactToMovie({ movie_id: this.$route.params.id, reaction: "like" });
    },
    dislike() {
      this.reactToMovie({
        movie_id: this.singleMovie.id,
        reaction: "dislike"
      });
    }
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

.like-dislike-container {
  width: 200px;
}

.likes {
  color: green;
}

.dislikes {
  color: red;
}
</style>