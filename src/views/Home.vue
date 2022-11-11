<template>
  <div class="home">
    <div class="change">
      <div id="btn1" class="route-btn" @click="routeTo('label')">数 据</div>
      <div id="btn2" class="route-btn" @click="routeTo('review')">回 查</div>
    </div>
  </div>
</template>
<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter()
const routeTo = (name:string) => {
  router.push({
    name
  })
}
</script>
<style scoped>
.home{
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background: url("@/assets/bg.jpeg") no-repeat;
  background-size: 100% 100%;
}
.change{
  display: flex;
  justify-content: center;
  position: fixed;
  top: 50px;
}
#btn1{
  translate: -50%;
}
#btn2{
  translate: 50%;
}
.route-btn{
  height: 30px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border:1px solid #ddd;
  border-radius: 8px;
  color: #ddd;
  background-color: rgba(0,0,0,0.3);
  cursor: pointer;
  user-select: none;
}
.route-btn:hover{
  background-color: rgba(0,0,0,0.5);
  border-color: lightskyblue;
}
.route-btn:active{
  background-color: rgba(0,0,0,0.7);
  border-color: deepskyblue;
  scale: 0.9;
}
</style>
