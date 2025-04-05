<template>
  <v-dialog v-model="error" persistent max-width="400px">
    <v-card>
      <v-card-title class="headline">Erreur</v-card-title>
      <v-img :src="failImage" alt="Erreur" width="150px" height="150px" class="mx-auto" />
      <br>
      <v-card-text class="dialog-content">{{ error }}</v-card-text>
      <v-card-actions>
        <v-row justify="center" class="w-100">
          <v-col cols="auto">
            <v-btn color="primary" @click="clearError">Fermer</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import failImage from '@/assets/fail.png';

export default {
  computed: {
    ...mapState('errors', ['error']),
  },
  methods: {
    ...mapActions('errors', ['clearError']),
  },
  data() {
    return {
      failImage,
    };
  },
};
</script>

<style scoped>
.dialog-content {
  max-height: 200px;
  overflow-y: auto;
  padding: 0 16px; 
}

.v-dialog__content {
  overflow: hidden !important;
}
</style>
