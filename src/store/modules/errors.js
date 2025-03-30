const errors = {
    state: {
        error: null,
    },
    mutations: {
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        },
    },
    actions: {
        setError({ commit }, error) {
            commit('setError', error);
        },
        clearError({ commit }) {
            commit('clearError');
        },
    }
};

export default errors;
