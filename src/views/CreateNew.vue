<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="submit">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Create new</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('title')">
                <label for="title">Title</label>
                <md-input
                  name="title"
                  id="title"
                  type="text"
                  v-model="form.title"
                  :disabled="loading"
                />
                <span class="md-error" v-if="!$v.form.title.required"
                  >Title is required</span
                >
              </md-field>

              <md-field :class="getValidationClass('body')">
                <label for="body">Body</label>
                <md-input
                  name="body"
                  id="body"
                  type="text"
                  v-model="form.body"
                  :disabled="loading"
                />
                <span class="md-error" v-if="!$v.form.body.required"
                  >Body is required</span
                >
                <span class="md-error" v-else-if="!$v.form.body.minLenght"
                  >Body too short. This must be at least
                  {{ $v.form.body.$params.minLength.min }}</span
                >
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="loading" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="loading"
            >Create new</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  mixins: [validationMixin],
  data: () => ({
    form: {
      title: null,
      body: null
    },
    loading: false
  }),
  validations: {
    form: {
      title: {
        required
      },
      body: {
        required,
        minLength: minLength(10)
      }
    }
  },
  methods: {
    ...mapActions(['createNewRequest']),
    
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    },

    clearForm() {
      this.$v.$reset();
      this.form.title = this.form.body = null;
    },

    async createNew() {
      this.loading = true;

      await this.createNewRequest({
        title: this.form.title,
        body: this.form.body
      });
			this.$router.push('/admin');
			
    },
    submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.createNew();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>