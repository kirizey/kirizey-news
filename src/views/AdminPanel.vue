<template>
  <news-list forAdmin />
</template>

<script>
import NewsList from '../components/NewsList';

export default {
  name: 'admin-panel',
  components: {
    'news-list': NewsList
  }
};
</script>

