<template>
  <v-container class="text-center">
    <h1 class="mb-4">Créer une Nouvelle Organisation</h1>

    <v-form @submit.prevent="createOrg" v-model="valid" ref="form">
      <v-text-field
          v-model="orgName"
          label="Nom de l'Organisation"
          required
          outlined
          :rules="[rules.required]"
      ></v-text-field>

      <v-text-field
          v-model="orgSecret"
          label="Phrase Secrète"
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
        Créer l'Organisation
      </v-btn>
    </v-form>


    <v-alert v-if="successMessage" type="success" class="mt-3" dense>
      {{ successMessage }}
    </v-alert>

    <v-card v-if="selectedOrganization" class="mt-4 pa-4">
      <v-card-title>Organisation Stockée</v-card-title>
      <v-card-text>
        <p><strong>Nom:</strong> {{ selectedOrganization.name }}</p>
        <p><strong>ID:</strong> {{ selectedOrganization._id }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import orgService from "@/services/org.service";

export default {
  name: "CreateOrg",
  data() {
    return {
      orgName: "",
      orgSecret: "",
      loading: false,
      successMessage: null,
      valid: false,
      rules: {
        required: value => !!value || "Ce champ est requis"
      }
    };
  },
  computed: {
    ...mapState("general", ["selectedOrganization"]),
    ...mapState("errors", ["error"]),
  },
  methods: {
    ...mapActions("general", ["setSelectedOrganization"]),
    ...mapActions("errors", ["setError", "clearError"]),

    async createOrg() {
      this.loading = true;
      this.clearError();
      this.successMessage = null;

      try {
        const response = await orgService.createOrg({
          name: this.orgName,
          secret: this.orgSecret
        });

        if (response && response._id) {
          this.setSelectedOrganization(response);
          this.successMessage = "Organisation créée avec succès!";
        } else {
          this.successMessage = "Organisation créée, mais aucune donnée retournée.";
        }

        this.orgName = "";
        this.orgSecret = "";
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
