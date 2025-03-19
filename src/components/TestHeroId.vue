<template>
  <v-container class="test-hero-aliases">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title>Test - Liste des Héros</v-card-title>

          <v-form @submit.prevent="fetchHeroAliases">
            <v-text-field
              v-model="form.id"
              label="ID Héros"
              required
              outlined
              dense
            ></v-text-field>

            <v-text-field
              v-model="form.secret"
              label="Secret organisation"
              required
              outlined
              dense
            ></v-text-field>

            <v-btn
              color="blue darken-2"
              class="white--text"
              @click="fetchHeroAliases"
              :loading="loading"
              :disabled="loading"
            >
              {{ loading ? "Chargement..." : "Récupérer le Héros" }}
            </v-btn>

            <v-alert
              v-if="error"
              type="error"
              class="mt-4"
            >
              ❌ Une erreur est survenue : {{ error }}
            </v-alert>

            <v-data-table
              v-if="heroData"
              :headers="headers"
              :items="[heroData]"
              item-key="_id"
              class="elevation-1 mt-4"
            >
              <template v-slot:[`item._id`]="{ item }">
                <td>{{ item._id }}</td>
              </template>
              <template v-slot:[`item.publicName`]="{ item }">
                <td>{{ item.publicName }}</td>
              </template>
            </v-data-table>

            <v-alert
              v-if="!heroData && !loading && !error"
              type="info"
              class="mt-4"
            >
              Pas encore de données... Clique sur le bouton pour commencer !
            </v-alert>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import heroService from "@/services/hero.service";

export default {
  name: "TestHeroAliases",
  data() {
    return {
      form: {
        id: "",
        secret: "",
      },
      heroData: null, 
      loading: false, 
      error: null, 
      headers: [
        { text: 'ID', value: '_id' },
        { text: 'Nom Public', value: 'publicName' },
      ],
    };
  },
  methods: {
    async fetchHeroAliases() {
      this.loading = true;
      this.error = null;
      this.heroData = null;

      try {
        if (!this.form.id || !this.form.secret) {
          this.error = "L'ID et le Secret sont requis.";
          return;
        }
        const response = await heroService.getHeroById(this.form.id, this.form.secret);
        this.heroData = response.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.test-hero-aliases {
  font-family: Arial, sans-serif;
}

.v-alert {
  margin-top: 16px;
}

.v-data-table {
  margin-top: 24px;
}
</style>
