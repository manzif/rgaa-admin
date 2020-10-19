<template>
  <v-container fill-height fluid>
    <div class="mx-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="7" sm="6">
          <h2 class="pb-1" color="#0087ff">
            Add a Developer.
          </h2>
          <div class="line"></div>
          <h4 class="my-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut,
            suscipit a. Debitis placeat asperiores corrupti dolores? Vel
            voluptatibus aut animi, quas doloribus, itaque molestiae ipsum
            officia at natus mollitia iure?
          </h4>
          <v-btn class="" color="#0087ff" outlined to="/admin/usersview" nuxt
            ><v-icon>mdi-play</v-icon> See all available users</v-btn
          >
        </v-col>
        <v-col cols="12" md="5" sm="6">
          <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
            <v-flex xs12 md12 class="pb-7">
              <h2 class="headline black--text pb-1 font-weight-bold">
                Add Developer
              </h2>
              <div class="line"></div>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="firstname"
                :rules="[(v) => !!v || 'FirstName is required']"
                label="FirstName"
                required
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="lastname"
                :rules="[(v) => !!v || 'LastName is required']"
                label="LastName"
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="username"
                label="Username"
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
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
            </v-flex>
            <v-flex xs12 md12>
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
            </v-flex>
            <v-flex xs12 md12>
              <v-btn
                @click="registerUser"
                :loading="isLoading"
                :disabled="isDisabled"
                color="primary"
                block
                >Add</v-btn
              >
            </v-flex>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      isFormValid: false,
      email: '',
      username: '',
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
    }
  },
  methods: {
    async registerUser() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        const role = 'developer'
        await this.$store.dispatch('users/registerUser', {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          email: this.email,
          password: this.password,
          role
        })
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.firstname = null
        this.lastname = null
        this.username = null
        this.email = null
        this.password = null
      } catch (e) {
        return e
      }
    }
  }
}
</script>
<style scoped>
.line {
  width: 63px;
  border-bottom: 5px solid #0087ff;
  position: absolute;
}
</style>
