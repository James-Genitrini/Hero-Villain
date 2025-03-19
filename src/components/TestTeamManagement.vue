<template>
  <v-container class="team-management">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>Gestion des Équipes</v-card-title>

          <v-form @submit.prevent="createTeam">
            <v-text-field
              v-model="teamId"
              label="ID de l'équipe"
              required
              outlined
            ></v-text-field>
            <v-text-field
              v-model="heroIds"
              label="IDs des héros"
              required
              outlined
            ></v-text-field>

            <v-btn
              type="submit"
              color="blue darken-2"
              class="white--text"
              :loading="loading"
            >
              Ajouter Héros à l'Équipe
            </v-btn>
          </v-form>

          <v-divider></v-divider>

          <v-list v-if="teams.length" dense>
            <v-list-item-group>
              <v-list-item v-for="team in teams" :key="team._id">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ team.name }} (ID: {{ team._id }})
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TeamService from "@/services/team.service";

export default {
  data() {
    return {
      teamId: "",
      heroIds: "",
      teams: [],
      loading: false
    };
  },
  methods: {
    async createTeam() {
      this.loading = true;
      const heroIdsArray = this.heroIds.split(",").map(id => id.trim());
      try {
        await TeamService.addHeroesToTeam({ idHeroes: heroIdsArray, idTeam: this.teamId });
        this.teamId = "";
        this.heroIds = "";
        this.fetchTeams();
      } catch (error) {
        console.error("Erreur lors de l'ajout des héros à l'équipe :", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchTeams() {
      try {
        const response = await TeamService.getTeams();
        this.teams = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des équipes :", error);
      }
    }
  },
  mounted() {
    this.fetchTeams();
  }
};
</script>

<style scoped>
.team-management {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
}

.v-btn {
  margin-top: 10px;
}

.v-divider {
  margin: 20px 0;
}

.v-list-item-title {
  font-weight: bold;
}
</style>
