<template>
  <form novalidate class="md-layout" @submit.prevent="login">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Please login</div>
      </md-card-header>

      <md-card-content>
        <md-field :class="getValidationClass('email')">
          <label for="email">Email</label>
          <md-input
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            v-model="form.email"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.email.required"
            >The email is required</span
          >
          <span class="md-error" v-else-if="!$v.form.email.email"
            >Invalid email</span
          >
        </md-field>
      </md-card-content>

      <md-card-content>
        <md-field :class="getValidationClass('password')">
          <label for="password">password</label>
          <md-input
            type="password"
            name="password"
            id="password"
            autocomplete="password"
            v-model="form.password"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.password.required"
            >The password is required</span
          >
          <span class="md-error" v-else-if="!$v.form.minLength"
            >Your password too short</span
          >
        </md-field>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button type="submit" class="md-raised" :disabled="sending"
          >Login</md-button
        >
      </md-card-actions>
    </md-card>

    <md-snackbar :md-active.sync="loggedIn">Login success</md-snackbar>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'FormValidation',
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null
    },
    loggedIn: false,
    sending: false
  }),
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
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
      this.form.email = null;
      this.form.password = null;
    },
    loginRequest() {
      this.sending = true;

      window.setTimeout(() => {
        this.loggedIn = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    login() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loginRequest();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  justify-content: center;
  width: 100%;
}

.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.md-title {
  text-align: center;
}
</style>
