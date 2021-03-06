<template>
  <div class="container d-flex justify-content-between">
    <div class="movie">
      <div class="d-flex flex-row align-items-center">
        <h1 class="movie-title">{{ singleMovie.title }}</h1>
        <div class="ml-3 mb-5">
          <button
            class="btn btn-success"
            @click="handleWatchlistClick"
            type="button"
            v-if="!hasWatched"
          >Mark as watched</button>
          <button
            class="btn btn-danger"
            @click="handleWatchlistClick"
            type="button"
            v-else
          >Mark as not watched</button>
        </div>
      </div>
      <img
        v-if="singleMovie.image"
        class="movie-image"
        :src="imgPreUrl + singleMovie.image.full_size"
        :alt="singleMovie.title"
      />
      <div class="movie-genre" v-if="singleMovie.genres">
        <p>Genre:</p>
        <p class="ml-2" v-for="genre in genres" :key="genre.id">
          <i>{{ genre.name }}</i>
        </p>
      </div>
      <div class="movie-genre" v-else>
        <p class="ml-2" v-for="genre in genres" :key="genre.id">
          <i>no genre specified</i>
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
      <div class="comment-container mt-4 mb-5">
        <form @submit.prevent="addNewComment" class="d-flex flex-row align-items-center">
          <input
            class="comment-input form-control mt-3 mb-3"
            type="text"
            placeholder="This is my comment!"
            v-model="newComment"
            required
          />
          <button class="btn btn-success ml-3" type="submit">
            <strong>Add comment</strong>
          </button>
        </form>
        <div class="new-comments" v-if="newComments && newComments.length > 0">
          <p class="alert alert-success mt-3 mb-3">
            <strong>New Comments:</strong>
          </p>
          <ul class="list-group mb-3">
            <li
              class="comment-body list-group-item"
              v-for="(comm, index) in newComments"
              :key="index"
            >{{ comm.content }}</li>
          </ul>
        </div>
        <div v-if="singleMovieComments && singleMovieComments.length > 0">
          <p class="alert alert-success mt-3 mb-3">Comments:</p>
          <ul class="list-group">
            <li
              class="comment-body list-group-item"
              v-for="(comment, index) in singleMovieComments"
              :key="index"
            >{{ comment.content }}</li>
          </ul>
          <button
            v-if="currentPage !== singleMovie.comments.last_page"
            class="btn btn-primary mt-2"
            type="button"
            @click="loadMore"
          >
            <strong>Load More</strong>
          </button>
          <button v-else class="btn btn-primary mt-2" disabled type="button" @click="loadMore">
            <strong>No more..</strong>
          </button>
        </div>
        <h4 v-else class="alert alert-danger">No comments.</h4>
      </div>
    </div>
    <related-movies :genres="genres" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RelatedMovies from "../components/layout/RelatedMovies.vue";
import Echo from "laravel-echo";

export default {
  name: "SingleMovie",
  components: {
    RelatedMovies
  },
  async created() {
    const response = await this.fetchSingleMovie(this.$route.params.id);
    this.hasWatched = response.data.watched;
    this.$store.dispatch("fetchRelatedMovies", this.genres);
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "43d5bd514c4f6b4c9287",
      cluster: "eu",
      forceTLS: true
    });
    window.Echo.channel("comment").listen("CommentAdded", comment => {
      this.newComments.push(comment.comment);
    });
    window.Echo.channel("likes").listen("MovieLiked", r => {
      this.singleMovie.likes = r.movie.likes;
    });
    window.Echo.channel("dislikes").listen("MovieDisliked", r => {
      this.singleMovie.dislikes = r.movie.dislikes;
    });
  },
  computed: {
    ...mapGetters({
      singleMovie: "singleMovie",
      singleMovieComments: "singleMovieComments"
    }),
    genres() {
      return this.singleMovie.genres;
    }
  },
  data() {
    return {
      newComment: "",
      currentPage: 1,
      hasWatched: false,
      newComments: [],
      imgPreUrl: "http://localhost:8000/"
    };
  },
  methods: {
    ...mapActions({
      reactToMovie: "reactToMovie",
      addComment: "addComment",
      fetchSingleMovie: "fetchSingleMovie",
      loadMoreComments: "loadMoreComments",
      handleWatchMark: "handleWatchMark"
    }),
    like() {
      this.reactToMovie({ movie_id: this.$route.params.id, reaction: "like" });
    },
    dislike() {
      this.reactToMovie({
        movie_id: this.singleMovie.id,
        reaction: "dislike"
      });
    },
    addNewComment() {
      this.addComment({
        content: this.newComment,
        movie_id: this.singleMovie.id
      }).then(() => {
        this.newComment = "";
      });
    },
    loadMore() {
      if (this.currentPage == this.singleMovie.comments.last_page) {
        return;
      }
      this.loadMoreComments({
        mId: this.singleMovie.id,
        page: this.currentPage + 1
      });
      this.currentPage++;
    },
    handleWatchlistClick() {
      this.handleWatchMark(this.$route.params.id).then(r => {
        this.hasWatched = r.data.watched;
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

.comment-input {
  width: 300px;
}

.comment-body {
  width: 60vw;
}
</style>