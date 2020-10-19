/* eslint-disable no-console */
// import Cookie from 'js.cookie'

export const state = () => ({
  endpoints: [],
  totalEndpoint: '',
  subscribers: [],
  totalSubscribers: ''
})

export const mutations = {
  GET_ENDPOINTS(state, endpoints) {
    state.endpoints = endpoints
  },
  GET_SUBSCRIBERS(state, subscribers) {
    state.subscribers = subscribers
  },
  GET_TOTAL_ENDPOINT: (state, totalEndpoint) => {
    state.totalEndpoint = totalEndpoint
  },
  GET_TOTAL_SUBSCRIBERS: (state, totalSubscribers) => {
    state.totalSubscribers = totalSubscribers
  }
}

export const actions = {
  async fetchEndpoints({ commit }) {
    try {
      const { data } = await this.$axios.get('/contacts/contacts')
      commit('GET_ENDPOINTS', data.message)
      commit('GET_TOTAL_ENDPOINT', data.total)
    } catch (error) {
      if (error.response) {
        console.log('\n\n\n\n\n', error.response.data.message)
      }
    }
  },

  async fetchSubscribers({ commit }) {
    try {
      const { data } = await this.$axios.get('/subscribers/subscribers')
      commit('GET_SUBSCRIBERS', data.subscribers)
      commit('GET_TOTAL_SUBSCRIBERS', data.total)
    } catch (error) {
      if (error.response) {
        console.log('\n\n\n\n\n', error.response.data.message)
      }
    }
  },

  async deleteMessage({ commit }, id) {
    try {
      await this.$axios.delete(`/contacts/contacts/${id}`)
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have successfully deleted a message'
      })
      await this.dispatch('endpoint/fetchEndpoints')
    } catch (e) {
      return e
    }
  },

  async deleteSubscriber({ commit }, id) {
    try {
      await this.$axios.delete(`/subscribers/subscribers/${id}`)
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have successfully deleted a subscriber'
      })
      await this.dispatch('endpoint/fetchSubscribers')
    } catch (e) {
      return e
    }
  }
}

export const getters = {
  allEndpoints(state) {
    return state.endpoints
  },
  totalEndpoint(state) {
    return state.totalEndpoint
  },
  allSubscribers(state) {
    return state.subscribers
  },
  totalSubscribers(state) {
    return state.totalSubscribers
  }
}
