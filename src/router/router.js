import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/Home.vue';
import TestHeroAliases from '@/components/TestHero.vue';
import TestHeroCreate from '@/components/TestHeroCreate.vue';
import TestHeroId from '@/components/TestHeroId.vue';
import TestHeroUpdate from '@/components/TestHeroUpdate.vue';
import TestTeam from '@/components/TestTeam.vue';
import TestTeamCreate from '@/components/TestTeamCreate.vue';
import TestTeamManagement from '@/components/TestTeamManagement.vue';
import TestOrg from '@/components/TestOrg.vue';
import TestOrgCreate from '@/components/TestOrgCreate.vue';
import TestOrgId from '@/components/TestOrgId.vue';
import TestOrgTeam from '@/components/TestOrgTeam.vue';
import TestOrgDelete from '@/components/TestOrgDelete.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/heroes', component: TestHeroAliases, name: 'TestHeroAliases' },
  { path: '/heroes/create', component: TestHeroCreate, name: 'TestHeroCreate' },
  { path: '/heroes/:id', component: TestHeroId, name: 'TestHeroId' },
  { path: '/heroes/update', component: TestHeroUpdate, name: 'TestHeroUpdate' },
  { path: '/teams', component: TestTeam, name: 'TestTeam' },
  { path: '/teams/create', component: TestTeamCreate, name: 'TestTeamCreate' },
  { path: '/teams/manage', component: TestTeamManagement, name: 'TestTeamManagement' },
  { path: '/orgs', component: TestOrg, name: 'TestOrg' },
  { path: '/orgs/create', component: TestOrgCreate, name: 'TestOrgCreate' },
  { path: '/orgs/:id', component: TestOrgId, name: 'TestOrgId' },
  { path: '/orgs/addteam', component: TestOrgTeam, name: 'TestOrgTeam' },
  { path: '/orgs/removeteam', component: TestOrgDelete, name: 'TestOrgDelete' },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
