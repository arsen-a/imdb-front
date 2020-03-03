<template>
  <div class="container-fluid m-0 p-0">
    <header>
      <Header />
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
