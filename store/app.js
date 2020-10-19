/* eslint-disable no-console */
// import Cookie from 'js.cookie'

export const state = () => ({
  apps: [],
  errorMessage: '',
  totalApp: '',
  totalCasino: '',
  totalGaming: '',
  totalInternet: '',
  totalLottery: '',
  totalSports: ''
})

export const mutations = {
  GET_APPS(state, apps) {
    state.apps = apps
  },
  GET_ERROR_MESSAGE: (state, message) => {
    state.errorMessage = message
  },
  GET_TOTAL_APP: (state, totalApp) => {
    state.totalApp = totalApp
  },
  GET_TOTAL_CASINO: (state, totalCasino) => {
    state.totalCasino = totalCasino
  },
  GET_TOTAL_SPORTS: (state, totalSports) => {
    state.totalSports = totalSports
  },
  GET_TOTAL_GAMING: (state, totalGaming) => {
    state.totalGaming = totalGaming
  },
  GET_TOTAL_INTERNET(state, totalInternet) {
    state.totalInternet = totalInternet
  },
  GET_TOTAL_LOTTERY: (state, totalLottery) => {
    state.totalLottery = totalLottery
  }
}

export const actions = {
  async fetchApps({ commit }) {
    try {
      const { data } = await this.$axios.get('/members/members')
      commit('GET_APPS', data.members)
      commit('GET_TOTAL_APP', data.total)
      commit('GET_TOTAL_CASINO', data.casino)
      commit('GET_TOTAL_SPORTS', data.Sports)
      commit('GET_TOTAL_GAMING', data.Gaming)
      commit('GET_TOTAL_INTERNET', data.Internet)
      commit('GET_TOTAL_LOTTERY', data.lottery)
    } catch (error) {
      if (error.response) {
        console.log('\n\n\n\n\n', error.response.data.message)
      }
    }
  },

  async deleteUser({ commit }, id) {
    try {
      await this.$axios.delete(`/users/${id}`)
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have successfully deleted a user'
      })

      this.dispatch('users/fetchUsers')
    } catch (e) {
      return e
    }
  },

  async editUser({ commit }, { id, userData }) {
    try {
      await this.$axios.patch(`/users/${id}`, {
        ...userData
      })
      this.dispatch('users/fetchUsers')
    } catch (e) {
      return e
    }
  },
  async createApp(
    { commit },
    { name, owner, address, email, type, phonenumber, website }
  ) {
    try {
      const { data } = await this.$axios.post('members', {
        name,
        owner,
        type,
        address,
        website,
        phonenumber,
        email
      })
      if (data.message === 'Member successfully created') {
        this.dispatch('app/fetchApps')
        await this.$router.push('/view-apps')
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: data.message
        })
      }
    } catch (error) {
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: error.response.data.message
      })
    }
  },
  async deleteApp({ commit }, id) {
    try {
      await this.$axios.delete(`/members/members/${id}`)
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have successfully deleted a member'
      })
      this.dispatch('app/fetchApps')
    } catch (e) {
      return e
    }
  },
  async editMember({ commit }, { id, userData }) {
    try {
      await this.$axios.patch(`/members/members/${id}`, {
        ...userData
      })
      this.dispatch('app/fetchApps')
    } catch (e) {
      return e
    }
  }
}

export const getters = {
  allApps(state) {
    return state.apps
  },
  errorMessage(state) {
    return state.errorMessage
  },
  totalApp(state) {
    return state.totalApp
  },
  totalCasino(state) {
    return state.totalCasino
  },
  totalGaming(state) {
    return state.totalGaming
  },
  totalSports(state) {
    return state.totalSports
  },
  totalInternet(state) {
    return state.totalInternet
  },
  totalLottery(state) {
    return state.totalLottery
  }
}
