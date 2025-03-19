<template>
  <v-container class="test-hero-create">
    <v-card class="pa-4">
      <v-card-title>Création d'un Nouveau Héros</v-card-title>

      <v-form @submit.prevent="createHero">
        <v-text-field 
          v-model="form.publicName" 
          label="Nom Public" 
          required 
          outlined
        ></v-text-field>

        <v-text-field 
          v-model="form.realName" 
          label="Nom Réel" 
          required 
          outlined
        ></v-text-field>

        <v-divider class="my-4"></v-divider>

        <v-btn color="blue darken-2" class="white--text" @click="addPower">
          Ajouter un Pouvoir
        </v-btn>

        <div v-for="(power, index) in form.powers" :key="index" class="mt-4">
          <v-card outlined class="pa-3">
            <v-card-title>Pouvoir {{ index + 1 }}</v-card-title>

            <v-text-field 
              v-model="power.name" 
              label="Nom du Pouvoir" 
              required 
              outlined
            ></v-text-field>

            <v-text-field 
              v-model.number="power.type" 
              label="Type (1 à 7)" 
              type="number" 
              min="1" 
              max="7" 
              required 
              outlined
            ></v-text-field>

            <v-text-field 
              v-model.number="power.level" 
              label="Niveau (0 à 100)" 
              type="number" 
              min="0" 
              max="100" 
              required 
              outlined
            ></v-text-field>

            <v-btn color="red" class="white--text mt-2" @click="removePower(index)">
              Supprimer ce Pouvoir
            </v-btn>
          </v-card>
        </div>

        <v-divider class="my-4"></v-divider>

        <v-btn type="submit" color="green darken-2" class="white--text" :loading="loading">
          Créer le Héros
        </v-btn>

        <v-alert v-if="error" type="error" class="mt-3">
          ❌ {{ error }}
        </v-alert>

        <v-alert v-if="successMessage" type="success" class="mt-3">
          ✅ {{ successMessage }}
        </v-alert>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import heroService from "@/services/hero.service";

export default {
  name: "TestHeroCreate",
  data() {
    return {
      form: {
        publicName: "",
        realName: "",
        powers: [],
      },
      error: null,
      successMessage: null,
      loading: false,
    };
  },
  methods: {
    addPower() {
      this.form.powers.push({ name: "", type: null, level: null });
    },
    removePower(index) {
      this.form.powers.splice(index, 1);
    },
    async createHero() {
      this.loading = true;
      this.error = null;
      this.successMessage = null;

      try {
        await heroService.createHero(this.form);
        this.successMessage = "Héros créé avec succès !";
        this.form = { publicName: "", realName: "", powers: [] }; 
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
.test-hero-create {
  max-width: 600px;
  margin: auto;
}
</style>
