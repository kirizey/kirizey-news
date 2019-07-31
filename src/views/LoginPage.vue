<template>
  <form novalidate class="md-layout" @submit.prevent="submit">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Login</div>
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
            :disabled="isLoading"
          />
          <span
            class="md-error"
            v-if="!$v.form.email.required"
            key="email-invalid-message"
            >The email is required</span
          >
          <span
            class="md-error"
            v-else-if="!$v.form.email.email"
            key="email-invalid-message"
            >Invalid email</span
          >
        </md-field>
      </md-card-content>

      <md-card-content>
        <md-field :class="getValidationClass('password')">
          <label for="password">Password</label>
          <md-input
            type="password"
            name="password"
            id="password"
            autocomplete="password"
            v-model="form.password"
            :disabled="isLoading"
          />
          <span
            class="md-error"
            v-if="!$v.form.password.required"
            key="password-invalid-message"
            >The password is required</span
          >
          <span
            class="md-error"
            v-else-if="!$v.form.minLength"
            key="password-invalid-message"
            >Your password too short</span
          >
        </md-field>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="isLoading" />

      <md-card-actions>
        <p class="link-to-register">
          Or
          <router-link to="/register" tag="i">
            <strong> register </strong>
          </router-link>
        </p>
        <md-button type="submit" class="md-raised" :disabled="isLoading"
          >Login</md-button
        >
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'login-page',
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null
    },
    isLoading: false
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
    ...mapActions(['loginUserWithEmailAndPassword']),

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

    async login() {
      const { email, password } = this.form;
      this.isLoading = true;

      try {
        await this.loginUserWithEmailAndPassword({ email, password });
        this.isLoading = false;
        this.clearForm();
        this.$router.push('/news');
      } catch (error) {
        this.isLoading = false;
      }
    },

    submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.login();
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

.md-card-actions {
  justify-content: space-between !important;
}

.link-to-register {
  margin-left: 20px;
  cursor: pointer;
}
</style>
