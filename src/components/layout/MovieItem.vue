<template>
  <div>
    <div class="movie-container" v-for="movie in allMovies" :key="movie.id">
      <router-link :to="{ name: 'single-movie', params: { id: movie.id } }">
        <h4 class="movie-title">{{ movie.title }}</h4>
      </router-link>
      <img class="movie-image" :src="movie.image_url" :alt="movie.title" />
      <p class="movie-description">
        {{ movie.description | shortDescription }}
        <router-link :to="{ name: 'single-movie', params: { id: movie.id } }">
          <i>show more</i>
        </router-link>
      </p>
      <div class="d-flex ml-3">
        <p class="likes">Likes:</p>
        <span>{{ movie.likes }}</span>
      </div>
      <div class="d-flex ml-3">
        <p class="dislikes">Dislikes:</p>
        <span>{{ movie.dislikes }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieItem",
  props: {
    allMovies: {
      required: true
    }
  },
  filters: {
    shortDescription(description) {
      return description.substr(0, 80) + "...";
    }
  }
};
</script>

<style scoped>
.movie-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 3px;
  margin: 20px 0 14px 0;
  max-width: 70vw;
  height: auto;
}

.movie-title {
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.movie-image {
  margin: auto 20px;
  max-height: 150px;
}

.movie-description {
  margin-left: 20px;
  margin-top: 20px;
}

.likes {
  color: green;
  margin-right: 5px;
}

.dislikes {
  color: red;
  margin-right: 5px;
}
</style>