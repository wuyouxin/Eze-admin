<template>
  <el-drawer
    custom-class="eze-drawer"
    :title="title"
    :visible.sync="drawer"
    :with-header="true"
  >
    <slot />
  </el-drawer>
</template>

<script>
export default {
  name: 'EzeDrawer',
  props: {
    title: {
      type: String,
      default: '我是标题',
    },
  },
  data() {
    return {
      drawer: false,
    }
  },

  methods: {
    showDrawer() {
      this.drawer = true
    },
    hideDrawer() {
      this.drawer = false
    },
  },
}
</script>

<style lang="stylus" scoped>
>>>.eze-drawer .el-drawer__header
  margin-bottom 12px
  padding 12px 12px 12px
  border-bottom 1px solid #ebeef5
  color #333
  text-align center
  font-weight 700
</style>

