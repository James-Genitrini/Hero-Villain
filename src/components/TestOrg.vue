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
  
  
      <v-table v-if="orgs.length" class="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="org in orgs" :key="org._id">
            <td>{{ org._id }}</td>
            <td>{{ org.name }}</td>
          </tr>
        </tbody>
      </v-table>
  
      <v-alert v-if="!orgs.length && !loading && !error" type="info" class="mt-3" dense>
        Pas encore de données... Clique sur le bouton pour commencer !
      </v-alert>
    </v-container>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  import orgService from "@/services/org.service";
  
  export default {
    name: "OrgList",
    data() {
      return {
        orgs: [],
        loading: false,
      };
    },
    methods: {
      ...mapActions("heroes", ["updateHero"]),
      ...mapActions("errors", ["setError", "clearError"]),

      async fetchOrgs() {
        this.loading = true;
  
        try {
          const response = await orgService.getAllOrgs();
          this.orgs = response || [];
        } catch (err) {
          this.setError(err.message);
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
  
  v-table {
    width: 100%;
  }
  
  thead {
    background-color: #f5f5f5;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
  }
  </style>
  