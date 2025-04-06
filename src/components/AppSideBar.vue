<template>
  <v-navigation-drawer app clipped v-model="drawer" :mini-variant="miniVariant">
    <v-list dense>
      <v-list-item-group>
        <v-list-item
            v-for="(item, index) in visibleMenuItems"
            :key="index"
            :to="item.view === 'Logout' ? null : { name: item.view }"
            @click="handleLogout(item)"
            exact
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      miniVariant: false,
      menuItems: [
        { title: 'Héros', view: 'TestHeroAliases' },
        { title: 'Créer un Héros', view: 'TestHeroCreate' },
        { title: 'Récupérer un Héros', view: 'TestHeroId' },
        { title: 'Modifier un Héros', view: 'TestHeroUpdate' },
        { title: 'Équipes', view: 'TestTeam' },
        { title: 'Créer une équipe', view: 'TestTeamCreate' },
        { title: 'Gérer les équipes', view: 'TestTeamManagement' },
        { title: 'Organisations', view: 'TestOrg' },
        { title: 'Créer une organisation', view: 'TestOrgCreate' },
        { title: 'Ajouter une team à une organisation', view: 'TestOrgTeam' },
        { title: "Supprimer une team d'une organisation", view: 'TestOrgDelete' },
        { title: 'Récupérer une organisation', view: 'TestOrgId' },
        { title: 'Se connecter', view: 'TestUserLogin', notIfConnected: true },
        { title: 'S\'enregistrer', view: 'register', notIfConnected: true },
        { title: 'Mon profil', view: 'LoggedHeroEdit', authOnly: true },
        { title: 'Déconnexion', view: 'Logout', authOnly: true }
      ]
    };
  },
  computed: {
    isConnected() {
      return !!localStorage.getItem("xsrfToken");
    },
    visibleMenuItems() {
      return this.menuItems.filter((item) => {
        if (item.authOnly && !this.isConnected) return false;
        if (item.notIfConnected && this.isConnected) return false;
        return true;
      });
    }
  },
  methods: {
    handleLogout(item) {
      if (item.view === 'Logout') {
        localStorage.removeItem('xsrfToken');
        this.$router.push({ name: 'TestUserLogin' });
        location.reload();
      }
    }
  }
};
</script>

<style scoped>
.v-navigation-drawer {
  width: 250px;
  background-color: #f5f5f5;
}

.v-list-item {
  transition: background-color 0.3s;
}

.v-list-item:hover {
  background-color: #e0e0e0;
}

.v-list-item.router-link-exact-active {
  background-color: #ffc107 !important;
  color: black;
}

.v-list-item-title {
  font-size: 1.1rem;
  font-weight: 500;
}

.v-divider {
  margin: 10px 0;
}
</style>
