<template>
  <div class="label-view">
    <div class="label-bar">
      <el-space>
        <el-date-picker type="datetimerange" v-model="data.time"/>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type {Stage} from '@/types'
import dayjs from 'dayjs'

const data = ref({
  id:'' as string,
  time:[
    dayjs().startOf('day').toDate(),
    dayjs().endOf('day').toDate()
  ] as [Date,Date],
  stageName:'label' as string,
  skipNum:100 as number,
  stageList:{} as Stage,
})
</script>

<style scoped>

</style>