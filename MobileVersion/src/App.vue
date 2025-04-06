<template>
  <v-app>
    <app-sidebar />
    <v-main>
      <v-container class="bg-grey lighten-4">
        <router-view />
        <ErrorDialog />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import AppSidebar from './components/AppSideBar.vue';
import ErrorDialog from './components/ErrorDialog.vue';
</script>
