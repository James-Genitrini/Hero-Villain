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

    <v-alert v-if="error" type="error" class="mt-3" dense>
      ❌ Une erreur est survenue : {{ error }}
    </v-alert>

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
  </v-container>
</template>

<script>
import heroService from "@/services/hero.service";

export default {
  name: "TestHeroAliases",
  data() {
    return {
      aliases: [],
      loading: false,
      error: null,
      headers: [
        { text: "ID", value: "_id" },
        { text: "Nom Public", value: "publicName" }
      ]
    };
  },
  methods: {
    async fetchHeroAliases() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await heroService.getHeroAliases();
        this.aliases = response.data || [];
      } catch (err) {
        this.error = err.message;
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
