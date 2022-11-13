<template>
  <transition name=".el-fade-in-linear">
    <div class="skip" v-show="isShow">
      <el-divider>暂跳</el-divider>
      <el-table border size="small" :data="props.skipList">
        <el-table-column
          prop="userName"
          label="姓名"
          align="center"
          :filters="filters"
          :filter-method="filterHandler"
        ></el-table-column>
        <el-table-column label="数量" align="center">
          <template #default="scope">
            <span :style="{color:scope.row.count >= skipNum ? 'red':'green'}">{{ scope.row.count }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-divider>{{ props.skipList.length }}</el-divider>
    </div>
  </transition>
</template>
<script setup lang="ts">


import type {PropType} from "vue";
import type {Skip} from "@/types";
import {computed} from "vue";
import type {TableColumnCtx} from "element-plus/es/components/table/src/table-column/defaults";

const props = defineProps({
  skipList: {
    type: Array as PropType<Array<Skip>>,
    default: () => {
      return []
    }
  },
  skipNum: {
    type: Number,
    default: 100
  },
})


const isShow = computed(() => {
  return props.skipList.length > 0
})

const filters = computed(() => {
  let list = []
  for (let i = 0; i < props.skipList.length; i++) {
    let item = {text: props.skipList[i].userName, value: props.skipList[i].userName}
    list.push(item)
  }
  return list
})

const filterHandler = (value: string,
                       row: Skip,
                       column: TableColumnCtx<Skip>) => {
  return row.userName === value
}
</script>
<style scoped>
.skip{
  border: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-light);
  border-radius: 3px;
}
</style>
