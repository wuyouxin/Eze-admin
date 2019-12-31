<template>
  <div class="eze-table-wrapper">
    <el-table
      row-key="id"
      :border="border"
      :data="data"
      :size="size"
    >
      <template v-for="(column, index) of columns">
        <el-table-column
          v-if="column.prop === 'index'"
          :key="`column_${index}`"
          type="index"
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :width="column.width"
          :min-width="column.minWidth	"
        />
        <el-table-column
          v-else
          :key="`column_${index}`"
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :width="column.width"
          :min-width="column.minWidth	"
        >
          <template v-slot="scope">
            <table-render
              v-if="column.render"
              :row="scope.row"
              :column="column"
              :index="scope.$index"
              :render="column.render"
            />
            <table-slot
              v-else-if="column.slot"
              :row="scope.row"
              :column="column"
              :index="scope.$index"
            />
            <span v-else>{{ scope.row[column.prop] || '' }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <slot name="pagination" />
  </div>
</template>

<script>
import TableRender from './render'
import TableSlot from './slot'
export default {
  components: { TableRender, TableSlot },
  provide() {
    return {
      tableRoot: this,
    }
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: 'small',
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus" scoped>
// .eze-table-wrapper
</style>
