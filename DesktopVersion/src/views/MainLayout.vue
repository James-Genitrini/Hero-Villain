<template>
    <v-container class="main-layout">
      <v-row>
        <v-col cols="12" md="3">
          <app-sidebar />
        </v-col>
  
        <v-col cols="12" md="9">
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import AppSidebar from '@/components/AppSideBar.vue';
  </script>
  
  <style scoped>
  .main-layout {
    padding: 20px;
  }
  </style>
  