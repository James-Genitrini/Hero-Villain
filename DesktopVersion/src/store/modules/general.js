const general = {
    state: {
        teams: [],
        selectedTeam: null,
        organizationNames: [],
        selectedOrganization: null,
    },
    mutations: {
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
        }
    }
};

export default general;
