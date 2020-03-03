<template>
  <div class="container mt-5 mb-5">
    <div
      v-for="(error, index) in movieErrors"
      :key="index"
      class="alert alert-danger mt-3"
    >{{ error[0] }}</div>
    <form @submit.prevent="submitMovie">
      <div class="form-group">
        <label for="title">Title:</label>
        <input class="form-control" required type="text" id="title" v-model="newMovie.title" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          class="form-control"
          v-model="newMovie.description"
          id="description"
          cols="10"
          rows="5"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image URL:</label>
        <input
          required
          class="form-control"
          type="url"
          id="image"
          name="image"
          v-model="newMovie.image_url"
        />
      </div>
      <div class="form-group">
        <p>
          <strong>Select genre:</strong>
        </p>
        <div v-for="genre in genres" :key="genre.id">
          <input v-model="newMovie.genres" :id="genre.name" type="checkbox" :value="genre.id" />
          <label class="ml-2" :for="genre.name">{{ genre.name | firstLetterUp }}</label>
        </div>
      </div>
      <button class="btn btn-primary" type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { movieService } from "../services/MovieService";

export default {
  name: "CreateMovie",
  async created() {
    const response = await movieService.getGenres();
    this.genres = response.data;
  },
  data() {
    return {
      newMovie: {
        title: "",
        description: "",
        image_url: "",
        genres: []
      },
      genres: [],
      movieErrors: []
    };
  },
  filters: {
    firstLetterUp(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  },
  methods: {
    async submitMovie() {
      movieService
        .createMovie(this.newMovie)
        .then(r => {
          alert(r.data.message);
        })
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(e => {
          this.movieErrors = e.response.data.errors;
        });
    }
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
.container {
  width: 50vw;
}
</style>