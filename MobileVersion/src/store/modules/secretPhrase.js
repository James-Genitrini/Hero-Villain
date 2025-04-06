const secretPhrase = {
    state: {
        organizationPassword: localStorage.getItem('secretPhrase') || '',
    },
    mutations: {
        setOrganizationPassword(state, password) {
            state.organizationPassword = password;
        },
    },
    actions: {
        setOrganizationPassword({ commit }, password) {
            localStorage.setItem('secretPhrase', password); 
            commit('setOrganizationPassword', password);
        },
    },
    getters: {
        hasOrgSecret: (state) => !!state.organizationPassword,
      }      
};

export default secretPhrase;
