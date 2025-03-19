<template>
  <v-app>
    <app-sidebar :currentView="currentView" @update:currentView="currentView = $event"></app-sidebar>

    <v-main>
      <v-container class="bg-grey lighten-4">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import AppSidebar from './components/AppSideBar.vue';

import Vue from 'vue';
import VueRouter from 'vue-router';

import TestHeroAliases from './components/TestHero.vue';
import TestHeroCreate from './components/TestHeroCreate.vue';
import TestHeroId from './components/TestHeroId.vue';
import TestTeam from './components/TestTeam.vue';
import TestTeamCreate from './components/TestTeamCreate.vue';
import TestTeamManagement from './components/TestTeamManagement.vue';
import TestHeroUpdate from './components/TestHeroUpdate.vue';
import TestOrg from './components/TestOrg.vue';
import TestOrgId from './components/TestOrgId.vue';
import TestOrgCreate from './components/TestOrgCreate.vue'
import TestOrgTeam from './components/TestOrgTeam.vue'
import TestOrgDelete from './components/TestOrgDelete.vue'

Vue.use(VueRouter);

const routes = [
  { path: '/heroes', component: TestHeroAliases, name: 'TestHeroAliases' },
  { path: '/heroes/create', component: TestHeroCreate, name: 'TestHeroCreate' },
  { path: '/heroes/:id', component: TestHeroId, name: 'TestHeroId' },
  { path: '/teams', component: TestTeam, name: 'TestTeam' },
  { path: '/teams/create', component: TestTeamCreate, name: 'TestTeamCreate' },
  { path: '/teams/manage', component: TestTeamManagement, name: 'TestTeamManagement' },
  { path: './heroes/update', component: TestHeroUpdate, name: 'TestHeroUpdate'},
  { path: './orgs', component: TestOrg, name: 'TestOrg'},
  { path: './orgs/:id', component: TestOrgId, name: 'TestOrgId'},
  { path: './orgs/create ', component: TestOrgCreate, name: 'TestOrgCreate'},
  { path: './orgs/addteam ', component: TestOrgTeam, name: 'TestOrgTeam'},
  { path: './orgs/removeteam ', component: TestOrgDelete, name: 'TestOrgDelete'},
];

const router = new VueRouter({
  routes
});

export default {
  name: 'App',
  components: {
    AppSidebar 
  },
  data() {
    return {
      currentView: 'TestHeroAliases'
    };
  },
  router
};
</script>
<style scoped>
  .bg-custom-grey {
    background-color: #756f6f;
  }
</style>
