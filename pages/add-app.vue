<template>
  <v-container fill-height fluid>
    <div class="mx-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="7" sm="6">
          <h2 class="pb-1" color="#38b25d">
            Create a Member.
          </h2>
          <div class="line"></div>
          <h4 class="my-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut,
            suscipit a. Debitis placeat asperiores corrupti dolores? Vel
            voluptatibus aut animi, quas doloribus, itaque molestiae ipsum
            officia at natus mollitia iure?
          </h4>
          <v-btn class="" color="#38b25d" outlined to="/view-apps" nuxt
            ><v-icon>mdi-play</v-icon> See all Members</v-btn
          >
        </v-col>
        <v-col cols="12" md="5" sm="6">
          <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
            <v-flex xs12 md12 class="pb-7">
              <h2 class="headline black--text pb-1 font-weight-bold">
                Create Member
              </h2>
              <div class="line"></div>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="name"
                :rules="[(v) => !!v || 'CompanyName is required']"
                label="CompanyName"
                required
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-select
                v-model="type"
                :rules="[(v) => !!v || 'CompanyType is required']"
                :items="typeItems"
                label="CompanyType"
                dense
                outlined
              ></v-select>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="website"
                label="Website"
                required
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="address"
                :rules="[(v) => !!v || 'Address is required']"
                label="Address"
                required
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="owner"
                :rules="[(v) => !!v || 'Title is required']"
                label="Title"
                required
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="email"
                :rules="[(v) => !!v || 'Email is required']"
                label="Email"
                required
                dense
                single-line
                outlined
              ></v-text-field>
              <v-text-field
                v-model="phonenumber"
                :rules="[(v) => !!v || 'PhoneNumber is required']"
                label="PhoneNumber"
                required
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-btn
                @click="createApp"
                :loading="isLoading"
                :disabled="isDisabled"
                color="primary"
                block
                >Create</v-btn
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
      name: '',
      address: '',
      email: '',
      type: '',
      typeItems: [
        'Casino',
        'Sports betting',
        'Gaming machine',
        'Internet Gaming',
        'Lottery'
      ],
      isFormValid: false,
      owner: '',
      website: '',
      phonenumber: ''
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
    async createApp() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('app/createApp', {
          name: this.name,
          email: this.email,
          address: this.address,
          owner: this.owner,
          type: this.type,
          website: this.website,
          phonenumber: this.phonenumber
        })
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.name = null
        this.owner = null
        this.phonenumber = null
        this.address = null
        this.type = null
        this.website = null
        this.email = null
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
  border-bottom: 5px solid #38b25d;
  position: absolute;
}
</style>
