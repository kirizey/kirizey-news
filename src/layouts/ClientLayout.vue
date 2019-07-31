<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary md-large md-theme-dark">
        <div class="md-toolbar-row">
          <span class="md-title">Kirizey News</span>

          <div class="md-toolbar-section-end">
            <md-button><md-icon>person_outline</md-icon></md-button>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0"> </md-toolbar>

        <md-list>
          <router-link to="/news" tag="md-list-item">
            <md-icon>receipt</md-icon>
            <span class="md-list-item-text">Latest news</span>
          </router-link>

          <router-link to="/hot-news" tag="md-list-item">
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">Most popular</span>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  data: () => ({})
};
</script>


<style lang="scss" scoped>
.md-app {
  height: 100vh;
}

.md-app-content {
  padding-bottom: 70px;
}

.md-app-drawer {
  width: 250px;
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.12);

  span {
    color: #fff;
  }
}
</style>
