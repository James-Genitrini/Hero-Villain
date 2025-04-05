<template>
  <v-container class="hero-management">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>Récupérer un Héros par ID</v-card-title>

          <v-form @submit.prevent="getHeroById">
            <v-text-field
              v-model="heroId"
              label="ID du Héros"
              required
              outlined
            ></v-text-field>

            <v-text-field
              v-model="orgSecret"
              label="Phrase Secrète de l'Organisation"
              type="password"
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
              Récupérer le Héros
            </v-btn>
          </v-form>

          <v-alert v-if="selectedHero" type="success" class="mt-3" dense>
            <div><strong>Nom Public:</strong> {{ selectedHero.publicName }}</div>
            <div><strong>Nom Réel:</strong> {{ selectedHero.realName }}</div>
            <div><strong>Pouvoirs:</strong></div>
            <v-list dense>
              <v-list-item v-for="(power, index) in selectedHero.powers" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ power.name }} (Type: {{ power.type }}, Niveau: {{ power.level }})</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-alert>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>État du Store (selectedHero)</v-card-title>
          <v-divider></v-divider>
          <pre v-if="selectedHero">{{ selectedHero }}</pre>
          <v-alert v-else type="info" dense>
            Aucun héros sélectionné pour le moment.
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import heroService from "@/services/hero.service"; 

export default {
  data() {
    return {
      heroId: "",
      orgSecret: "",
      loading: false,
    };
  },
  computed: {
    ...mapState("heroes", ["selectedHero"]), 
    ...mapState("errors", ["error"]), 
  },
  methods: {
    ...mapActions("heroes", ["setSelectedHero"]), 
    ...mapActions("errors", ["setError", "clearError"]),

    async getHeroById() {
      this.loading = true;
      this.clearError(); 

      try {
        const response = await heroService.getHeroById(this.heroId, this.orgSecret);

        if (response.data && response.data.length > 0) {
          this.setSelectedHero(response.data[0]);
        } else {
          this.setError("Aucun héros trouvé avec cet ID.");
        }
      } catch (err) {
        this.setError("Erreur lors de la récupération du héros : " + err.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.hero-management {
  max-width: 800px;
  margin: auto;
}
</style>