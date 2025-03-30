const secretPhrase = {
    state: {
        organizationPassword: '',
    },
    mutations: {
        setOrganizationPassword(state, password) {
            state.organizationPassword = password;
        },
    },
    actions: {
        setOrganizationPassword({ commit }, password) {
            commit('setOrganizationPassword', password);
        },
    }
};

export default secretPhrase;
