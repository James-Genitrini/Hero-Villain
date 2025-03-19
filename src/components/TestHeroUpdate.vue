<template>
    <v-container class="text-center">
      <h1 class="mb-4">Mise à Jour d'un Héros</h1>
  
      <v-form @submit.prevent="updateHero" v-model="valid">
        <v-text-field
          v-model="heroData._id"
          label="ID du Héros"
          required
          :rules="[v => !!v || 'ID est requis']"
        />
        
        <v-text-field
          v-model="heroData.publicName"
          label="Nom Public"
          required
          :rules="[v => !!v || 'Nom Public est requis']"
        />
        
        <v-text-field
          v-model="heroData.realName"
          label="Nom Réel"
          required
          :rules="[v => !!v || 'Nom Réel est requis']"
        />
  
        <v-textarea
          v-model="powers"
          label="Pouvoirs (séparés par une virgule)"
          required
          :rules="[v => !!v || 'Les pouvoirs sont requis']"
        />
  
        <v-text-field
          v-model="organizationSecret"
          label="Mot de Passe Secret de l'Organisation"
          required
          :rules="[v => !!v || 'Mot de passe secret requis']"
          type="password"
        />
  
        <v-btn
          color="blue darken-2"
          class="white--text"
          elevation="2"
          type="submit"
          :disabled="!valid || loading"
          :loading="loading"
        >
          Mettre à Jour le Héros
        </v-btn>
      </v-form>
  
      <v-alert v-if="error" type="error" class="mt-3" dense>
        Une erreur est survenue : {{ error }}
      </v-alert>
  
      <v-alert v-if="successMessage" type="success" class="mt-3" dense>
        {{ successMessage }}
      </v-alert>
    </v-container>
  </template>
  
  <script>
  import heroService from "@/services/hero.service";
  
  export default {
    name: "UpdateHero",
    data() {
      return {
        heroData: {
          _id: "",
          publicName: "",
          realName: "",
        },
        powers: "",
        organizationSecret: "",
        loading: false,
        error: null,
        successMessage: null,
        valid: false,
      };
    },
    methods: {
      async updateHero() {
        this.loading = true;
        this.error = null;
        this.successMessage = null;
  
        const powersArray = this.powers.split(",").map((power) => power.trim()).map((name) => ({
          name,
          type: 1,
          level: 1,
        }));
  
        const updatedHeroData = {
          ...this.heroData,
          powers: powersArray,
        };
  
        try {
          await heroService.updateHero(updatedHeroData, this.organizationSecret);
          this.successMessage = "Héros mis à jour avec succès !";
        } catch (error) {
          this.error = error.message;
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .v-container {
    max-width: 600px;
    margin: auto;
  }
  </style>
  