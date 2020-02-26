<template>
  <div class="container">
    <nav>
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <button class="page-link" @click="goPreviousPage()">Previous</button>
        </li>
        <li v-else class="page-item disabled">
          <p class="page-link">Previous</p>
        </li>
        <li v-if="currentPage !== allMovies.last_page" class="page-item">
          <button class="page-link" @click="goNextPage()">Next</button>
        </li>
        <li v-else class="page-item disabled">
          <p class="page-link">Next</p>
        </li>
        <li v-if="currentPage !== allMovies.last_page" class="page-item">
          <button class="page-link" @click="goLastPage()">Last</button>
        </li>
        <li v-else class="page-item disabled">
          <p class="page-link">Last</p>
        </li>
        <li v-for="index in allMovies.last_page" :key="index" class="page-item">
          <button
            v-if="currentPage !== index"
            class="page-link"
            @click="fetchAllMovies(index)"
          >{{ index }}</button>
          <div v-else class="page-item disabled">
            <p class="page-link">{{ index }}</p>
          </div>
        </li>
      </ul>
    </nav>
    <div class="movie-container" v-for="movie in allMovies.data" :key="movie.id">
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Movies",
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
  filters: {
    shortDescription(description) {
      return description.substr(0, 80) + "...";
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  height: 250px;
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

.pagination {
  margin-top: 5vw;
}
</style>
