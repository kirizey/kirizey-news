<template>
  <form novalidate class="md-layout" @submit.prevent="submit">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Register</div>
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

      <md-card-content class="relative">
        <md-checkbox
          id="agree"
          name="agree"
          v-model="form.agree"
          :disabled="isLoading"
        >
          <label for="agree">Agree with terms.</label>
        </md-checkbox>
        <span
          class="md-error"
          v-if="$v.form.$touch && !$v.form.agree.checked"
          key="agree-invalid-message"
          >The agrement is required</span
        >
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="isLoading" />

      <md-card-actions>
        <p class="link-to-register">
          Or
          <router-link to="/login" tag="i">
            <strong> login </strong>
          </router-link>
        </p>
        <md-button type="submit" class="md-raised" :disabled="isLoading"
          >Register</md-button
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
  name: 'register-page',
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null,
      agree: false
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
      },
      agree: {
        checked: v => v
      }
    }
  },
  methods: {
    ...mapActions(['registerWithEmailAndPassword']),

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

    async register() {
      const { email, password } = this.form;
      this.isLoading = true;

      try {
        await this.registerWithEmailAndPassword({ email, password });
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
        this.register();
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

.md-error {
  height: 20px;
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  color: #ff1744;
  left: 15px;
}
</style>
