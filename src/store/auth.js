import firebase from 'firebase/app';
import { errorsCodes } from './errorsCodes';

const state = {};
const getters = {};
const mutations = {};
const actions = {
  loginUserWithEmailAndPassword: async (context, { email, password }) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === errorsCodes.userNotFound) {
        throw new Error(error);
      }
    }
  },

  logout: async () => {
    await firebase.auth().signOut();
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
