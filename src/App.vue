<template>
  <v-app>
    <!-- Barre latérale -->
    <app-sidebar />

    <!-- Contenu principal -->
    <v-main>
      <v-container class="bg-grey lighten-4">
        <router-view /> 
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppSidebar from './components/AppSideBar.vue';

export default {
  name: 'App',
  components: {
    AppSidebar
  }
};
</script>

<style scoped>
.bg-custom-grey {
  background-color: #756f6f;
}
</style>
