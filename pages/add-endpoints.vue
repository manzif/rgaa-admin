<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="8" sm="6">
        <v-container grid-list-md>
          <v-card text class="pa-10">
            <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
              <v-layout row wrap class="pa-5">
                <v-flex xs12 md12 class="pb-3">
                  <h2 class="headline black--text pb-1 font-weight-bold">
                    Create Endpoint
                  </h2>
                  <div class="line"></div>
                </v-flex>
                <v-flex xs12 md6>
                  <div class="subtitle-1 grey--text pb-1">Name</div>
                  <v-text-field
                    v-model="name"
                    :rules="[(v) => !!v || 'Name is required']"
                    required
                    dense
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <div class="subtitle-1 grey--text pb-1">
                    Type
                  </div>
                  <v-select
                    v-model="type"
                    :rules="[(v) => !!v || 'Type is required']"
                    :items="typeItems"
                    dense
                    outlined
                  ></v-select>
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Description
                  </div>
                  <v-textarea
                    v-model="description"
                    :rules="[(v) => !!v || 'Description is required']"
                    dense
                    single-line
                    outlined
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text text--primary pb-1">
                    Url
                  </div>
                  <v-text-field
                    v-model="url"
                    :rules="[(v) => !!v || 'Url is required']"
                    dense
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Body
                  </div>
                  <v-layout row wrap>
                    <v-flex xs12 md5>
                      <v-text-field
                        v-model="bodItem.party"
                        :rules="[(v) => !!v || 'Url is required']"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md5>
                      <v-text-field
                        v-model="bodyItem.name"
                        :rules="[(v) => !!v || 'Url is required']"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                      <v-btn outlined grey>Add</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <!-- <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Success
                  </div>
                  <v-layout row wrap>
                    <v-flex xs12 md5>
                      <v-text-field
                        v-model="success"
                        :rules="companyRegistrationNumberRules"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md5>
                      <v-text-field
                        v-model="companyRegistrationNumber"
                        :rules="companyRegistrationNumberRules"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                      <v-btn outlined grey>Add</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex> -->
                <!-- <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Failure
                  </div>
                  <v-layout row wrap>
                    <v-flex xs12 md5>
                      <v-text-field
                        v-model="companyRegistrationNumber"
                        :rules="companyRegistrationNumberRules"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md5>
                      <v-text-field
                        v-model="companyRegistrationNumber"
                        :rules="companyRegistrationNumberRules"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                      <v-btn outlined grey>Add</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex> -->
                <v-flex xs12 12>
                  <v-btn
                    :disabled="!isFormValid"
                    @click="createEndpoint"
                    color="primary"
                    block
                    >Save</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-form>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    isFormValid: false,
    callback: '',
    bodyItem: {
      name: '',
      party: ''
    },
    typeItems: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'COPY',
      'HEAD',
      'OPTIONS'
    ],
    name: '',
    description: '',
    url: '',
    lazy: false
  }),
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
    createEndpoint() {
      console.log('\n\n\n', this.body)
      // this.$store.dispatch('helper/loading')
      // this.$store.dispatch('helper/disabling')
      // try {
      //   await this.$store.dispatch('app/createApp', {
      //     title: this.title,
      //     userName: this.userName,
      //     userId: this.userId,
      //     description: this.description
      //   })
      //   this.$store.dispatch('helper/loading')
      //   this.$store.dispatch('helper/disabling')
      //   this.title = null
      //   this.userId = null
      //   this.userName = null
      //   this.description = null
      // } catch (e) {
      //   return e
      // }
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
  border-bottom: 5px solid #0087ff;
  position: absolute;
}
</style>
