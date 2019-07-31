<template>
  <md-snackbar
    :md-active="isSnackBarShowing"
    md-position="left"
    md-persistent
    >{{ notificationMessage }}</md-snackbar
  >
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'notification-snackbar',
  computed: {
    ...mapGetters(['isSnackBarShowing', 'notificationMessage'])
  }
};
</script>
