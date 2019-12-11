<template>
  <div class="department-wrapper">
    <h3>角色管理</h3>
    <eze-table border :columns="columns" :data="data">
      <template #name="name">
        <span>5555 {{ name }}</span>
      </template>
      <template #address="address">
        <span>5555 {{ address }}</span>
      </template>
    </eze-table>
  </div>
</template>

<script>
import EzeTable from '@@/base/eze-table'
export default {
  components: {
    EzeTable,
  },
  data() {
    return {
      columns: [
        {
          label: '日期',
          prop: 'date',
          align: 'center',
        },
        {
          label: '姓名',
          prop: 'name',
          slot: 'name',
        },
        {
          label: '地址',
          prop: 'province',
        },
        {
          label: '区域',
          prop: 'address',
          slot: 'address',
        },
        {
          label: '操作',
          prop: 'action',
          render: (h, params) => {
            return h('el-button', {
              props: {
                type: 'primary',
                size: 'mini',
              },
              on: {
                click: () => {
                  this.show(params.index)
                },
              },
            }, '删除')
          },
        },
      ],
      data: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        address: '上海市普陀区金沙江路 1517 弄',

      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        address: '上海市普陀区金沙江路 1519 弄',

      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        address: '上海市普陀区金沙江路 1516 弄',
      }],
    }
  },
  created() {

  },
  methods: {
    show(index) {
      console.log(index)
    },
  },
}
</script>

<style lang="stylus" scoped>
.department-wrapper
  padding 30px
</style>
