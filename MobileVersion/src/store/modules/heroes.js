import heroService from "@/services/hero.service";

const heroes = {
    namespaced: true,
    state: {
        heroAliases: [],
        selectedHero: null,
    },
    mutations: {
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
    },
    actions: {
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
    }
};

export default heroes;