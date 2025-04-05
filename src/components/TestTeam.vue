<template>
  <v-container class="test-teams">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title>Test - Liste des Équipes</v-card-title>

          <v-btn
            color="blue darken-2"
            class="white--text"
            @click="fetchTeams"
            :loading="loading"
            :disabled="loading"
            block
          >
            {{ loading ? "Chargement..." : "Récupérer les Équipes" }}
          </v-btn>



          <v-data-table
            v-if="teams.length"
            :headers="headers"
            :items="teams"
            item-key="_id"
            class="elevation-1 mt-4"
          >
            <template v-slot:[`item._id`]="{ item }">
              <td>{{ item._id }}</td>
            </template>
            <template v-slot:[`item.name`]="{ item }">
              <td>{{ item.name }}</td>
            </template>
            <template v-slot:[`item.nbAffiliations`]="{ item }">
              <td>{{ item.nbAffiliations }}</td>
            </template>
          </v-data-table>

          <v-alert
            v-if="!teams.length && !loading"
            type="info"
            class="mt-4"
          >
            Pas encore de données... Clique sur le bouton pour commencer !
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import teamService from "@/services/team.service";
import { mapActions } from "vuex";

export default {
  name: "TestTeams",
  data() {
    return {
      teams: [], 
      loading: false,
      headers: [
        { text: "ID", value: "_id" },
        { text: "Nom", value: "name" },
        { text: "Nombre d'affiliations", value: "nbAffiliations" },
      ],
    };
  },
  methods: {
    ...mapActions("heroes", ["updateHero"]),
    ...mapActions("errors", ["setError", "clearError"]),

    async fetchTeams() {
      console.log("Chargement des équipes...");
      this.loading = true;
      this.teams = [];

      try {
        const response = await teamService.getTeams();
        this.teams = response.data;
        console.log("Équipes récupérées :", this.teams);
      } catch (err) {
        console.error("Erreur :", err);
        this.setError(err.message);
      } finally {
        this.loading = false;
        console.log("Chargement terminé.");
      }
    },
  },
};
</script>

<style scoped>
.test-teams {
  font-family: Arial, sans-serif;
}

.v-alert {
  margin-top: 16px;
}

.v-data-table {
  margin-top: 24px;
}
</style>
