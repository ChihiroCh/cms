<template>
  <div class="home">
    <!-- header -->
    <page-header />
    <!-- 左侧siderbar -->
    <page-left />
    <!-- 中间内容区 -->
    <PageView />
    <!-- 右侧修改区 -->
    <page-right />
    <UpLoadImg
      :dialog-image-visible.sync="dialogImageVisible"
      @upLoadImgSuccess="upLoadImgSuccess"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import PageLeft from "./components/PageLeft.vue";
import PageView from "./components/PageView.vue";
import PageRight from "./components/PageRight.vue";
import PageHeader from "./components/PageHeader.vue";
import { getCmsPageById } from "@/api/activity";
import { createRandomId } from "@/utils";
// 公共配置组件
import UpLoadImg from "@/components/BasicConfig/UpLoadImg";
export default {
  name: "decorate",
  components: {
    PageHeader,
    PageLeft,
    PageView,
    PageRight,
    UpLoadImg,
  },
  created() {
    this.getCmsPage();
  },
  methods: {
    ...mapMutations(["setPageData"]),
    async getCmsPage() {
      // id目前先写死，从当前路由中获取
      const { id } = this.$route.query;
      if (id) {
        let { data } = await getCmsPageById(id);
        this.getCmsPageData(data);
        console.log("data", data);
      }
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
    upLoadImgSuccess(imgUrl) {
      this.$store.state.upLoadImgSuccess &&
        this.$store.state.upLoadImgSuccess(imgUrl);
    },
  },
  computed: {
    dialogImageVisible: {
      get() {
        return this.$store.state.dialogImageVisible;
      },
      set(val) {
        this.$store.commit("setDialogImageVisible", val);
      },
    },
  },
};
</script>

<style>
</style>