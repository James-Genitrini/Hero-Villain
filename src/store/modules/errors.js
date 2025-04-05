export default {
    state: {
        isError: false,
        errorMsg: '',
    },
    mutations: {
        pushError(state, msg) {
        state.isError = true;
        state.errorMsg = msg;
        },
        popError(state) {
        state.isError = false;
        state.errorMsg = '';
        },
    },
    actions: {
        triggerError({ commit }, msg) {
        commit('pushError', msg);
        },
        clearError({ commit }) {
        commit('popError');
        },
    },
    getters: {
        isError: (state) => state.isError,
        errorMsg: (state) => state.errorMsg,
    },
};
