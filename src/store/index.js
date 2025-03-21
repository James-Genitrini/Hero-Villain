import Vue from 'vue';
import Vuex from 'vuex';
import heroService from "@/services/hero.service"; // Assurez-vous que ce service est bien défini

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    organizationPassword: '',
    heroAliases: [],
    selectedHero: null,
    teams: [],
    selectedTeam: null,
    organizationNames: [],
    selectedOrganization: null,
  },
  mutations: {
    setOrganizationPassword(state, password) {
      state.organizationPassword = password;
    },
    setHeroAliases(state, aliases) {
      state.heroAliases = aliases;
    },
    setSelectedHero(state, hero) {
      state.selectedHero = hero;
    },
    updateHero(state, hero) {
      if (state.selectedHero && state.selectedHero._id === hero._id) {
        state.selectedHero = { ...state.selectedHero, ...hero };
      }
    },
    setTeams(state, teams) {
      state.teams = teams;
    },
    setSelectedTeam(state, team) {
      state.selectedTeam = team;
    },
    updateTeam(state, team) {
      if (state.selectedTeam && state.selectedTeam._id === team._id) {
        state.selectedTeam = { ...state.selectedTeam, ...team };
      }
    },
    setOrganizationNames(state, names) {
      state.organizationNames = names;
    },
    setSelectedOrganization(state, org) {
      state.selectedOrganization = org;
    },
    updateOrganization(state, org) {
      if (state.selectedOrganization && state.selectedOrganization._id === org._id) {
        state.selectedOrganization = { ...state.selectedOrganization, ...org };
      }
    },
  },
  actions: {
    setOrganizationPassword({ commit }, password) {
      commit('setOrganizationPassword', password);
    },
    setHeroAliases({ commit }, aliases) {
      commit('setHeroAliases', aliases);
    },
    setSelectedHero({ commit }, hero) {
      commit('setSelectedHero', hero);
    },
    async updateHero({ commit }, { heroData, orgSecret }) {
      try {
        const response = await heroService.updateHero(heroData, orgSecret);
        
        commit("setSelectedHero", response.data);
        
        return response.data; 
      } catch (err) {
        throw new Error("Erreur lors de la mise à jour du héros : " + err.message);
      }
    },
    setTeams({ commit }, teams) {
      commit('setTeams', teams);
    },
    setSelectedTeam({ commit }, team) {
      commit('setSelectedTeam', team);
    },
    updateTeam({ commit }, team) {
      commit('updateTeam', team);
    },
    setOrganizationNames({ commit }, names) {
      commit('setOrganizationNames', names);
    },
    setSelectedOrganization({ commit }, org) {
      commit('setSelectedOrganization', org);
    },
    updateOrganization({ commit }, org) {
      commit('updateOrganization', org);
    },
    async fetchHeroById({ commit }, { heroId, orgSecret }) {
      try {
        const response = await heroService.getHeroById(heroId, orgSecret);
        commit("setSelectedHero", response.data[0]);
        commit("setOrganizationPassword", orgSecret);
        return response.data[0]; 
      } catch (err) {
        throw new Error("Erreur lors de la récupération du héros : " + err.message);
      }
    }
  }
});
