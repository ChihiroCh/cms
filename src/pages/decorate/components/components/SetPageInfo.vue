<template>
  <div>
    <com-title title="页面设置" />
    <!-- 页面名称 -->
    <ComGroup title="页面名称" name-black content-block>
      <el-input
        v-model.lazy="name"
        class="input-name"
        placeholder="请输入页面名称"
      />
    </ComGroup>
    <!-- 页面描述 -->
    <ComGroup title="微信分享文案" name-black content-block>
      <el-input
        v-model.lazy="shareDesc"
        class="input-name"
        maxlength="28"
        placeholder="用户通过微信分享给朋友时显示，最多28个汉字"
      />
    </ComGroup>
    <!-- 微信分享卡片 -->
    <ComGroup
      title="微信分享卡片"
      tips="图片建议长宽比为5:4"
      name-black
      content-block
    >
      <el-button type="text" class="mr-15" @click="shareImage = ''">
        重置
      </el-button>
      <UpLoadBox :img-url.sync="shareImage" />
    </ComGroup>

    <!-- 分割线 -->
    <ComDivider />

    <!-- 颜色配置 -->
    <ComGroup title="背景颜色">
      <el-button
        type="text"
        class="mr-15"
        @click="backgroundColor = initBgColor"
      >
        重置
      </el-button>
      <el-color-picker v-model="backgroundColor" size="small" />
    </ComGroup>
    <!-- 背景图片 -->
    <ComGroup title="背景图片">
      <el-button type="text" class="mr-15" @click="backgroundImage = ''">
        重置
      </el-button>
      <UpLoadBox :img-url.sync="backgroundImage" />
    </ComGroup>
    <!-- 背景图片位置 -->
    <ComGroup v-if="backgroundImage" title="背景图片位置">
      <el-radio v-model="backgroundPosition" label="top"> 居上 </el-radio>
      <el-radio v-model="backgroundPosition" label="bottom"> 居底 </el-radio>
    </ComGroup>
  </div>
</template>

<script>
import ComTitle from "@/components/BasicUi/ComTitle";
import ComGroup from "@/components/BasicUi/ComGroup";
import UpLoadBox from "@/components/BasicUi/UpLoadBox";
import ComDivider from "@/components/BasicUi/ComDivider";
export default {
  name: "SetPageInfo",
  data() {
    return {
      initBgColor: "#fff",
    };
  },
  components: {
    ComTitle,
    ComGroup,
    UpLoadBox,
    ComDivider,
  },
  computed: {
    name: {
      get() {
        return this.$store.state.pageData.name;
      },
      set(val) {
        this.changeData({ name: val });
      },
    },
    shareDesc: {
      get() {
        return this.$store.state.pageData.shareDesc;
      },
      set(val) {
        this.changeData({ shareDesc: val });
      },
    },
    shareImage: {
      get() {
        return this.$store.state.pageData.shareImage;
      },
      set(val) {
        this.changeData({ shareImage: val });
      },
    },
    backgroundColor: {
      get() {
        return this.$store.state.pageData.backgroundColor;
      },
      set(val) {
        this.changeData({ backgroundColor: val });
      },
    },
    backgroundImage: {
      get() {
        return this.$store.state.pageData.backgroundImage;
      },
      set(val) {
        this.changeData({ backgroundImage: val });
      },
    },
    backgroundPosition: {
      get() {
        return this.$store.state.pageData.backgroundPosition;
      },
      set(val) {
        this.changeData({ backgroundPosition: val });
      },
    },
  },
  methods: {
    changeData(params) {
      this.$store.commit("changePageData", { ...params });
    },
    // showDialogImage() {},
  },
};
</script>

<style>
</style>