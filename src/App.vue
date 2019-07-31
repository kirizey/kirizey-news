<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import ClientLayout from './layouts/ClientLayout';

export default {
  components: {
    AuthLayout,
    AdminLayout,
    ClientLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'auth') + '-layout';
    }
  }
};
</script>
