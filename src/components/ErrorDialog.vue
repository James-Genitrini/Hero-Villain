<template>
  <v-dialog v-model="isError" persistent max-width="400px">
    <v-card>
      <v-card-title class="headline">Erreur</v-card-title>
      <v-card-text>{{ errorMsg }}</v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="clearError">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ErrorDialog',
  computed: {
    ...mapState('errors', ['isError', 'errorMsg']),
  },
  methods: {
    ...mapActions('errors', ['clearError']),
  },
};
</script>

<style scoped>
.v-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>