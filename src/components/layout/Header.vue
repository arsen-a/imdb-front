<template>
  <div class="container-fluid m-0 p-0">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" :to="{ name: 'home' }">Pocket IMDB</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" :to="{ name: 'home' }">
              <strong>Home</strong>
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li v-if="!isUserLoggedIn" class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
          </li>
          <li v-if="!isUserLoggedIn" class="nav-item">
            <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
          </li>
          <li v-if="isUserLoggedIn" class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logoutUser()">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      isUserLoggedIn: "isUserLoggedIn"
    })
  },
  methods: {
    ...mapActions({
      logout: "logout"
    }),
    logoutUser() {
      this.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    }
  }
};
</script>

