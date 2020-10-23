<template>
  <v-container grid-list-md>
    <div class="mb-4 create-center">
      <v-btn class="disable-events" rounded x-large dark block color="#38b25d"
        ><v-icon outlined class="mr-10">mdi-account-circle-outline </v-icon>View
        {{ authUser.username }}<v-spacer></v-spacer
        ><v-icon>fa-question</v-icon></v-btn
      >
    </div>
    <v-item-group active-class="secondary">
      <v-layout row wrap class="pa-2">
        <v-flex xs12 md4>
          <v-card :ripple="false" class="pa-1">
            <div class="create-center mb-1">
              <v-avatar size="144" class="mb-1">
                <img src="~/static/images/defaultProfile.png" alt="John" />
              </v-avatar>
              <v-list-item-content class="pb-0 mb-0">
                <h4 class="mb-1">@{{ authUser.username }}</h4>
              </v-list-item-content>
            </div>
            <v-divider class="mx-2"></v-divider>
            <v-divider class="mx-2"></v-divider>
            <v-card-actions>
              <v-btn to="/editprofile" block class="primary" nuxt
                >Edit Profile</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 md8>
          <v-card :ripple="false" class="pa-1" max-height="600">
            <v-layout row wrap class="pa-5">
              <v-flex xs12 md6>
                <div class="subtitle-1 grey--text text--primary pb-1">
                  FirstName
                </div>
                <v-text-field
                  :label="authUser.firstname"
                  disabled
                  dense
                  single-line
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <div class="subtitle-1 grey--text text--primary pb-1">
                  LastName
                </div>
                <v-text-field
                  :label="authUser.lastname"
                  dense
                  disabled
                  single-line
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <div class="subtitle-1 grey--text text--primary pb-1">
                  Email
                </div>
                <v-text-field
                  :label="authUser.email"
                  dense
                  disabled
                  single-line
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <div class="subtitle-1 grey--text text--primary pb-1">
                  Username
                </div>
                <v-text-field
                  :label="authUser.username"
                  dense
                  disabled
                  single-line
                  outlined
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-item-group>
  </v-container>
</template>
<script>
export default {
  computed: {
    authUser() {
      return this.$store.getters['users/loggedInUser']
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
</style>
