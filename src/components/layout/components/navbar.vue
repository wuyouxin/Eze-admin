<template>
  <div class="navbar">
    <hamburger
      :is-active="SIDEBAR.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="AVATAR+'?imageView2/1/w/80/h/80'" class="user-avatar" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/wuyouxin/Eze-admin">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@@/base/breadcrumb'
import Hamburger from '@@/base/hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters([
      'SIDEBAR',
      'AVATAR',
    ]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  },
}
</script>

<style lang="stylus" scoped>
.navbar
  position relative
  overflow hidden
  height 50px
  background #fff
  box-shadow 0 1px 4px rgba(0, 21, 41, 0.08)
  .hamburger-container
    float left
    height 100%
    line-height 46px
    cursor pointer
    transition background 0.3s
    -webkit-tap-highlight-color transparent
    &:hover
      background rgba(0, 0, 0, 0.025)
  .breadcrumb-container
    float left
  .right-menu
    float right
    height 100%
    line-height 50px
    &:focus
      outline none
    .right-menu-item
      display inline-block
      padding 0 8px
      height 100%
      color #5a5e66
      vertical-align text-bottom
      font-size 18px
      &.hover-effect
        cursor pointer
        transition background 0.3s
        &:hover
          background rgba(0, 0, 0, 0.025)
    .avatar-container
      margin-right 20px
      .avatar-wrapper
        position relative
        margin-top 10px
        .user-avatar
          width 30px
          height 30px
          border 1px solid #F9FAFE
          border-radius 50%
          cursor pointer
</style>
