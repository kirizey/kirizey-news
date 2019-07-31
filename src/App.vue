<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
    <notification-snackbar />
  </div>
</template>

<script>
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import ClientLayout from './layouts/ClientLayout';
import NotificationSnackbar from './components/NotificationSnackbar';

export default {
  components: {
    AuthLayout,
    AdminLayout,
    ClientLayout,
    NotificationSnackbar
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'auth') + '-layout';
    }
  }
};
</script>

<style lang="scss">
.relative {
  position: relative;
}
</style>

