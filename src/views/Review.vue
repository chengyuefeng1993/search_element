<template>
  <div class="review">
    <el-tabs
      v-model="editableTabsValue"
      type="border-card" editable
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      ><ReviewView/></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">

import ReviewView from "@/components/reviewcomp/ReviewView.vue";
import {ref} from "vue";

let tabIndex = 1;
const editableTabsValue = ref("1");

const editableTabs = ref([
  {
    title: "回查",
    name: "1",
  },
]);

const handleTabsEdit = (targetName: string, action: "remove" | "add") => {
  if (action === "add") {
    const newTabName = `${++tabIndex}`;
    editableTabs.value.push({
      title: "回查",
      name: newTabName,
    });
    editableTabsValue.value = newTabName;
  } else if (action === "remove") {
    const tabs = editableTabs.value;
    let activeName = editableTabsValue.value;
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
    }

    editableTabsValue.value = activeName;
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
  }
};
</script>
<style scoped>
</style>
