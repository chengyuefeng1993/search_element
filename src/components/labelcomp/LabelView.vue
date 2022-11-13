<template>
  <div class="label-view">
    <div class="label-bar">
      <el-space wrap>
        <el-date-picker
          type="datetimerange"
          v-model="data.time"
          style="width: 350px"
        />
        <el-button-group>
          <el-button @click="changeTime('back')">
            <el-icon>
              <ArrowLeftBold/>
            </el-icon>
          </el-button>
          <el-button @click="changeTime('today')">
            <el-icon>
              <Aim/>
            </el-icon>
          </el-button>
          <el-button @click="changeTime('foward')">
            <el-icon>
              <ArrowRightBold/>
            </el-icon>
          </el-button>
        </el-button-group>
        <el-select v-model="data.stageName" style="width: 75px">
          <el-option label="标注" value="label"/>
          <el-option label="一审" value="review"/>
        </el-select>
        <el-input v-model="data.skipNum" style="width: 150px" :maxlength="4">
          <template #prefix>
            <span>暂跳额度：</span>
          </template>
        </el-input>
        <el-input
          v-model="data.id"
          style="width: 150px"
          :maxlength="5" clearable
          placeholder="包ID"
          @keyup.enter="onSearch"
        >
          <template #append>
            <el-button @click="onSearch">查询</el-button>
          </template>
        </el-input>
      </el-space>
    </div>
    <el-divider style="margin: 0;padding: 0"/>
    <div class="label-main" v-show="isShow" v-loading="isLoading">
      <StageData :stageList="data.stageList"/>
      <el-row :gutter="10" justify="space-between" style="margin-top: 10px">
        <el-col :xs="24" :sm="16">
          <TagData
            :tagList="data.tagList"
            :id="data.id"
            :tmstart="dayjs(data.time[0]).valueOf()"
            :tmstop="dayjs(data.time[1]).valueOf()"/>
        </el-col>
        <el-col :xs="24" :sm="8">
          <SkipData :skipList="data.skipList" :skipNum="data.skipNum"/>
        </el-col>
      </el-row>
    </div>
    <el-empty
      :image-size="200"
      v-show="isEmpty"
      description="无数据"
    />
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import type {Skip, Stage, Tag} from '@/types'
import dayjs from 'dayjs'
import {ArrowLeftBold, ArrowRightBold, Aim} from '@element-plus/icons-vue'
import axios from "axios";
import {ElMessage, ElNotification} from "element-plus";
import 'element-plus/es/components/message/style/css'
import StageData from "@/components/labelcomp/StageData.vue";
import TagData from "@/components/labelcomp/TagData.vue";
import SkipData from "@/components/labelcomp/SkipData.vue";

const labelGet = axios.create({
  timeout: 15000,
  baseURL: 'http://114.116.41.110:4002'
})

labelGet.interceptors.response.use(resp => {
  return resp
}, error => {
  if (
    error.code === "ECONNABORTED" ||
    error.message === "Network Error" ||
    error.message.includes("timeout")
  ) {
    error.message = 'timeOutError'
    console.log('请求超时！' + new Date())
    return Promise.reject(error)
  }
  console.log(error)
  data.value.isLoadingNum = 0
  return Promise.reject(error)
})

const data = ref({
  id: '' as string,
  time: [
    dayjs().startOf('day').toDate(),
    dayjs().endOf('day').toDate()
  ] as [Date, Date],
  stageName: 'label' as string,
  skipNum: 100 as number,
  stageList: {} as Stage,
  tagList: [] as Tag[],
  skipList: [] as Skip[],
  isLoadingNum: 0 as number,
})

const isLoading = computed(() => {
  if (data.value.isLoadingNum === 0) {
    return false
  } else if (data.value.isLoadingNum === 1) {
    return true
  } else if (data.value.isLoadingNum === 2) {
    return true
  } else if (data.value.isLoadingNum === 3) {
    return true
  } else if (data.value.isLoadingNum === 4) {
    return false
  }
})

const onSearch = () => {
  if (data.value.id !== '') {
    data.value.isLoadingNum = 1
    getStageData()
    getTagData()
    getSkipData()
  } else {
    ElMessage({
      type: 'error',
      message: 'ID为空！',
      duration: 1500
    })
  }
}

const getStageData = async () => {
  await labelGet.get('/stagedata', {
    params: {
      sourceid: data.value.id
    }
  }).then(res => {
    if (res.data.code == 200) {
      data.value.stageList = res.data.result
    } else {
      console.log(res)
    }
    data.value.isLoadingNum += 1
  }).catch(err => {
    if (err.message == 'timeOutError') {
      ElNotification({
        title: '请求超时！',
        message: 'stage请求超时，请重试！',
        duration: 0,
        type: 'error'
      })
    }
  })
}

const getTagData = async () => {
  await labelGet.get('/tagdata', {
    params: {
      sourceid: data.value.id,
      tmstart: dayjs(data.value.time[0]).valueOf(),
      tmstop: dayjs(data.value.time[1]).valueOf(),
      stagename: data.value.stageName,
    }
  }).then(res => {
    if (res.data.code == 200) {
      let list = res.data.result
      data.value.tagList = list.splice(0, list.length - 2)
    } else {
      console.log(res)
    }
    data.value.isLoadingNum += 1
  }).catch(err => {
    if (err.message == 'timeOutError') {
      ElNotification({
        title: '请求超时！',
        message: 'tag请求超时，请重试！',
        duration: 0,
        type: 'error'
      })
    }
  })
}

const getSkipData = async () => {
  await labelGet.get('/skipdata', {
    params: {
      sourceid: data.value.id,
      stagename: data.value.stageName
    }
  }).then(res => {
    if (res.data.code == 200) {
      data.value.skipList = res.data.result
    } else {
      console.log(res)
    }
    data.value.isLoadingNum += 1
  }).catch(err => {
    if (err.message == 'timeOutError') {
      ElNotification({
        title: '请求超时！',
        message: 'skip请求超时，请重试！',
        duration: 0,
        type: 'error'
      })
    }
  })
}

const changeTime = (name: string) => {
  if (name === 'foward') {
    data.value.time = [
      dayjs(data.value.time[0]).add(1, 'day').startOf('day').toDate(),
      dayjs(data.value.time[1]).add(1, 'day').endOf('day').toDate(),
    ]
  } else if (name === 'today') {
    data.value.time = [
      dayjs().startOf('day').toDate(),
      dayjs().endOf('day').toDate()
    ]
  } else if (name === 'back') {
    data.value.time = [
      dayjs(data.value.time[0]).subtract(1, 'day').startOf('day').toDate(),
      dayjs(data.value.time[1]).subtract(1, 'day').endOf('day').toDate()
    ]
  }
}

const isShow = computed(() => {
  return Object.getOwnPropertyNames(data.value.stageList).length > 0 || data.value.tagList.length > 0 || data.value.skipList.length > 0;
})
const isEmpty = computed(() => {
  return !(Object.getOwnPropertyNames(data.value.stageList).length > 0 || data.value.tagList.length > 0 || data.value.skipList.length > 0)
})
</script>

<style scoped>
.label-view {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.label-bar {
  padding: 10px;
}

.label-main {
  flex: 1;
  padding: 10px;
}
</style>
