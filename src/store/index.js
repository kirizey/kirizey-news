import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import notifications from './notifications';
import news from './news';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { auth, notifications, news }
});

export default store;
