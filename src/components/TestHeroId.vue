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

          <v-alert v-if="error" type="error" class="mt-3" dense>
            {{ error }}
          </v-alert>

          <v-alert v-if="selectedHero && !error" type="success" class="mt-3" dense>
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
import { mapState, mapMutations } from "vuex";
import heroService from "@/services/hero.service";

export default {
  data() {
    return {
      heroId: "", 
      orgSecret: "", 
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapState(["selectedHero"]),
  },
  created() {
    if (this.selectedHero) {
      this.heroId = this.selectedHero._id || "";
    }
  },
  methods: {
    ...mapMutations(["setSelectedHero"]), 

    async getHeroById() {
      this.loading = true;
      this.error = null;

      try {
        const response = await heroService.getHeroById(this.heroId, this.orgSecret);
        this.setSelectedHero(response.data[0]); 
      } catch (err) {
        this.error = "Erreur lors de la récupération du héros : " + err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.hero-management {
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

pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}
</style>
