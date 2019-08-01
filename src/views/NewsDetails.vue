<template>
  <md-card>
    <md-card-header>
      <div class="md-title">{{ newData.title }}</div>
    </md-card-header>

    <md-card-content>
      {{ newData.body }}
    </md-card-content>
  </md-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  async mounted() {
    this.newId = this.$route.params.id;
    const { title, body } = await this.getNewById(this.newId);
    this.newData.title = title;
    this.newData.body = body;
  },

  data: () => ({
    id: null,
    newData: { title: null, body: null }
  }),
  methods: {
    ...mapActions(['getNewById'])
  }
};
</script>
