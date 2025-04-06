import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/components/Home.vue';
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
import TestUserLogin from '@/components/TestUserLogin.vue';
import TestLoggedHeroEdit from '@/components/TestLoggedHeroEdit.vue';
import TestSecretPhrase from "@/components/TestSecretPhrase.vue";
import TestRegisterUser from "@/components/TestRegisterUser.vue";

Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomeView, name: 'Home' },
  { path: '/secret', component: TestSecretPhrase, name: 'TestSecretPhrase' },
  { path: '/heroes', component: TestHeroAliases, name: 'TestHeroAliases' },
  { path: '/heroes/create', component: TestHeroCreate, name: 'TestHeroCreate' },
  { path: '/heroes/:id', component: TestHeroId, name: 'TestHeroId', meta: { requiresAuth: true } },
  { path: '/heroes/update', component: TestHeroUpdate, name: 'TestHeroUpdate', meta: { requiresAuth: true } },
  { path: '/teams', component: TestTeam, name: 'TestTeam' },
  { path: '/teams/create', component: TestTeamCreate, name: 'TestTeamCreate' },
  { path: '/teams/manage', component: TestTeamManagement, name: 'TestTeamManagement' },
  { path: '/orgs', component: TestOrg, name: 'TestOrg' },
  { path: '/orgs/create', component: TestOrgCreate, name: 'TestOrgCreate' },
  { path: '/orgs/:id', component: TestOrgId, name: 'TestOrgId', meta: { requiresAuth: true } },
  { path: '/orgs/addteam', component: TestOrgTeam, name: 'TestOrgTeam', meta: { requiresAuth: true } },
  { path: '/orgs/removeteam', component: TestOrgDelete, name: 'TestOrgDelete', meta: { requiresAuth: true } },
  { path: '/login', name: 'TestUserLogin', component: TestUserLogin, beforeEnter: (to, from, next) => {
      if (localStorage.getItem('xsrfToken')) {
        next({ name: 'LoggedHeroEdit' });
      } else {
        next();
      }
    }},
  { path: '/register', name: 'register', component: TestRegisterUser },
  { path: '/mon-profil', name: 'LoggedHeroEdit', component: TestLoggedHeroEdit },
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('secretPhrase');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/secret');
  } else {
    next();
  }

  if (to.path === from.path) {
    next(false);
  }

  next();
});

export default router;
