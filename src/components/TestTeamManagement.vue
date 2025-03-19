<template>
  <v-container class="team-management">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>Gestion des Héros dans l'Équipe</v-card-title>

          <v-form @submit.prevent="addHeroes">
            <v-text-field
              v-model="teamId"
              label="ID de l'Équipe"
              required
              outlined
            ></v-text-field>

            <v-text-field
              v-model="heroIds"
              label="IDs des Héros (séparés par des virgules)"
              required
              outlined
            ></v-text-field>

            <v-btn
              type="submit"
              color="blue darken-2"
              class="white--text"
              :loading="loading"
              :disabled="loading"
            >
              Ajouter Héros à l'Équipe
            </v-btn>
          </v-form>

          <v-divider></v-divider>

          <v-form @submit.prevent="removeHeroes">
            <v-text-field
              v-model="heroIdsToRemove"
              label="IDs des Héros à Supprimer (séparés par des virgules)"
              required
              outlined
            ></v-text-field>

            <v-btn
              type="submit"
              color="red darken-2"
              class="white--text"
              :loading="loading"
              :disabled="loading"
            >
              Supprimer Héros de l'Équipe
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

          <v-alert v-if="error" type="error" class="mt-3" dense>
            {{ error }}
          </v-alert>
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
      heroIdsToRemove: "",
      teams: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async addHeroes() {
      this.loading = true;
      this.error = null;
      const heroIdsArray = this.heroIds.split(",").map(id => id.trim());
      try {
        await TeamService.addHeroesToTeam({
          idHeroes: heroIdsArray,
          idTeam: this.teamId,
        });
        this.heroIds = ""; 
        this.fetchTeams(); 
      } catch (error) {
        this.error = "Erreur lors de l'ajout des héros à l'équipe : " + error.message;
      } finally {
        this.loading = false;
      }
    },

    async removeHeroes() {
      this.loading = true;
      this.error = null;
      const heroIdsArray = this.heroIdsToRemove.split(",").map(id => id.trim());
      try {
        await TeamService.removeHeroesFromTeam({
          idHeroes: heroIdsArray,
          idTeam: this.teamId,
        });
        this.heroIdsToRemove = ""; 
        this.fetchTeams(); 
      } catch (error) {
        this.error = "Erreur lors de la suppression des héros de l'équipe : " + error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchTeams() {
      try {
        const response = await TeamService.getTeams(); 
        this.teams = response.data;
      } catch (error) {
        this.error = "Erreur lors de la récupération des équipes : " + error.message;
      }
    },
  },
  mounted() {
    this.fetchTeams(); 
  },
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
