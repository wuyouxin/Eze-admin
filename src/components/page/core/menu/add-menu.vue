<template>
  <eze-drawer ref="ezeDrawer" title="添加菜单">
    <div class="add-menu-wrapper">
      <div class="radio-wrapper">
        <el-radio v-model="type" :label="0" @change="handleRadioChange">目录</el-radio>
        <el-radio v-model="type" :label="1" @change="handleRadioChange">菜单</el-radio>
        <el-radio v-model="type" :label="2" @change="handleRadioChange">按钮</el-radio>
      </div>
      <el-form
        label-position="left"
        size="small"
        :model="menuForm"
        label-width="80px"
      >
        <el-form-item label="菜单名称">
          <el-input v-model="menuForm.title" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-input v-model="parentTitle" v-popover:popover placeholder="请选择上级菜单" />
        </el-form-item>
        <el-form-item label="路由地址">
          <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item label="图标">
          <el-col style="text-align:center;color:#606266;" :span="8">
            <svg-icon v-if="menuForm.icon" :icon-class="menuForm.icon" />
            <div v-else>-</div>
          </el-col>
          <el-col :span="12">
            <el-input v-model="menuForm.icon" placeholder="请输入图标" />
          </el-col>
          <el-col :span="4">
            <el-button size="small" type="primary" @click="handleIconShow">选择</el-button>
          </el-col>
        </el-form-item>
        <el-form-item v-if="type === 1" label="物理地址">
          <el-input v-model="menuForm.component" placeholder="请输入前端页面物理路径" />
        </el-form-item>
        <el-form-item label="排序">
          <el-slider v-model="menuForm.sortOrder" :max="1000" show-input />
        </el-form-item>
        <el-form-item>
          <el-button
            style="width:100%;margin-top:40px;"
            size="medium"
            type="primary"
            @click="submitForm('menuForm')"
          >立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-popover
      ref="popover"
      placement="bottom"
      width="400"
      trigger="focus"
      @show="handleShowPopover"
    >
      <el-tree
        ref="tree"
        accordion
        :data="menuData"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      />
    </el-popover>
    <icon-list ref="iconList" @select-icon="handleSelectIcon" />
  </eze-drawer>
</template>

<script>

import ezeDrawerMixin from '@@/base/eze-drawer/eze-drawer-mixin'
import { addMenu } from '@/api'
export default {
  name: 'AddMenu',
  components: {
    EzeDrawer: () => import('@@/base/eze-drawer'),
    IconList: () => import('@@/base/icon-list'),
  },
  mixins: [ezeDrawerMixin],
  props: {
    menuData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      type: 0,
      parentTitle: '',
      menuForm: {
        title: '',
        parentId: '',
        path: '',
        icon: '',
        component: '',
        sortOrder: 50,
      },
      defaultProps: {
        children: 'children',
        label: 'title',
      },
    }
  },

  methods: {
    handleRadioChange(type) {
      this.$refs.tree.filter(type)
    },
    handleShowPopover() {
      if (this.type === 0 || this.type === 1) this.$refs.tree.filter(0)
    },
    filterNode(value, data, node) {
      return data.type === value
    },
    handleNodeClick(row) {
      const { id, title } = row
      this.menuForm['parentId'] = id
      this.parentTitle = title
      this.$refs.popover.doClose()
    },
    submitForm(formName) {
      // console.log(this.menuForm)
      if (this.type === 0) this.menuForm['component'] = 'layout'
      this.menuForm['type'] = this.type

      addMenu(this.menuForm)
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      console.log('submit!')
    },
    handleIconShow() {
      this.$refs.iconList.showDrawer()
    },
    handleSelectIcon(icon) {
      this.menuForm['icon'] = icon
    },
  },
}
</script>

<style lang="stylus" scoped>
.add-menu-wrapper
  padding 0 60px
  .radio-wrapper
    padding 50px 0
    text-align center
</style>
