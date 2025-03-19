<template>
    <v-container class="text-center">
      <h1 class="mb-4">Liste des Organisations</h1>
  
      <v-btn 
        color="blue darken-2" 
        class="white--text"
        elevation="2"
        @click="fetchOrgs"
        :loading="loading"
        :disabled="loading"
      >
        Récupérer les Organisations
      </v-btn>
  
      <v-alert v-if="error" type="error" class="mt-3" dense>
        Une erreur est survenue : {{ error }}
      </v-alert>
  
      <v-data-table
        v-if="orgs.length"
        :headers="headers"
        :items="orgs"
        class="mt-4"
        dense
      >
        <template v-slot:item="{ item }">
          <v-chip>{{ item.name }}</v-chip>
        </template>
      </v-data-table>
  
      <v-alert v-if="!orgs.length && !loading && !error" type="info" class="mt-3" dense>
        Pas encore de données... Clique sur le bouton pour commencer !
      </v-alert>
    </v-container>
  </template>
  
  <script>
  import orgService from "@/services/org.service";
  
  export default {
    name: "OrgList",
    data() {
      return {
        orgs: [],
        loading: false,
        error: null,
        headers: [
          { text: "ID", value: "_id" },
          { text: "Nom", value: "name" }
        ]
      };
    },
    methods: {
      async fetchOrgs() {
        this.loading = true;
        this.error = null;
  
        try {
          const response = await orgService.getAllOrgs();
          this.orgs = response || [];
        } catch (err) {
          this.error = err.message;
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .v-container {
    max-width: 800px;
    margin: auto;
  }
  </style>
  