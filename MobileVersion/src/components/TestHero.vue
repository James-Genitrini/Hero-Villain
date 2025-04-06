<template>
  <v-container class="text-center">
    <h1 class="mb-4">Test - Liste des Héros</h1>
    
    <v-btn 
      color="blue darken-2" 
      class="white--text"
      elevation="2"
      @click="fetchHeroAliases" 
      :loading="loading"
      :disabled="loading"
    >
      Récupérer les Héros
    </v-btn>

    <v-data-table
      v-if="aliases.length"
      :headers="headers"
      :items="aliases"
      class="mt-4"
      dense
    />

    <v-alert v-if="!aliases.length && !loading && !error" type="info" class="mt-3" dense>
      Pas encore de données... Clique sur le bouton pour commencer !
    </v-alert>
    <v-alert v-if="error" type="error" class="mt-3" dense>
      ❌ Une erreur est survenue : {{ error }}
    </v-alert>

  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import heroService from "@/services/hero.service";

export default {
  name: "TestHeroAliases",
  data() {
    return {
      aliases: [],
      loading: false,
      headers: [
        { text: "ID", value: "_id" },
        { text: "Nom Public", value: "publicName" }
      ]
    };
  },
  computed: {
    ...mapState('errors', ['error', 'isError']),
  },
  methods: {
    ...mapActions("errors", ["setError", "clearError"]),

    async fetchHeroAliases() {
      this.loading = true;
      this.clearError();

      try {
        const response = await heroService.getHeroAliases();
        this.aliases = response.data || [];
      } catch (err) {
        console.error('Erreur lors de la requête:', err);
        this.setError(err.message || "Une erreur est survenue lors de la récupération des héros.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
}
</style>
