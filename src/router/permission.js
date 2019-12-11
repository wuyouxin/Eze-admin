import router from './index'
import store from '../store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from 'common/utils/auth'
import Layout from '@@/layout'
import TwoLayout from '@@/layout/two-layout'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const name = store.getters.NAME
      if (name !== '') next()
      else {
        try {
          // 获取用户信息
          await store.dispatch('user/getUserDetail')
          const menu = await store.dispatch('user/getAllUserMenus')
          const routess = menuArrayToRoutes(menu)
          const accessRoutes = await store.dispatch('user/setRoutes', routess)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) next()
    else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

const menuArrayToRoutes = (menuTree) => {
  const recursionMenu = menuTree => {
    const routeArr = []
    let i = -1
    const len = menuTree.length
    while (++i < len) {
      const route = menuTree[i]

      if (route.component === 'layout') route.component = Layout
      else if (route.component === 'twoLayout') route.component = TwoLayout
      else route.component = loadViewFile(route.component)

      route.meta = { icon: route.icon, title: route.title }
      if (route.children && route.children.length) route.children = recursionMenu(route.children)

      routeArr.push(route)
    }
    return routeArr
  }
  return recursionMenu(menuTree)
}

// 路由懒加载
const loadViewFile = (viewFile) => () => import(`@@/${viewFile}`)
