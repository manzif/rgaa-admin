<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-list shaped dense>
      <v-subheader>User</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>fa-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="authUser.privilege === 1" to="/logs">
          <v-list-item-icon>
            <v-icon>fa-history</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>App Logs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="authUser.privilege === 1" to="/app-errors">
          <v-list-item-icon>
            <v-icon>fa-exclamation-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>App Errors</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/profileview">
          <v-list-item-icon>
            <v-icon>fa-user</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn @click="logout" class="mt-2" color="#38b25d" block text
          ><v-icon>mdi-logout</v-icon>Logout</v-btn
        >
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
/* eslint-disable no-console */
export default {
  data: () => ({
    item: 1,
    items: [
      { text: 'Logout', icon: 'mdi-logout', link: '/login', action: 'logout' }
    ]
  }),
  computed: {
    authUser() {
      return this.$store.getters['users/loggedInUser']
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        })
        this.email = null
        this.password = null
      } catch (e) {
        console.log(e)
      }
    },
    async goTo(val) {
      try {
        if (val === 'logout') {
          await this.$store.dispatch('users/logout')
        }
        console.log(`action of ${val} `)
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('users/logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>
