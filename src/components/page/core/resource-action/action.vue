<template>
  <eze-drawer ref="ezeDrawer" size="26%" title="添加动作">
    <div class="action-wrapper">
      <eze-table :data="actionData" :columns="columns">
        <template #code="{ row, index }">
          <el-input v-model="row.code" size="small" placeholder="请输入动作编号" />
        </template>
        <template #menuActionName="{ row, index }">
          <el-input v-model="row.menuActionName" size="small" placeholder="请输入动作名称" />
        </template>
        <template #action="{ row, index }">
          <el-button
            circle
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="handleDeleteActionOne(row,index)"
          />
        </template>
      </eze-table>

      <el-button-group class="button-wrapper">
        <el-button
          size="small"
          round
          icon="el-icon-plus"
          @click="handleAddActionOne"
        />
        <el-button size="small" type="primary" @click="handleAddActionTemplate">使用模板</el-button>
        <el-button size="small" round type="primary">确定提交</el-button>
      </el-button-group>
    </div>
  </eze-drawer>
</template>

<script>
import ezeDrawerMixin from '@@/base/eze-drawer/eze-drawer-mixin'
const templateActionArr = [
  { code: 'add', menuActionName: '新增' },
  { code: 'edit', menuActionName: '编辑' },
  { code: 'del', menuActionName: '删除' },
  { code: 'query', menuActionName: '查询' },
]
const actionOne = { code: '', menuActionName: '' }
export default {
  components: {
    EzeTable: () => import('@@/base/eze-table'),
    EzeDrawer: () => import('@@/base/eze-drawer'),
  },
  mixins: [ezeDrawerMixin],
  data() {
    return {
      actionData: [],
      columns: [
        {
          label: '序号',
          prop: 'index',
          align: 'center',
        },
        {
          label: '动作编号',
          prop: 'code',
          align: 'center',
          slot: 'code',
        },

        {
          label: '动作名称',
          prop: 'menuActionName',
          align: 'center',
          slot: 'menuActionName',
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
    handleDeleteActionOne(row, index) {
      this.actionData.splice(index, 1)
    },
    handleAddActionOne() {
      this.actionData.push(actionOne)
    },
    handleAddActionTemplate() {
      for (let i = 0; i < templateActionArr.length; i++) {
        this.actionData.push(templateActionArr[i])
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.action-wrapper
  padding 20px
  text-align center
  .button-wrapper
    padding 30px 0
</style>
