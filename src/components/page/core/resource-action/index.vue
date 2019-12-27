<template>
  <div style="padding:10px;" class="resource-action-wrapper">
    <el-card class="box-card">
      <div class="from-wrapper" style="padding-top:18px;">
        <el-form
          ref="menuQuery"
          :inline="true"
          size="small"
          class="demo-form-inline"
        >
          <el-form-item label="菜单名称">
            <el-input v-model="title" placeholder="输入菜单名称" />
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
            <el-button round icon="el-icon-refresh-left" @click="resetMenuQuery">重置</el-button>
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
        <template #icon="{ row, index }">
          <svg-icon v-if="row.icon" :icon-class="row.icon" />
          <span v-else>-</span>
        </template>
        <template #action="{ row, index }">
          <el-button
            circle
            size="small"
            type="primary"
            round
          >
            <svg-icon icon-class="action" />
          </el-button>
          <el-button
            circle
            size="small"
            type="success"
            round
          >
            <svg-icon icon-class="resource" />
          </el-button>
        </template>
        <template #pagination>
          <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total"
            @current-change="currentChange"
          />
        </template>
      </eze-table>
    </el-card>
  </div>
</template>

<script>
// 菜单
const MENU = 1
// 正常
const STATUS_NORMAL = 0
// 冻结
const STATUS_FROZEN = 1
import { getAllMenusType, findAllMenusType } from '@/api'
export default {
  components: {
    EzeTable: () => import('@@/base/eze-table'),
  },
  data() {
    return {
      title: '',
      menuData: [],
      columns: [
        {
          label: '菜单名称',
          prop: 'title',
        },
        {
          label: '状态',
          prop: 'status',
          render: (h, params) => {
            if (params.row.status === STATUS_NORMAL) {
              return h(
                'el-tag',
                {
                  props: {
                    size: 'small',
                    type: 'warning',
                  },
                },
                '启用',
              )
            }
            if (params.row.status === STATUS_FROZEN) {
              return h(
                'el-tag',
                {
                  props: {
                    size: 'small',
                    type: 'info',
                  },
                },
                '冻结',
              )
            }
          },
        },
        {
          label: '图标',
          prop: 'icon',
          slot: 'icon',
        },
        {
          label: '操作',
          align: 'center',
          slot: 'action',
        },
      ],
      // 总页码
      total: 0,
      // TODO
      // 每页显示条数
      pageSize: 5,
      // 当前页码
      current: 1,
    }
  },
  created() {
    this.getAllMenusType()
  },
  methods: {
    getAllMenusType() {
      getAllMenusType(MENU, { size: this.pageSize, current: this.current }).then(res => {
        const { records, total } = res.data
        this.menuData = records
        this.total = total
      })
    },
    onSubmit() {
      findAllMenusType(MENU, { size: this.pageSize, current: this.current, title: this.title }).then(res => {
        const { records, total } = res.data
        this.menuData = records
        this.total = total
      })
    },
    resetMenuQuery() {
      this.title = ''
      this.getAllMenusType()
    },
    currentChange(index) {
      this.current = index
      this.getAllMenusType()
    },
  },
}
</script>

<style lang="stylus" scoped>
.resource-action-wrapper
  .box-card
    min-height calc(100vh - 70px)
    .pagination
      position absolute
      right 30px
      bottom 50px
</style>
