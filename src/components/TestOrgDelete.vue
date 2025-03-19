<template>
    <v-container class="text-center">
      <h1 class="mb-4">Supprimer une Équipe d'une Organisation</h1>
  
      <v-form @submit.prevent="removeTeamFromOrg" v-model="valid" ref="form">
        <v-text-field
          v-model="orgSecret"
          label="Phrase Secrète de l'Organisation"
          required
          outlined
          type="password"
          :rules="[rules.required]"
        ></v-text-field>
  
        <v-text-field
          v-model="teamId"
          label="ID de l'Équipe à Supprimer"
          required
          outlined
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
    </v-container>
  </template>
  
  <script>
  import orgService from "@/services/org.service"; 
  
  export default {
    data() {
      return {
        orgSecret: "",
        teamId: "",
        loading: false,
        error: null,
        successMessage: null,
        valid: false,
        rules: {
          required: value => !!value || "Ce champ est requis"
        }
      };
    },
    methods: {
      async removeTeamFromOrg() {
        this.loading = true;
        this.error = null;
        this.successMessage = null;
  
        try {
          await orgService.removeTeamFromOrg(this.orgSecret, this.teamId);
          this.successMessage = `L'équipe a été supprimée de l'organisation avec succès.`;
          this.orgSecret = ""; 
          this.teamId = "";
        } catch (err) {
          this.error = err.message || "Une erreur est survenue.";
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
  