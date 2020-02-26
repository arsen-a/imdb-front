<template>
  <div class="container">
    <div
      v-for="(error, index) in registerErrors"
      :key="index"
      class="alert alert-danger mt-3"
    >{{ error[0] }}</div>
    <form @submit.prevent="submit()">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="newUser.name" type="text" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="name">E-mail</label>
        <input v-model="newUser.email" type="email" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="name">Password</label>
        <input v-model="newUser.password" type="password" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="name">Confirm password</label>
        <input
          v-model="newUser.password_confirmation"
          type="password"
          class="form-control"
          required
        />
      </div>
      <button class="btn btn-primary" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Register",
  computed: {
    ...mapGetters({
      registerErrors: "registerErrors"
    })
  },
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    ...mapActions({
      registerUser: "registerUser"
    }),
    submit() {
      this.registerUser(this.newUser).then(() => {
          this.$router.push({ name: 'login' })
      });
    }
  }
};
</script>

<style scoped>
form {
  width: 50vw;
  margin-top: 40px;
  margin-left: 40px;
}
</style>