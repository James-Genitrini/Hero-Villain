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
              ❌ Une erreur est survenue : {{ error }}
            </v-alert>

            <v-alert v-if="successMessage" type="success" class="mt-4">
              ✅ {{ successMessage }}
            </v-alert>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import teamService from "@/services/team.service";

export default {
  name: "TestTeamCreate",
  data() {
    return {
      form: {
        name: ""
      },
      error: null,
      successMessage: null,
      loading: false
    };
  },
  methods: {
    async createTeam() {
      this.loading = true;
      this.error = null;
      this.successMessage = null;

      if (!this.form.name) {
        this.error = "Le nom de l'équipe est requis.";
        this.loading = false;
        return;
      }

      try {
        await teamService.createTeam(this.form);
        this.successMessage = "Équipe créée avec succès !";
        this.form.name = "";
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
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
