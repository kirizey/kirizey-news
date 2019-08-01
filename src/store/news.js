import firebase from 'firebase/app';

import store from './index';

const state = { news: null };

const getters = {};

const mutatios = {};

const actions = {
  createNewRequest: async (context, { title, body }) => {
    try {
      await firebase
        .database()
        .ref(`/news`)
        .push({ title, body });

      store.dispatch('pushNotification', `New ${title} created`);
    } catch (error) {
      store.dispatch('pushNotification', 'Deny create request.');

      throw new Error('Deny create request.');
    }
  }
};

export default {
  state,
  getters,
  mutatios,
  actions
};
