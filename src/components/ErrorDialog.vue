<template>
  <v-dialog v-model="error" persistent max-width="400px">
    <v-card>
      <v-card-title class="headline">Erreur</v-card-title>
      <v-card-text>{{ error }}</v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="clearError">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('errors', ['error']), 
  },
  methods: {
    ...mapActions('errors', ['clearError']), 
  },
};
</script>
