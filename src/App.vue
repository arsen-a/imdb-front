<template>
  <div class="container-fluid m-0 p-0">
    <header>
      <Header />
    </header>
    <main>
      <div class="container d-flex flex-row justify-content-between">
        <router-view />
        <Sidebar v-if="$route.name == 'home'" class="sidebar" />
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import Sidebar from "./components/layout/Sidebar.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Sidebar
  }
};
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.sidebar {
  width: 20vw;
}
</style>
