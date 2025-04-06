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

          <v-card v-if="selectedTeam" class="mt-4">
            <v-card-title>Équipe mise à jour</v-card-title>
            <v-card-text>
              <p><strong>Nom:</strong> {{ selectedTeam.name }}</p>
              <p><strong>Membres:</strong></p>
              <ul>
                <li v-for="hero in selectedTeam.members" :key="hero._id">
                  ID: {{ hero }}
                </li>
              </ul>
            </v-card-text>
          </v-card>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TeamService from "@/services/team.service";

export default {
  data() {
    return {
      teamId: "",
      heroIds: "",
      heroIdsToRemove: "",
      loading: false,
    };
  },
  computed: {
    ...mapState("general", ["selectedTeam"]),
    ...mapState("errors", ["error"]),
  },
  methods: {
    ...mapActions("general", ["setSelectedTeam"]),
    ...mapActions("errors", ["setError", "clearError"]),

    async addHeroes() {
      this.loading = true;
      this.clearError();
      const heroIdsArray = this.heroIds.split(",").map(id => id.trim());

      try {
        const response = await TeamService.addHeroesToTeam({
          idHeroes: heroIdsArray,
          idTeam: this.teamId,
        });

        this.setSelectedTeam(response.data);
        this.heroIds = "";
      } catch (error) {
        this.setError("Erreur lors de l'ajout des héros : " + error.message);
      } finally {
        this.loading = false;
      }
    },

    async removeHeroes() {
      this.loading = true;
      this.clearError();
      const heroIdsArray = this.heroIdsToRemove.split(",").map(id => id.trim());

      try {
        const response = await TeamService.removeHeroesFromTeam({
          idHeroes: heroIdsArray,
          idTeam: this.teamId,
        });

        this.setSelectedTeam(response.data);
        this.heroIdsToRemove = "";
      } catch (error) {
        this.setError("Erreur lors de la suppression des héros : " + error.message);
      } finally {
        this.loading = false;
      }
    },
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
