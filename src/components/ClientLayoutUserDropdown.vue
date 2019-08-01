<template>
  <div class="md-toolbar-section-end">
    <md-menu md-size="medium" md-align-trigger>
      <md-button md-menu-trigger><md-icon>person_outline</md-icon></md-button>

      <md-menu-content>
        <md-menu-item @click="logout">Logout</md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'client-layout-user-dropdown',
  methods: {
    ...mapActions(['singOut']),

    async logout() {
      await this.singOut();
      this.$router.push('/login');
    }
  }
};
</script>
