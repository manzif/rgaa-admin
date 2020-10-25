<template>
  <v-row align="center" justify="center">
    <v-container py-3>
      <div class="authentication">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <div class="create-center mb-1 ma-2">
              <v-img :src="myImage"></v-img>
            </div>
          </v-flex>
          <v-flex xs12 sm8 md6>
            <v-layout class="mb-2">
              <div class="text-center">
                <h2>Login</h2>
              </div>
            </v-layout>
            <div class="line" />
            <div class="mb-5"></div>
            <v-layout v-if="errorMessage">
              <div class="mb-3 text-center">
                <v-card class="pa-2">
                  <h4 class="red--text">{{ errorMessage }}</h4>
                </v-card>
              </div>
            </v-layout>
            <v-form v-model="isFormValid" :lazy-validation="lazy">
              <v-card-text class="px-0">
                <v-text-field
                  ref="email"
                  v-model="email"
                  :rules="emailRules"
                  name="login"
                  label="Email Address"
                  type="text"
                  outlined
                  dense
                  required
                />
                <v-text-field
                  id="password"
                  ref="password"
                  v-model="password"
                  :rules="passwordRules"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  name="Password"
                  label="Password"
                  required
                  dense
                  outlined
                />
              </v-card-text>
              <v-card-actions class="px-0">
                <v-btn
                  @click="login"
                  :loading="isLoading"
                  :disabled="isDisabled"
                  large
                  block
                  color="primary mb-1"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-row>
</template>
<script>
export default {
  layout: 'register',
  data() {
    return {
      email: '',
      isFormValid: false,
      myImage: require('@/static/images/RGAA Logo-02.svg'),
      lazy: false,
      showPassword: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [(v) => !!v || 'Password is required']
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    },
    errorMessage() {
      return this.$store.getters['users/errorMessage']
    }
  },
  methods: {
    async login() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('users/login', {
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.email = null
        this.password = null
      } catch (e) {
        // TODO: remove this log
        return e
      }
    }
  }
}
</script>
<style scoped>
.disable-events {
  pointer-events: none;
}
.create-center {
  text-align: center;
}
.line {
  width: 63px;
  border-bottom: 5px solid #38b25d;
  position: absolute;
}
</style>
