/* eslint-disable no-console */
// import Cookie from 'js.cookie'

export const state = () => ({
  user: null,
  users: [],
  passwordToken: '',
  errorMessage: '',
  loggedInUser: '',
  totalUser: '',
  totalGuest: '',
  totalDeveloper: '',
  totalAdmin: ''
})

export const mutations = {
  REGISTER_USER(state, user) {
    state.user = user
  },
  GET_USERS(state, users) {
    state.users = users
  },
  SET_USER(state, user) {
    state.loggedInUser = user
  },
  GET_TOTAL_USER: (state, totalUser) => {
    state.totalUser = totalUser
  },
  GET_TOTAL_GUEST: (state, totalGuest) => {
    state.totalGuest = totalGuest
  },
  GET_TOTAL_DEVELOPER: (state, totalDeveloper) => {
    state.totalDeveloper = totalDeveloper
  },
  GET_TOTAL_ADMIN(state, totalAdmin) {
    state.totalAdmin = totalAdmin
  },
  GET_ERROR_MESSAGE: (state, message) => {
    state.errorMessage = message
  }
}

export const actions = {
  async login({ commit }, { email, password }) {
    try {
      const response = await this.$auth.loginWith('local', {
        data: {
          strategy: 'local',
          email,
          password
        }
      })

      if (response.data.message === 'You have been successfully logged in') {
        const data = response.data
        await this.$auth.setUserToken(data.token)
        await this.$auth.setUser(data.user)
        await this.$auth.$storage.setLocalStorage('user', data.user)
        await this.$auth.$storage.setCookie('user', data.user)
        await this.$router.push('/')
        await this.dispatch('users/fetchUsers')
        await this.dispatch('app/fetchApps')
        await this.dispatch('endpoint/fetchEndpoints')
        await this.dispatch('endpoint/fetchSubscribers')
      }
    } catch (error) {
      if (error.response) {
        commit('GET_ERROR_MESSAGE', error.response.data.message)
      }
    }
  },
  async initAuth({ commit }, req) {
    if (req) {
      if (req.headers.cookie) {
        const authUser = this.$auth.$storage.getCookie('user')
        commit('SET_USER', authUser)
      }
    } else {
      const authUser = this.$auth.$storage.getLocalStorage('user')
      if (authUser) {
        await this.$auth.setUser(authUser)
        commit('SET_USER', authUser)
      }
    }
  },

  async logout({ commit }) {
    // TODO: implement the logout

    await this.$auth.logout('local')
    await this.$auth.$storage.setLocalStorage('user', '')
    await this.$auth.$storage.setCookie('user', '')
    await this.$router.push('/login')
  },
  async register({ commit }, userData) {
    try {
      const { data } = await this.$axios.post('/users', {
        ...userData
      })

      commit('REGISTER_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async fetchUsers({ commit }) {
    try {
      const { data } = await this.$axios.get('/users')
      commit('GET_TOTAL_USER', data.total)
      commit('GET_TOTAL_GUEST', data.guest)
      commit('GET_TOTAL_ADMIN', data.admin)
      commit('GET_TOTAL_DEVELOPER', data.developer)
      commit('GET_USERS', data.users)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('You are not Authorized to perform this action')
      }
      throw error
    }
  },

  async editUser({ commit }, { id, userData }) {
    try {
      await this.$axios.patch(`/users/users/${id}`, {
        ...userData
      })
      this.dispatch('users/fetchUsers')
    } catch (e) {
      return e
    }
  },
  async registerUser(
    { commit },
    { email, password, username, firstname, lastname, role }
  ) {
    try {
      const { data } = await this.$axios.post('users', {
        email,
        password,
        username,
        firstname,
        lastname,
        role
      })
      if (data.message === 'User successfully created') {
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: 'User created successfuly'
        })
        await this.dispatch('users/fetchUsers')
        await this.$router.push('/admin/usersview')
      }
    } catch (error) {
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: error.response.data.message
      })
    }
  },
  async deleteUser({ commit }, id) {
    try {
      await this.$axios.delete(`/users/users/${id}`)
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: 'You have successfully deleted a user'
      })

      this.dispatch('users/fetchUsers')
    } catch (e) {
      return e
    }
  }
}

export const getters = {
  allUsers(state) {
    return state.users
  },
  totalGuest(state) {
    return state.totalGuest
  },
  totalUser(state) {
    return state.totalUser
  },
  totalAdmin(state) {
    return state.totalAdmin
  },
  totalDeveloper(state) {
    return state.totalDeveloper
  },
  passwordToken(state) {
    return state.passwordToken
  },
  loggedInUser(state) {
    return state.loggedInUser
  },
  errorMessage(state) {
    return state.errorMessage
  }
}
