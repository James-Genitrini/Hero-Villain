<template>
  <v-app>
    <app-sidebar />

    <v-main>
      <v-container class="bg-grey lighten-4">
        <router-view />
        <ErrorDialog
          v-if="isError"
          :message="errorMsg"
          @close="clearError"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { mapState, mapActions } from 'vuex';
import AppSidebar from './components/AppSideBar.vue';
import ErrorDialog from './components/ErrorDialog.vue';

const { isError, errorMsg } = mapState('errors', ['isError', 'errorMsg']);

const { clearError } = mapActions('errors', ['clearError']);
</script>

<style scoped>
.bg-custom-grey {
  background-color: #756f6f;
}
</style>
