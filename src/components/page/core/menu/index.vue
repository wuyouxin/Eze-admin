<template>
  <div style="padding:10px;" class="department-wrapper">
    <el-card class="box-card">
      <div class="from-wrapper" style="padding-top:18px;">
        <el-form
          :inline="true"
          size="small"
          :model="menuQuery"
          class="demo-form-inline"
        >
          <el-form-item label="菜单名称">
            <el-input v-model="menuQuery.title" placeholder="输入菜单名称" />
          </el-form-item>
          <el-form-item label="菜单状态">
            <el-select v-model="menuQuery.status" placeholder="选择菜单状态">
              <el-option label="全部" value="shanghai" />
              <el-option label="启用" value="beijing" />
              <el-option label="禁用" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              round
              @click="onSubmit"
            >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button round icon="el-icon-refresh-left" @click="onSubmit">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-plus"
              type="success"
              round
              @click="handleAddMenuShow"
            >添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-divider />

      <eze-table
        border
        size="mini"
        :columns="columns"
        :data="menuData"
      >
        <template #title="{ row, index }">
          <el-input
            v-if="editIndex === index"
            v-model="row.title"
            style="width:auto;"
            size="small"
            placeholder="请输入内容"
          />
          <span v-else>{{ row.title }}</span>
        </template>
        <template #path="{ row, index }">
          <el-input
            v-if="editIndex === index"
            v-model="row.path"
            size="small"
            placeholder="请输入内容"
          />
          <span v-else>{{ row.path }}</span>
        </template>
        <template #icon="{ row, index }">
          <el-input
            v-if="editIndex === index"
            v-model="row.icon"
            size="small"
            placeholder="请选择图标"
            @focus="handleIconFocus"
          />
          <svg-icon v-else-if="row.icon" :icon-class="row.icon" />
          <span v-else>-</span>
        </template>
        <template #name="{ row, index }">
          <el-input
            v-if="editIndex === index"
            v-model="row.name"
            size="small"
            placeholder="请输入内容"
          />
          <span v-else>{{ row.name }}</span>
        </template>
        <template #component="{ row, index }">
          <el-input
            v-if="editIndex === index"
            v-model="row.component"
            size="small"
            placeholder="请输入内容"
          />
          <span v-else>{{ row.component }}</span>
        </template>
        <template #action="{ row, index }">
          <div v-if="editIndex === index">
            <el-button
              circle
              size="small"
              type="success"
              icon="el-icon-coin"
              @click="handleUpdateMenu(index,row)"
            />
            <el-button
              circle
              size="small"
              type="warning"
              icon="el-icon-close"
              @click="editIndex = -1"
            />
          </div>
          <div v-else>
            <el-button
              circle
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="handleEditMenu( index,row)"
            />
            <el-button
              circle
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="handleDeleteMenu(index,row)"
            />
          </div>
        </template>
      </eze-table>
    </el-card>
    <icon-list ref="iconList" @select-icon="handleSelectIcon" />
    <add-menu ref="addMenu" :menu-data="menuData" />
  </div>
</template>

<script>
import { getAllMenus, updateMenu, deleteMenu } from '@/api'
export default {
  components: {
    IconList: () => import('@@/base/icon-list'),
    EzeTable: () => import('@@/base/eze-table'),
    AddMenu: () => import('./add-menu'),
  },
  data() {
    return {
      menuQuery: {
        title: '',
        status: 0,
      },
      menuData: [],
      loading: true,
      columns: [
        {
          label: '菜单名称',
          prop: 'title',
          slot: 'title',
        },
        {
          label: '类型',
          prop: 'type',
          render: (h, params) => {
            if (params.row.type === 0) {
              return h(
                'el-tag',
                {
                  props: {
                    size: 'small',

                  },
                },
                '目录',
              )
            }
            if (params.row.type === 1) {
              return h(
                'el-tag',
                {
                  props: {
                    size: 'small',
                    type: 'danger',
                  },
                },
                '菜单',
              )
            }
          },
        },
        {
          label: '路由地址',
          prop: 'path',
          slot: 'path',
        },
        {
          label: '图标',
          prop: 'icon',
          slot: 'icon',
        },
        {
          label: '菜单name (唯一)',
          prop: 'name',
          slot: 'name',
        },
        {
          label: '菜单物理地址',
          prop: 'component',
          slot: 'component',
        },
        {
          label: '操作',
          slot: 'action',
        },
      ],
      // 当前聚焦的输入框的行数
      editIndex: -1,
    }
  },
  created() {
    this.getAllMenus()
  },
  methods: {
    getAllMenus() {
      getAllMenus().then(res => {
        this.menuData = res.data
        this.loading = false
      })
    },
    handleIconFocus() {
      this.$refs.iconList.showDrawer()
    },
    handleSelectIcon(icon) {
      this.editRow.icon = icon
    },
    handleEditMenu(index, row) {
      // iocn用
      this.editRow = row
      this.editIndex = index
    },
    handleUpdateMenu(index, row) {
      // 保存数据，向后台取数据
      this.editIndex = -1
      updateMenu(row).then(res => {
        this.getAllMenus()
      })
    },
    handleDeleteMenu(index, row) {
      const { id, children } = row
      if (children && children.length) {
        return this.$message.error('还有子节点，不能删除！')
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteMenu(id).then(() => {
          this.getAllMenus()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
    },
    handleAddMenuShow() {
      this.$refs.addMenu.showDrawer()
    },

    onSubmit() {
      console.log('submit!')
    },
  },
}
</script>

<style lang="stylus" scoped>
.department-wrapper
  .box-card
    min-height calc(100vh - 70px)
</style>
