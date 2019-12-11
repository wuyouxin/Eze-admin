import { login, logout, getUserDetail, getAllUserMenus } from '@/api'
import { getToken, setToken, removeToken } from 'common/utils/auth'
import { resetRouter, constantRoutes } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  routes: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getUserDetail({ commit }) {
    return new Promise((resolve, reject) => {
      getUserDetail().then(response => {
        const { data } = response
        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getAllUserMenus({ commit }) {
    return new Promise((resolve, reject) => {
      getAllUserMenus().then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  setRoutes({ commit }, routes) {
    return new Promise(resolve => {
      commit('SET_ROUTES', routes)
      resolve(routes)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

