<template>
  <v-container class="text-center">
    <h1 class="mb-4">Ajouter une Équipe à une Organisation</h1>

    <v-form @submit.prevent="addTeamToOrg" v-model="valid" ref="form">

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
import axiosService from "@/services/axios.service"; 
import { mapActions } from "vuex";

export default {
  name: "AddTeamToOrg",
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

    async addTeamToOrg() {
      this.loading = true;
      this.successMessage = null;
      this.organization = null;

      try {
        const payload = { idTeam: this.teamId };

        const response = await axiosService.patch(
          `/orgs/addteam?org-secret=${this.orgSecret}`,
          payload
        );

        this.successMessage = `L'équipe a été ajoutée avec succès.`;

        this.organization = response.data;

      } catch (err) {
        this.setError(err.message);
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
}
</style>
