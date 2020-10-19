<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-avatar size="65">
          <img src="~/static/images/defaultProfile.png" alt="John" />
        </v-avatar>

        <v-list-item-title>@{{ authUser.username }}</v-list-item-title>

        <v-btn @click.stop="mini = !mini" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-group prepend-icon="fa-user-plus" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Members</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/add-app">
            <v-list-item-content>
              <v-list-item-title>Create Member</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/view-apps">
            <v-list-item-content>
              <v-list-item-title>View Members</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item to="/view-endpoints">
          <v-list-item-icon>
            <v-icon>fa-comments</v-icon>
          </v-list-item-icon>
          <v-list-item-content prepend-icon="mdi-home-city">
            <v-list-item-title>Messages</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/view-subscribers">
          <v-list-item-icon>
            <v-icon>fa-sort</v-icon>
          </v-list-item-icon>
          <v-list-item-content prepend-icon="mdi-home-city">
            <v-list-item-title>Subscribers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="authUser.role === 'admin'" to="/admin/usersview">
          <v-list-item-icon>
            <v-icon>fa-users</v-icon>
          </v-list-item-icon>
          <v-list-item-content prepend-icon="mdi-home-city">
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      urlImage: 'https://client-api.transax.rw/uploads/',
      itemss: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' }
      ],
      mini: true
    }
  },
  computed: {
    authUser() {
      return this.$store.getters['users/loggedInUser']
    }
  }
}
</script>
