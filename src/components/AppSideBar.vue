<template>
  <v-navigation-drawer app clipped v-model="drawer" :mini-variant="miniVariant">
    <v-list dense>
      <v-list-item-group v-for="(item, index) in menuItems" :key="index" :value="currentView">
        <v-list-item :class="{ active: $route.name === item.view }" :to="{ name: item.view }">
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
  props: {
    currentView: String
  },
  data() {
    return {
      drawer: true,
      miniVariant: false,
      menuItems: [
        {
          title: 'Héros',
          view: 'TestHeroAliases' 
        },
        {
          title: 'Créer un Héros',
          view: 'TestHeroCreate'
        },
        {
          title: 'Récupérer un Héros',
          view: 'TestHeroId'
        },
        {
          title: 'Modifier un Héros',
          view:  'TestHeroUpdate'
        },
        {
          title: 'Équipes',
          view: 'TestTeam'
        },
        {
          title: 'Créer une équipe',
          view: 'TestTeamCreate'
        },
        {
          title: 'Gérer les équipes',
          view: 'TestTeamManagement'
        },
        {
          title: 'Organisations',
          view: 'TestOrg'
        },
        {
          title: 'Créer une organisation',
          view: 'TestOrgCreate'
        },
        {
          title: 'Ajouter une team à une organisation',
          view: 'TestOrgTeam'
        },
        {
          title: 'Supprimer une team d\'une organisation',
          view: 'TestOrgDelete'
        },
        {
          title: 'Récupérer une organisation',
          view: 'TestOrgId'
        },
      ]
    };
  }
};
</script>

<style scoped>
.v-navigation-drawer {
  width: 250px;
}

.v-list-item.active {
  background-color: #ffc107 !important;
  color: black;
}
</style>
