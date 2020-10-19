<template>
  <v-container fluid grid-list-md>
    <div class="mb-7 users-center">
      <v-btn class="disable-events" text dark x-large color="#0087ff">
        Members Overview
        <v-icon right>fa-angle-down</v-icon></v-btn
      >
    </div>
    <v-item-group active-class="secondary">
      <div class="mx-md-12">
        <v-row justify="center">
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" shaped>
                <v-list-item two-line>
                  <v-list-item-content class="pb-0 mb-0">
                    <h4>Total Casino</h4>
                    <v-list-item-title class="headline">{{
                      totalCasino
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="indigo" right>fa-user-plus</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <h4 class="indigo--text">+3.12%</h4>
                  <v-btn class="disable-events" text>since last month</v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" shaped>
                <v-list-item two-line>
                  <v-list-item-content class="pb-0 mb-0">
                    <h4>Total Sports Betting</h4>
                    <v-list-item-title class="headline">{{
                      totalSports
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="orange" right>fa-user-secret</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <h4 class="orange--text">+3.12%</h4>
                  <v-btn class="disable-events" text>since The beginning</v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" shaped>
                <v-list-item two-line>
                  <v-list-item-content class="pb-0 mb-0">
                    <h4>Total Lottery</h4>
                    <v-list-item-title class="headline">{{
                      totalLottery
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="orange" right>fa-user-secret</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <h4 class="orange--text">+3.12%</h4>
                  <v-btn class="disable-events" text>since The beginning</v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" shaped>
                <v-list-item two-line>
                  <v-list-item-content class="pb-0 mb-0">
                    <h4>Total Gaming Machine</h4>
                    <v-list-item-title class="headline">{{
                      totalGaming
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="green" right>fa-code</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <h4 class="green--text">+3.12%</h4>
                  <v-btn class="disable-events" text>since last month</v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" shaped>
                <v-list-item two-line>
                  <v-list-item-content class="pb-0 mb-0">
                    <h4>Total Internet Gaming</h4>
                    <v-list-item-title class="headline">{{
                      totalInternet
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon color="red" right>fa-train</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <h4 class="red--text">+3.12%</h4>
                  <v-btn class="disable-events" text>since last month</v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </div>
    </v-item-group>
    <v-item-group id="element" active-class="secondary">
      <div class="mx-md-12">
        <v-data-table
          :headers="headers"
          :items="allApps"
          :single-expand="true"
          :expanded.sync="expanded"
          :search="search"
          item-key="id"
          show-expand
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>{{ totalApp }} Members</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length">
              <template>
                <v-card class="mx-auto mt-5 pl-3 mb-5" max-width="324">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1"
                        >Members Actions</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >The following are actions you can perform on a
                        member</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <template>
                    <v-dialog v-model="dialogDelete" persistent max-width="390">
                      <template v-slot:activator="{ on }">
                        <v-chip
                          v-on="on"
                          class="ma-2"
                          color="primary"
                          outlined
                          pill
                        >
                          Delete
                          <v-icon right>mdi-delete</v-icon>
                        </v-chip>
                      </template>
                      <v-card>
                        <v-card-title class="headline"
                          >Delete {{ item.name }}</v-card-title
                        >
                        <v-card-text
                          >Are you sure you want to delete this
                          Member</v-card-text
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="dialogDelete = false" color="cancel"
                            >Cancel</v-btn
                          >
                          <v-btn
                            @click="deleteApp(item.id)"
                            :loading="isLoading"
                            :disabled="isDisabled"
                            color="success"
                            >Delete</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogEdit" max-width="500px">
                      <template v-slot:activator="{ on }">
                        <v-chip v-on="on" class="ma-2" color="success" outlined>
                          <v-icon left>mdi-pencil</v-icon>
                          Edit
                        </v-chip>
                      </template>
                      <v-card>
                        <v-toolbar class="mb-6">
                          <v-spacer />
                          <h3 class="headline">Edit {{ item.name }}</h3>
                          <v-progress-linear
                            :active="isProgressLoader"
                            :indeterminate="isProgressLoader"
                            absolute
                            bottom
                            color="primary"
                          ></v-progress-linear>
                          <v-spacer />
                        </v-toolbar>

                        <v-card-text class="pb-0">
                          <v-form v-model="isFormValid">
                            <v-layout align-center justify-center>
                              <v-flex xs12 sm8>
                                <v-text-field
                                  v-model="name"
                                  :label="item.name"
                                  outlined
                                  clearable
                                  dense
                                ></v-text-field>
                                <v-select
                                  v-model="type"
                                  :items="typeItems"
                                  :label="item.type"
                                  dense
                                  outlined
                                ></v-select>
                                <v-text-field
                                  v-model="website"
                                  :label="item.website"
                                  outlined
                                  clearable
                                  dense
                                ></v-text-field>
                                <v-text-field
                                  v-model="address"
                                  :label="item.address"
                                  outlined
                                  clearable
                                  dense
                                  class="mb-0"
                                ></v-text-field>
                                <v-text-field
                                  v-model="owner"
                                  :label="item.owner"
                                  outlined
                                  clearable
                                  dense
                                  class="mb-0"
                                ></v-text-field>
                                <v-text-field
                                  v-model="email"
                                  :rules="emailRules"
                                  :label="item.email"
                                  outlined
                                  clearable
                                  dense
                                  class="mb-0"
                                ></v-text-field>
                                <v-text-field
                                  v-model="phonenumber"
                                  :label="item.phonenumber"
                                  outlined
                                  clearable
                                  dense
                                  class="mb-0"
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-card-actions class="justify-center">
                              <v-btn @click="dialogEdit = false" color="cancel">
                                Cancel</v-btn
                              >
                              <v-btn
                                @click="editMember(item.id)"
                                :disabled="!isFormValid"
                                color="success"
                                >Save</v-btn
                              >
                            </v-card-actions>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </template>
                </v-card>
              </template>
            </td>
          </template>
        </v-data-table>
      </div>
    </v-item-group>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      name: '',
      isFormValid: false,
      Delete: 'Delete',
      description: 'are you sure you want to delete this user',
      dialogEdit: false,
      dialog1: false,
      type: '',
      owner: '',
      showPassword: false,
      website: '',
      address: '',
      phonenumber: '',
      typeItems: [
        'Casino',
        'Sports betting',
        'Gaming machine',
        'Internet Gaming',
        'Lottery'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      dialogDelete: false,
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Type', value: 'type' },
        { text: 'Website', value: 'website' },
        { text: 'Address', value: 'address' },
        { text: 'PhoneNumber', value: 'phonenumber' },
        { text: 'Title', value: 'owner' },
        { text: 'Email', value: 'email' },
        { text: 'Created At', value: 'createdAt' },
        { text: '', value: 'data-table-expand' }
      ]
    }
  },
  computed: {
    allApps() {
      return this.$store.getters['app/allApps']
    },
    totalApp() {
      return this.$store.getters['app/totalApp']
    },
    totalCasino() {
      return this.$store.getters['app/totalCasino']
    },
    totalGaming() {
      return this.$store.getters['app/totalGaming']
    },
    totalSports() {
      return this.$store.getters['app/totalSports']
    },
    totalInternet() {
      return this.$store.getters['app/totalInternet']
    },
    totalLottery() {
      return this.$store.getters['app/totalLottery']
    },
    isProgressLoader() {
      return this.$store.getters['helper/isProgressLoader']
    },
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    }
  },
  created() {
    try {
      if (this.allApps.length === 0) {
        this.$store.dispatch('app/fetchApps')
      }
    } catch (e) {
      return e
    }
  },
  methods: {
    async deleteApp(id) {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('app/deleteApp', id)
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.dialogDelete = false
      } catch (e) {
        return e
      }
    },
    async editMember(id) {
      this.$store.dispatch('helper/isProgressLoader')
      try {
        const userData = {
          email: this.email,
          name: this.name,
          website: this.website,
          address: this.address,
          owner: this.owner,
          type: this.type,
          phonenumber: this.phonenumber
        }
        await this.$store.dispatch('app/editMember', {
          userData,
          id
        })
        this.$store.dispatch('helper/isProgressLoader')
        this.dialogEdit = false
        this.email = null
        this.name = null
        this.website = null
        this.address = null
        this.owner = null
        this.type = null
        this.phonenumber = null
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
.users-center {
  text-align: center;
}
</style>
