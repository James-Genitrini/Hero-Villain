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

          <v-alert v-if="hero && !error" type="success" class="mt-3" dense>
            <div><strong>Nom Public:</strong> {{ hero.publicName }}</div>
            <div><strong>Nom Réel:</strong> {{ hero.realName }}</div>
            <div><strong>Pouvoirs:</strong></div>
            <v-list dense>
              <v-list-item v-for="(power, index) in hero.powers" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ power.name }} (Type: {{ power.type }}, Niveau: {{ power.level }})</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import heroService from "@/services/hero.service";

export default {
  data() {
    return {
      heroId: "",
      orgSecret: "",
      hero: null,
      loading: false,
      error: null
    };
  },
  methods: {
    async getHeroById() {
      this.loading = true;
      this.error = null;
      this.hero = null;

      try {
        const response = await heroService.getHeroById(this.heroId, this.orgSecret);
        this.hero = response;
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
</style>
