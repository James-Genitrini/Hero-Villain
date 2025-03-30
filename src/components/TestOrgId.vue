<template>
  <v-container class="text-center">
    <h1 class="mb-4">Détails de l'Organisation</h1>

    <v-form @submit.prevent="fetchOrgById">
      <v-text-field
          v-model="orgId"
          label="ID de l'Organisation"
          required
      />
      <v-text-field
          v-model="orgSecret"
          label="Secret de l'organisation"
          type="password"
          required
          outlined
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

    <v-card v-if="org && org.name" class="mt-4" elevation="2">
      <v-card-title class="headline">{{ org.name }}</v-card-title>
      <v-card-subtitle>ID : {{ org._id }}</v-card-subtitle>

      <v-card-text>
        <p><strong>Équipes :</strong></p>
        <v-list v-if="org.teams && org.teams.length">
          <v-list-item v-for="team in org.teams" :key="team._id">
            <v-list-item-content>
              <v-list-item-title>{{ team.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <p v-else>Aucune équipe associée</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import orgService from "@/services/org.service";

export default {
  name: "OrgDetails",
  data() {
    return {
      orgId: "",
      orgSecret: "",
      org: null,
      loading: false,
    };
  },
  computed: {
    ...mapState("general", ["selectedOrganization"]),
    ...mapState("errors", ["error"]),
  },
  methods: {
    ...mapActions("general", ["setSelectedOrganization"]),
    ...mapActions("errors", ["setError", "clearError"]),

    async fetchOrgById() {
      if (!this.orgId) {
        this.setError("L'ID de l'organisation est requis.");
        return;
      }

      this.loading = true;
      this.clearError();
      this.org = null;

      try {
        const orgData = await orgService.getOrgById(this.orgId, this.orgSecret);
        this.org = orgData;
        this.setSelectedOrganization(orgData);
      } catch (err) {
        this.setError(err.message || "Erreur lors de la récupération des données.");
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
