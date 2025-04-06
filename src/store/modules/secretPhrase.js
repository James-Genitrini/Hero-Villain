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
    },
    getters: {
        hasOrgSecret: (state) => !!state.organizationPassword,
      }      
};

export default secretPhrase;
