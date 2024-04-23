<template>
  <div>activity</div>
</template>

<script>
import { getCmsPageList } from "@/api/activity";
export default {
  name: "Activity",
  methods: {
    async getList() {
      const data = await getCmsPageList({ pageSize: 10, pageNum: 1 });
      console.log(data);
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style>
</style>