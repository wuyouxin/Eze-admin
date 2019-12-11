<template>
  <eze-drawer ref="ezeDrawer" title="图标集合">
    <div class="icons-wrapper">
      <svg-icon
        v-for="item of svgIcons"
        :key="item"
        :icon-class="item"
        class-name="disabled"
        class="icon-item"
        @click="handleSelectIcon(item)"
      />
    </div>
  </eze-drawer>

</template>

<script>
import svgIcons from './svg-icons'
import ezeDrawerMixin from '@@/base/eze-drawer/eze-drawer-mixin'
export default {
  name: 'Icons',
  components: {
    EzeDrawer: () => import('@@/base/eze-drawer'),
    SvgIcon: () => import('@@/base/svg-icon'),
  },
  mixins: [ezeDrawerMixin],
  data() {
    return {
      svgIcons,
    }
  },
  methods: {
    handleSelectIcon(icon) {
      this.$message({
        message: '成功选择了图标',
        type: 'success',
      })
      this.hideDrawer()
      this.$emit('select-icon', icon)
    },
  },
}
</script>

<style lang="stylus" scoped>
.el-drawer__body
  .icons-wrapper
    display flex
    flex-wrap wrap
    color #6a7b8c
    .icon-item
      padding 10px
      width 45px
      height 45px
</style>
