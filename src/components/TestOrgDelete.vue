<template>
    <v-container class="text-center">
      <h1 class="mb-4">Supprimer une Équipe d'une Organisation</h1>
  
      <v-form @submit.prevent="removeTeamFromOrg" v-model="valid" ref="form">
  
        <v-text-field
          v-model="teamId"
          label="ID de l'Équipe à Supprimer"
          required
          outlined
          :rules="[rules.required]"
        ></v-text-field>
  
        <v-text-field
          v-model="orgSecret"
          label="Phrase Secrète de l'Organisation"
          required
          outlined
          type="password"
          :rules="[rules.required]"
        ></v-text-field>

        <v-btn
          type="submit"
          color="blue darken-2"
          class="white--text"
          elevation="2"
          :disabled="loading || !valid"
          :loading="loading"
        >
          Supprimer l'Équipe
        </v-btn>
      </v-form>
  
      <v-alert v-if="error" type="error" class="mt-3" dense>
        Une erreur est survenue : {{ error }}
      </v-alert>
  
      <v-alert v-if="successMessage" type="success" class="mt-3" dense>
        {{ successMessage }}
      </v-alert>

      <v-card v-if="organization" class="mt-4">
      <v-card-title>Organisation mise à jour</v-card-title>
      <v-card-text>
        <p><strong>Nom:</strong> {{ organization.name }}</p>
        <p><strong>ID:</strong> {{ organization._id }}</p>
        <p><strong>Teams:</strong></p>
        <ul>
          <li v-for="team in organization.teams" :key="team._id">
            {{ team.name }} (ID: {{ team._id }})
          </li>
        </ul>
      </v-card-text>
    </v-card>

    </v-container>
  </template>
  
  <script>
  import orgService from "@/services/org.service"; 
  import { mapActions } from "vuex";

  export default {
    data() {
      return {
        orgSecret: "",
        teamId: "",
        loading: false,
        successMessage: null,
        organization: null,
        valid: false,
        rules: {
          required: value => !!value || "Ce champ est requis"
        }
      };
    },
    methods: {
      ...mapActions("heroes", ["updateHero"]),
      ...mapActions("errors", ["setError", "clearError"]),

      async removeTeamFromOrg() {
        this.loading = true;
        this.successMessage = null;
  
        try {
          const response = await orgService.removeTeamFromOrg(this.orgSecret, this.teamId);
          this.successMessage = `L'équipe a été supprimée de l'organisation avec succès.`;
          this.orgSecret = ""; 
          this.organization = response.data
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
    max-width: 600px;
    margin: auto;
  }
  </style>
  