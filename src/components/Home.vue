<template>
    <v-container class="home-container text-center fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6">
          <v-card elevation="2" class="pa-5">
            <h1 class="mb-4">Bienvenue sur HeroCorp</h1>

            <v-img
              :src="home"
              alt="Logo HeroCorp"
              max-width="300"
              class="mx-auto"
              contain
            />

            <p class="mt-4">
              Utilisez la barre de navigation pour explorer les héros ou accéder aux fonctionnalités.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

  <script>
  import home from '@/assets/home.png';

  export default {
    name: 'HomeView',
    data() {
        return {
            home,
        }
    }
  }
  </script>

  <style scoped>
  .home-container {
    background-color: #f9f9f9;
    padding-top: 40px;
  }

  h1 {
    font-weight: bold;
  }
  </style>