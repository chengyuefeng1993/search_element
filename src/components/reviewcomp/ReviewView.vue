<template>
  <div class="review">
    <div class="review-bar">
      <el-space wrap>
        <el-date-picker
          type="datetimerange"
          style="width: 350px;"
          v-model="data.time"
        />
        <el-select v-model="data.stageName" style="width: 75px">
          <el-option label="标注" value="label"/>
          <el-option label="一审" value="review"/>
          <el-option label="全部" value="allReview"/>
        </el-select>
        <el-input placeholder="用户名" v-model="data.userName" style="width: 160px;" clearable/>
        <el-input placeholder="dataId" v-model="data.dataId" style="width: 90px" clearable/>
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
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import dayjs from "dayjs";
import {ElMessage} from "element-plus";
import 'element-plus/es/components/message/style/css'
import axios from "axios";
import type {Review} from "@/types";


const reviewGet = axios.create({
  timeout:100000,
  baseURL:'http://114.116.41.110:4002'
})

reviewGet.interceptors.response.use(resp=>{
  return resp
},error => {
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

const data = ref({
  id:'' as string,
  time:[
    dayjs().startOf('day').toDate(),
    dayjs().endOf('day').toDate(),
  ] as [Date,Date],
  stageName:'allReview' as string,
  userName:'' as string,
  dataId:'' as string,
  pageNum:1 as number,
  pageSize:10 as number,
  reviewList:{} as Review,
})

const onSearch = () => {
  if (data.value.id !== ''){

  }else {
    ElMessage({
      message:'ID为空！',
      duration:1500,
      type:'error'
    })
  }
}

const getReviewData = async () => {
  await reviewGet.get('/review',{
    params:{
      sourceid:data.value.id,
      tmstart:dayjs(data.value.time[0]).valueOf(),
      tmstop:dayjs(data.value.time[1]).valueOf(),
      stagename:data.value.stageName,
      username:data.value.userName,
      dataid:data.value.dataId,
      pagenum:data.value.pageNum,
      pagesize:data.value.pageSize,
    }
  }).then(res=>{
    if (res.data.code == 200){
      data.value.reviewList = res.data.result
    }
  })
}
</script>
<style scoped>

.review-bar{
  padding: 10px;
}
</style>
