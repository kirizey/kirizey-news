<template>
  <div class="news-list" v-if="news">
    <md-list-item v-for="(newItem, index) in news" v-bind:key="index">
      <router-link :to="{ path: `/admin/news/${newItem.id}` }">
        {{ newItem.title }}
      </router-link>
    </md-list-item>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'admin-news-list',
  computed: {
    ...mapGetters(['news'])
  },
  methods: {
    ...mapActions(['getAllNews'])
  },
  mounted() {
    this.getAllNews();
  }
};
</script>
