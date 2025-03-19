<template>
    <v-container class="text-center">
      <h1 class="mb-4">Ajouter une Équipe à une Organisation</h1>
  
      <v-form @submit.prevent="addTeamToOrg" v-model="valid" ref="form">
        <v-text-field
          v-model="orgId"
          label="ID de l'Organisation"
          required
          outlined
          :rules="[rules.required]"
        ></v-text-field>
  
        <v-text-field
          v-model="teamId"
          label="ID de l'Équipe"
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
          Ajouter l'Équipe
        </v-btn>
      </v-form>
  
      <v-alert v-if="error" type="error" class="mt-3" dense>
        Une erreur est survenue : {{ error }}
      </v-alert>
  
    </v-container>
  </template>
  
  <script>
  import axiosService from "@/services/axios.service"; 
  
  export default {
    name: "AddTeamToOrg",
    data() {
      return {
        orgId: "",
        teamId: "",
        orgSecret: "",
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
      async addTeamToOrg() {
        this.loading = true;
        this.error = null;
        this.successMessage = null;
  
        try {
          const payload = {
            idTeam: this.teamId
          };
  
          await axiosService.patch(
            `/orgs/addteam?org-secret=${this.orgSecret}`,
            payload
          );
  
          this.orgId = "";
          this.teamId = "";
          this.orgSecret = "";
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
  