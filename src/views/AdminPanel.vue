<template>
  <md-list>
    <md-subheader>News</md-subheader>
    <admin-news-list />
  </md-list>
</template>

<script>
import AdminNewsList from '../components/AdminNewsList';

export default {
  name: 'admin-panel',
  components: {
    'admin-news-list': AdminNewsList
  }
};
</script>

