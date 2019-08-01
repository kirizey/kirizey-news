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
      sendErrorNotification(store, 'Deny create request.');
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
      sendErrorNotification(store, 'Cannot get news.');
    }
  },

  getNewById: async (context, id) => {
    try {
      return (await firebase
        .database()
        .ref(`/news/${id}`)
        .once('value')).val();
    } catch (error) {
      sendErrorNotification(store, 'Cannot update new.');
    }
  },

  updateNewRequest: async (context, { id, title, body }) => {
    try {
      await firebase
        .database()
        .ref(`/news`)
        .child(id)
        .update({ title, body });
      store.dispatch('pushNotification', 'Update successful.');
    } catch (error) {
      sendErrorNotification(store, 'Update new failed.');
    }
  },

  removeNewRequest: async (context, id) => {
    try {
      await firebase
        .database()
        .ref('/news')
        .child(id)
        .remove();
      store.dispatch('pushNotification', 'Remove successful.');
    } catch (error) {
      sendErrorNotification(store, 'Remove new failed.');
    }
  }
};

const sendErrorNotification = (store, message) => {
  store.dispatch('pushNotification', message);
  throw new Error(message);
};

export default {
  state,
  getters,
  mutations,
  actions
};
