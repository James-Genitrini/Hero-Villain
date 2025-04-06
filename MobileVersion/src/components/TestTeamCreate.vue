<template>
  <v-container class="test-team-create">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>Création d'une Nouvelle Équipe</v-card-title>

          <v-form @submit.prevent="createTeam">
            <v-text-field
                v-model="form.name"
                label="Nom de l'équipe"
                required
                outlined
            ></v-text-field>

            <v-btn
                type="submit"
                color="blue darken-2"
                class="white--text"
                :loading="loading"
            >
              Créer l'Équipe
            </v-btn>

            <v-alert v-if="error" type="error" class="mt-4">
              Une erreur est survenue : {{ error }}
            </v-alert>

            <v-alert v-if="successMessage" type="success" class="mt-4">
              {{ successMessage }}
            </v-alert>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>

    <v-row justify="center" v-if="selectedTeam">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>Équipe Stockée dans le Store</v-card-title>
          <v-card-text>
            <p><strong>Nom de l'Équipe :</strong> {{ selectedTeam.name }}</p>
            <p><strong>ID :</strong> {{ selectedTeam._id }}</p>

            <v-divider class="my-3"></v-divider>

            <p><strong>Membres :</strong></p>
            <v-list v-if="selectedTeam.members && selectedTeam.members.length">
              <v-list-item v-for="(member, index) in selectedTeam.members" :key="index">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ member.name }} (ID: {{ member._id }})
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <p v-else>Aucun membre dans cette équipe.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import teamService from "@/services/team.service";

export default {
  name: "TestTeamCreate",
  data() {
    return {
      form: {
        name: "",
        members: [],
      },
      successMessage: null,
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

    async createTeam() {
      this.loading = true;
      this.clearError();
      this.successMessage = null;

      if (!this.form.name) {
        this.setError("Le nom de l'équipe est requis.");
        this.loading = false;
        return;
      }

      try {
        const teamData = await teamService.createTeam(this.form);

        this.setSelectedTeam(teamData);

        this.successMessage = "Équipe créée avec succès et stockée dans Vuex !";
        console.log(teamData);
        this.form.name = "";
        this.form.members = [];
      } catch (err) {
        this.setError(err.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.test-team-create {
  font-family: Arial, sans-serif;
}

.v-alert {
  margin-top: 16px;
}

.v-btn {
  margin-top: 20px;
}
</style>
