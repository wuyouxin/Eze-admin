<template>
  <eze-drawer ref="ezeDrawer" size="42%" title="添加资源">
    <div class="resource-wrapper">
      <eze-table :data="resourceData" :columns="columns">
        <template #code="{ row, index }">
          <el-input v-model="row.code" size="small" placeholder="请输入资源编号" />
        </template>
        <template #menuResourceName="{ row, index }">
          <el-input v-model="row.menuResourceName" size="small" placeholder="请输入资源名称" />
        </template>
        <template #method="{ row, index }">
          <el-input v-model="row.method" size="small" placeholder="请输入请求方式" />
        </template>
        <template #path="{ row, index }">
          <el-input v-model="row.path" size="small" placeholder="请输入请求路径" />
        </template>
        <template #action="{ row, index }">
          <el-button
            circle
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="handleDeleteResourceOne(row,index)"
          />
        </template>
      </eze-table>
      <el-form size="small" :inline="true">
        <el-form-item label="审批人">
          <el-input placeholder="审批人" />
        </el-form-item>
        <el-form-item label="审批人">
          <el-input placeholder="审批人" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
      <el-button-group class="button-wrapper">
        <el-button
          size="small"
          round
          icon="el-icon-plus"
          @click="handleAddResourceOne"
        />
        <el-button size="small" type="primary" @click="handleAddResourceTemplate">使用模板</el-button>
        <el-button size="small" round type="primary">确定提交</el-button>
      </el-button-group>
    </div>
  </eze-drawer>
</template>

<script>
import ezeDrawerMixin from '@@/base/eze-drawer/eze-drawer-mixin'
const templateResourceArr = [
  { code: 'query', menuResourceName: '查询', method: 'GET', path: '/menu' },
  { code: 'find', menuResourceName: '精确查询', method: 'GET', path: '/menu' },
  { code: 'create', menuResourceName: '创建', method: 'POST', path: '/menu' },
  { code: 'update', menuResourceName: '更新', method: 'PUT', path: '/menu' },
  { code: 'delete', menuResourceName: '删除', method: 'DELETE', path: '/menu' },
]
const resourceOne = { code: '', menuResourceName: '', method: '', prop: '' }
export default {
  components: {
    EzeTable: () => import('@@/base/eze-table'),
    EzeDrawer: () => import('@@/base/eze-drawer'),
  },

  mixins: [ezeDrawerMixin],
  data() {
    return {
      resourceData: [],
      columns: [
        {
          label: '序号',
          prop: 'index',
          align: 'center',
        },
        {
          label: '资源编号',
          prop: 'code',
          align: 'center',
          slot: 'code',
        },

        {
          label: '资源名称',
          prop: 'menuResourceName',
          align: 'center',
          slot: 'menuResourceName',
        },
        {
          label: '请求方式',
          prop: 'method',
          align: 'center',
          slot: 'method',
          width: 100,
        },
        {
          label: '请求路径',
          prop: 'path',
          align: 'center',
          slot: 'path',
        },
        {
          label: '操作',
          prop: 'action',
          align: 'center',
          slot: 'action',
          width: 80,
        },
      ],
    }
  },
  methods: {
    handleDeleteResourceOne(row, index) {
      this.resourceData.splice(index, 1)
    },
    handleAddResourceOne() {
      this.resourceData.push(resourceOne)
    },
    handleAddResourceTemplate() {
      for (let i = 0; i < templateResourceArr.length; i++) {
        this.resourceData.push(templateResourceArr[i])
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.resource-wrapper
  padding 20px
  text-align center
  .button-wrapper
    padding 30px 0
</style>
