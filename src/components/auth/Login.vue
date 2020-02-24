<template>
  <div class="container">
    <div
      v-if="loginErrors"
      class="alert alert-danger mt-3"
      style="max-width: 50vw; margin-left: 40px;"
    >{{ loginErrors }}</div>
    <form @submit.prevent="submit()">
      <div class="form-group">
        <label>E-mail</label>
        <input v-model="credentials.email" type="email" class="form-control" required/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="credentials.password" type="password" class="form-control" required />
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapGetters({
      loginErrors: "loginErrors"
    })
  },
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({
      login: "login"
    }),
    submit() {
      this.login(this.credentials).then(() => {
          this.$router.push({ name: 'home' })
      });
    }
  }
};
</script>

<style scoped>
form {
  margin-top: 40px;
  margin-left: 40px;
  width: 30vw;
}
</style>