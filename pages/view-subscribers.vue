<template>
  <v-container fluid grid-list-md>
    <div class="mb-7 users-center">
      <v-btn class="disable-events" text dark x-large color="#0087ff">
        Subscribers Overview
        <v-icon right>fa-angle-down</v-icon></v-btn
      >
    </div>
    <v-item-group id="element" active-class="secondary">
      <div class="mx-md-12">
        <v-data-table
          :headers="headers"
          :items="allSubscribers"
          :single-expand="true"
          :expanded.sync="expanded"
          :search="search"
          item-key="id"
          show-expand
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title
                >{{ totalSubscribers }} Subscribers</v-toolbar-title
              >
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
                <v-card class="mx-auto mt-5 pl-3 mb-5" max-width="344">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1"
                        >Message Actions</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >The following are actions you can perform on this
                        message</v-list-item-subtitle
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
                          >Delete {{ item.subject }}</v-card-title
                        >
                        <v-card-text
                          >Are you sure you want to delete this
                          message</v-card-text
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="dialogDelete = false" color="cancel"
                            >Cancel</v-btn
                          >
                          <v-btn
                            @click="deleteSubscriber(item.id)"
                            :loading="isLoading"
                            :disabled="isDisabled"
                            color="success"
                            >Delete</v-btn
                          >
                        </v-card-actions>
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
      reason: '',
      isFormValid: false,
      Delete: 'Delete',
      description: 'are you sure you want to delete this user',
      dialog1: false,
      username: '',
      master: '',
      showPassword: false,
      privilege: '',
      password: '',
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
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        { text: 'Email', value: 'email' },
        { text: 'Created At', value: 'createdAt' },
        { text: '', value: 'data-table-expand' }
      ]
    }
  },
  computed: {
    allSubscribers() {
      return this.$store.getters['endpoint/allSubscribers']
    },
    totalSubscribers() {
      return this.$store.getters['endpoint/totalSubscribers']
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
      if (this.allSubscribers.length === 0) {
        this.$store.dispatch('endpoint/fetchSubscribers')
      }
    } catch (e) {
      return e
    }
  },
  methods: {
    async deleteSubscriber(id) {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('endpoint/deleteSubscriber', id)
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.dialogDelete = false
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
