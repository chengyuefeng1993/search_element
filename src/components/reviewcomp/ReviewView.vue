<template>
  <div class="review">
    <div class="review-bar">
      <el-space wrap>
        <el-date-picker type="datetimerange" style="width: 350px;" v-model="data.time" />
        <el-select v-model="data.stageName" style="width: 75px">
          <el-option label="标注" value="label" />
          <el-option label="一审" value="review" />
          <el-option label="全部" value="allReview" />
        </el-select>
        <el-input placeholder="用户名" v-model="data.userName" style="width: 160px;" clearable />
        <el-input placeholder="dataId" v-model="data.dataId" style="width: 90px" clearable />
        <el-input v-model="data.id" style="width: 150px" :maxlength="5" clearable placeholder="包ID"
          @keyup.enter="onSearch">
          <template #append>
            <el-button @click="onSearch">查询</el-button>
          </template>
        </el-input>
        <el-switch v-model="data.isFilter" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-text="开启过滤" inactive-text="关闭过滤" v-show="data.reviewList.totalSize > 0" />
        <el-switch v-model="data.imgIsShow" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-text="显示图片" inactive-text="隐藏图片" v-show="data.reviewList.dataType === 'video'" />
      </el-space>
    </div>
    <el-divider style="margin: 0;padding: 0" />
    <div class="review-main" v-loading="data.isLoading">
      <div v-show="changeView != null">
        <el-space wrap :size="10" alignment="start">
          <component :is="changeView" v-for="item in reviewData" :item="item" :historyList="item.answers[0].historyList"
            :key="item.dataId" :imgIsShow="data.imgIsShow" />
        </el-space>
        <div class="pager">
          <el-pagination :total="total" layout="total,prev,pager,next,jumper,sizes" v-model:current-page="data.pageNum"
            v-model:page-size="data.pageSize" :page-sizes="pageSizes" background v-show="total !== 0"
            @current-change="pageNumChange" @size-change="pageSizeChange" :hide-on-single-page="true" />
        </div>
      </div>
      <el-empty :image-size="200" v-show="isEmpty" description="无数据" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import type { Component } from 'vue'
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
import 'element-plus/es/components/message/style/css'
import axios from "axios";
import { key, type Review } from "@/types";
import TextView from './TextView.vue'
import VideoView from './VideoView.vue'
import { useMainStore } from "@/stores";


const reviewGet = axios.create({
  timeout: 100000,
  baseURL: 'http://114.116.41.110:4002'
})

reviewGet.interceptors.response.use(resp => {
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
  return Promise.reject(error)
})

const mainStore = useMainStore()
const data = ref({
  id: '' as string,
  time: [
    dayjs().startOf('day').toDate(),
    dayjs().endOf('day').toDate(),
  ] as [Date, Date],
  stageName: 'allReview' as string,
  userName: '' as string,
  dataId: '' as string,
  pageNum: 1 as number,
  pageSize: 10 as number,
  reviewList: {} as Review,
  isLoading: false as boolean,
  isFilter: false as boolean,
  imgIsShow: false as boolean,
})

const reviewData = computed(() => {
  if (data.value.isFilter) {
    return data.value.reviewList.data.filter((a) => a?.reviewUser == null)
  } else {
    return data.value.reviewList.data
  }
})

const onSearch = () => {
  if (data.value.id !== '') {
    data.value.isLoading = true
    getReviewData()
  } else {
    ElMessage({
      message: 'ID为空！',
      duration: 1500,
      type: 'error'
    })
  }
}

const getReviewData = async () => {
  await reviewGet.get('/review', {
    params: {
      sourceid: data.value.id,
      tmstart: dayjs(data.value.time[0]).valueOf(),
      tmstop: dayjs(data.value.time[1]).valueOf(),
      stagename: data.value.stageName,
      username: data.value.userName,
      dataid: data.value.dataId,
      pagenum: data.value.pageNum,
      pagesize: data.value.pageSize,
    }
  }).then(res => {
    if (res.data.code == 200) {
      data.value.reviewList = res.data.result
    } else {
      data.value.reviewList = {} as Review
    }
    data.value.isLoading = false
  })
}

const changeView = computed(() => {
  if (data.value.reviewList.dataType == 'text') {
    return TextView
  } else if (data.value.reviewList.dataType == 'video') {
    return VideoView
  }
})

const isEmpty = computed(() => {
  return !(Object.getOwnPropertyNames(data.value.reviewList).length > 0)
})

const pageSizes = [10, 30, 50, 100, 200, 500, 1000]
const total = computed(() => {
  if (Object.getOwnPropertyNames(data.value.reviewList).length > 0) {
    return data.value.reviewList.totalSize
  } else {
    return 0
  }
})

const scrollMove = inject(key) as Function
const pageNumChange = (num: number) => {
  data.value.pageNum = num
  onSearch()
  scrollMove()
}

const pageSizeChange = () => {
  data.value.pageNum = 1
  window.localStorage.setItem('pageSize', data.value.pageSize.toString())
  onSearch()
  scrollMove()
}

onMounted(() => {
  let pageSize = window.localStorage.getItem('pageSize')
  if (pageSize != null) {
    data.value.pageSize = Number(pageSize)
  }
})
</script>
<style scoped>
.review-bar {
  padding: 10px;
}

.review-main {
  padding: 10px;
}

.pager {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0;
}
</style>
