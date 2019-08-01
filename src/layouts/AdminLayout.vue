<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary md-large md-theme-dark">
        <div class="md-toolbar-row">
          <span class="md-title">Kirizey News Admin</span>
        </div>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <router-link to="/news" tag="b" class="admin__navigation-title">
            < Go to site</router-link
          ></md-toolbar
        >

        <md-list>
          <router-link to="/admin" tag="md-list-item">
            <md-icon>library_books</md-icon>
            <span class="md-list-item-text">News list</span>
          </router-link>
          <router-link to="/admin/news/create" tag="md-list-item">
            <md-icon>library_add</md-icon>
            <span class="md-list-item-text">Create new</span>
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
export default {};
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
    color: rgba(0, 0, 0, 0.87);
  }
}

.md-app-toolbar {
  background-color: #ff5252 !important;
}

.admin__navigation-title {
  cursor: pointer;
}
</style>

