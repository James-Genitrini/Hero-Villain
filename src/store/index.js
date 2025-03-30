import Vue from 'vue';
import Vuex from 'vuex';
import general from './modules/general';
import errors from './modules/errors';
import secretPhrase from './modules/secretPhrase';
import heroes from './modules/heroes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    general,
    errors,
    secretPhrase,
    heroes
  }
});
