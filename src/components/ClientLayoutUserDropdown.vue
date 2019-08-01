<template>
  <div class="md-toolbar-section-end">
    <md-menu md-size="medium" md-align-trigger>
      <md-button md-menu-trigger>
        <div class="user-dropdown__content-wrapper">
          <span class="user__email"> {{ user.email }}</span>
          <md-icon>person_outline</md-icon>
        </div>
      </md-button>

      <md-menu-content>
        <router-link to="/admin" tag="md-menu-item">Admin panel</router-link>
        <md-menu-item @click="logout">Logout</md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'client-layout-user-dropdown',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['singOut']),

    async logout() {
      this.$router.push('/login');
      await this.singOut();
    }
  }
};
</script>

<style lang="scss" scoped>
.user-dropdown__content-wrapper {
  display: flex !important;
  align-items: center !important;
}

.user__email {
  margin: 1px 10px 0 0;
}
</style>

