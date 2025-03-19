<template>
    <v-container class="text-center">
      <h1 class="mb-4">Détails de l'Organisation</h1>
  
      <v-form @submit.prevent="fetchOrgById">
        <v-text-field
          v-model="orgId"
          label="ID de l'Organisation"
          required
        />
        <v-btn 
          color="blue darken-2" 
          class="white--text"
          elevation="2"
          :loading="loading"
          :disabled="loading"
          type="submit"
        >
          Récupérer l'Organisation
        </v-btn>
      </v-form>
  
      <v-alert v-if="error" type="error" class="mt-3" dense>
        Une erreur est survenue : {{ error }}
      </v-alert>
  
      <v-alert v-if="!org && !loading && !error" type="info" class="mt-3" dense>
        Aucune organisation n'a été récupérée. Entrez un ID valide pour commencer.
      </v-alert>
  
      <v-card v-if="org" class="mt-4" elevation="2">
        <v-card-title class="headline">{{ org.name }}</v-card-title>
        <v-card-subtitle>ID : {{ org._id }}</v-card-subtitle>
  
        <v-card-text>
          <p><strong>Équipes :</strong></p>
          <v-list>
            <v-list-item-group v-if="org.teams && org.teams.length">
              <v-list-item v-for="team in org.teams" :key="team._id">
                <v-list-item-content>
                  <v-list-item-title>{{ team.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item v-else>
              <v-list-item-content>
                <v-list-item-title>Aucune équipe associée</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import orgService from "@/services/org.service";
  
  export default {
    name: "OrgDetails",
    data() {
      return {
        orgId: "",
        org: null,
        loading: false,
        error: null
      };
    },
    methods: {
      async fetchOrgById() {
        if (!this.orgId) {
          this.error = "L'ID de l'organisation est requis.";
          return;
        }
  
        this.loading = true;
        this.error = null;
  
        try {
          const response = await orgService.getOrgById(this.orgId);
          this.org = response.data;
        } catch (err) {
          this.error = err.message;
          this.org = null;
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
  