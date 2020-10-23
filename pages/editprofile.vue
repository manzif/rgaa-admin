<template>
  <v-item-group active-class="secondary">
    <div>
      <v-row justify="center">
        <v-col cols="12" md="10" sm="6">
          <v-item>
            <v-container grid-list-md>
              <v-card text class="pa-10">
                <v-form
                  ref="form"
                  v-model="isFormValid"
                  :lazy-validation="lazy"
                >
                  <v-layout row wrap class="pa-5">
                    <v-flex xs12 md12 class="pb-3">
                      <h2 class="headline black--text pb-1 font-weight-bold">
                        Edit Profile
                      </h2>
                      <div class="line"></div>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">FirstName</div>
                      <v-text-field
                        v-model="firstName"
                        :label="authUser.firstname"
                        required
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">LastName</div>
                      <v-text-field
                        v-model="lastName"
                        :label="authUser.lastname"
                        required
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">
                        Username
                      </div>
                      <v-text-field
                        v-model="username"
                        :label="authUser.username"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <div class="subtitle-1 grey--text pb-1">
                        email
                      </div>
                      <v-text-field
                        v-model="email"
                        :label="authUser.email"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md12>
                      <div class="subtitle-1 grey--text pb-1">
                        Password
                      </div>
                      <v-text-field
                        v-model="password"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 12>
                      <v-btn
                        :disabled="!isFormValid"
                        :loading="isLoading"
                        @click="editUser"
                        color="primary"
                        block
                        >Save</v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card>
            </v-container>
          </v-item>
        </v-col>
      </v-row>
    </div>
  </v-item-group>
</template>
<script>
export default {
  data: () => ({
    isFormValid: false,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [(v) => !!v || 'Password is required'],
    lazy: false
  }),
  computed: {
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    },
    authUser() {
      return this.$store.getters['users/loggedInUser']
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async editUser(id) {
      this.$store.dispatch('helper/isLoading')
      try {
        const userData = {
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          password: this.password
        }
        await this.$store.dispatch('users/editUser', {
          userData,
          id
        })
        this.$store.dispatch('helper/isLoading')
        await this.$router.push('/profileview')
        this.dialogEdit = false
        this.email = null
        this.firstname = null
        this.lastname = null
        this.username = null
        this.password = null
      } catch (e) {
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
