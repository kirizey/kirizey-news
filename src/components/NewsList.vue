<template>
  <md-list v-if="news">
    <md-subheader>News</md-subheader>
    <md-list-item v-for="(newItem, index) in news" v-bind:key="index">
      <router-link :to="{ path: `${forAdminLink}/news/${newItem.id}` }">
        {{ newItem.title }}
      </router-link>
    </md-list-item>
  </md-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'news-list',
  props: { forAdmin: Boolean },
  computed: {
    ...mapGetters(['news']),

    forAdminLink() {
      return this.forAdmin ? '/admin' : '';
    }
  },
  methods: {
    ...mapActions(['getAllNews'])
  },
  mounted() {
    this.getAllNews();
  }
};
</script>
