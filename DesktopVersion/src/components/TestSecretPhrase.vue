<template>
  <div class="secret-phrase-container">
    <h2>Veuillez renseigner le secret de l'organisation</h2>
    <form @submit.prevent="submitPassword">
      <v-text-field
          v-model="password"
          label="Secret de l'organisation"
          type="password"
          required
      ></v-text-field>
      <v-btn type="submit" color="primary">Soumettre</v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      password: '',
    };
  },
  computed: {
    ...mapGetters(['hasOrgSecret']),
  },
  methods: {
    ...mapActions(['setOrganizationPassword']),
    submitPassword() {
      this.setOrganizationPassword(this.password);
      if (this.hasOrgSecret) {
        this.$router.push({ name: 'Home' });
      }
    },
  },
};
</script>

<style scoped>
.secret-phrase-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}
</style>
