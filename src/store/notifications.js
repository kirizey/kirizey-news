const state = { isSnackBarShowing: false, notificationMessage: '' };
const getters = {
  isSnackBarShowing: state => state.isSnackBarShowing,
  notificationMessage: state => state.notificationMessage
};
const mutations = {
  setNotificationMessage: (state, message) =>
    (state.notificationMessage = message),
  setSnackbarShowState: (state, payload) => (state.isSnackBarShowing = payload)
};
const actions = {
  pushNotification: (context, message) => {
    context.commit('setNotificationMessage', message);

    toggleShowingStatus(context);
  }
};

const toggleShowingStatus = context => {
  context.commit('setSnackbarShowState', true);
  setTimeout(() => {
    context.commit('setSnackbarShowState', false);
  }, 2000);
};

export default {
  state,
  getters,
  mutations,
  actions
};
