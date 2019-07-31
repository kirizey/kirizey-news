import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import notifications from './notifications';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { auth, notifications }
});

export default store;
