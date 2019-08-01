import firebase from 'firebase/app';

import store from './index';

const state = { news: null };

const getters = {
  news: state => state.news
};

const mutations = {
  setNewsList: (state, payload) => (state.news = payload)
};

const actions = {
  createNewRequest: async (context, { title, body }) => {
    try {
      await firebase
        .database()
        .ref('/news')
        .push({ title, body });

      store.dispatch('pushNotification', `New ${title} created`);
    } catch (error) {
      store.dispatch('pushNotification', 'Deny create request.');

      throw new Error('Deny create request.');
    }
  },

  getAllNews: async context => {
    try {
      let news = (await firebase
        .database()
        .ref('/news')
        .once('value')).val();

      news = Object.keys(news).map(key => ({ ...news[key], id: key }));

      context.commit('setNewsList', news);
    } catch (error) {
      console.log(error);
      store.dispatch('pushNotification', 'Cannot get news.');
      throw new Error('Server error');
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
