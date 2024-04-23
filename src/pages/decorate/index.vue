<template>
  <div class="home">
    <!-- header -->
    <!-- 左侧siderbar -->
    <page-left />
    <!-- 中间内容区 -->
    <PageView />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import PageLeft from "./components/PageLeft.vue";
import PageView from "./components/PageView.vue";
import { getCmsPageById } from "@/api/activity";
import { createRandomId } from "@/utils";
export default {
  name: "decorate",
  components: {
    PageLeft,
    PageView,
  },
  created() {
    this.getCmsPage();
  },
  methods: {
    ...mapMutations(["setPageData"]),
    async getCmsPage() {
      // id目前先写死，从当前路由中获取
      // const { id } = this.$route.query;
      // if (id) {
      let { data } = await getCmsPageById(237);
      this.getCmsPageData(data);
      console.log("data", data);
      // }
    },
    getCmsPageData(data) {
      if (data && data.componentList) {
        data.componentList.forEach((item) => {
          if (item.data.validTime && typeof item.data.validTime === "string") {
            item.data.validTime = JSON.parse(item.data.validTime);
          }
          if (!item.id) {
            item.id = item.data.component + "-" + createRandomId();
          }
        });
        this.setPageData({ data });
      }
    },
  },
};
</script>

<style>
</style>