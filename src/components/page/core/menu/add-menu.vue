<template>
  <eze-drawer ref="ezeDrawer" title="添加菜单">
    <div class="add-menu-wrapper">
      <div class="radio-wrapper">
        <el-radio v-model="type" :label="0">目录</el-radio>
        <el-radio v-model="type" :label="1">菜单</el-radio>
      </div>
      <el-form
        ref="menuForm"
        label-position="left"
        size="small"
        :rules="menuRules"
        :model="menuForm"
        label-width="80px"
      >
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="menuForm.title" :placeholder="type ? '请输入菜单名称' : '请输入目录名称'" />
        </el-form-item>
        <el-form-item label="目录" :prop="type ? 'parentTitle' : ''">
          <el-input
            v-model="menuForm.parentTitle"
            v-popover:popover
            readonly
            :placeholder="type ? '请选择菜单所属目录' : '所属目录 （不选为顶层）'"
          />
        </el-form-item>
        <el-form-item label="路由URL" prop="path">
          <el-input v-model="menuForm.path" :placeholder="type ? '请输入路由URL' :'请输入路由URL（顶层目录前面加/)'" />
        </el-form-item>
        <el-form-item label="图标">
          <el-col style="text-align:center;color:#606266;" :span="8">
            <svg-icon v-if="menuForm.icon" :icon-class="menuForm.icon" />
            <div v-else>-</div>
          </el-col>
          <el-col :span="12">
            <el-input v-model="menuForm.icon" placeholder="请输入图标名称或选择" />
          </el-col>
          <el-col :span="4">
            <el-button size="small" type="primary" @click="handleIconShow">选择</el-button>
          </el-col>
        </el-form-item>
        <el-form-item v-if="type === 1" label="物理地址" prop="component">
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
            @click="submitForm"
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
const SORT_ORDER_DEFAULT = 50
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
      menuForm: {
        title: '',
        parentId: '',
        parentTitle: '',
        path: '',
        icon: '',
        component: '',
        sortOrder: SORT_ORDER_DEFAULT,
      },
      defaultProps: {
        children: 'children',
        label: 'title',
      },
    }
  },
  computed: {
    menuRules() {
      return {
        title: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
        path: [
          { required: true, message: '路由URL不能为空', trigger: 'blur' },
        ],
        parentTitle: [
          { required: true, message: '菜单必项属于目录', trigger: 'blur' },
        ],
        component: [
          { required: true, message: '页面物理路径不能为空', trigger: 'blur' },
        ],
      }
    },
  },

  methods: {
    handleShowPopover() {
      if (this.type === 0) this.$refs.tree.filter(0)
      else this.$refs.tree.filter(this.type - 1)
    },
    filterNode(value, data) {
      return data.type === value
    },
    handleNodeClick(row, node) {
      const { level } = node
      switch (!this.type && level) {
        case 1:
          this.menuForm['component'] = 'layoutTwo'
          break
        case 2:
          this.menuForm['component'] = 'layoutThree'
          break
        case 3:
          this.menuForm['component'] = 'layoutFour'
          break
      }
      const { id, title } = row
      this.menuForm['parentId'] = id
      this.menuForm.parentTitle = title
      this.$refs.popover.doClose()
    },
    submitForm() {
      this.menuForm['type'] = this.type
      if (!this.type && !this.menuForm['component']) this.menuForm['component'] = 'layout'
      this.$refs['menuForm'].validate((valid) => {
        if (valid) {
          addMenu(this.menuForm).then(res => {
            this.$refs['menuForm'].resetFields()
            this.menuForm.parentId = ''
            this.menuForm.parentTitle = ''
            this.menuForm.icon = ''
            this.menuForm.component = ''
            this.menuForm.sortOrder = SORT_ORDER_DEFAULT
          })
        }
      })
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
