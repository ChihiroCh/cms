<template>
  <div ref="pageView" class="page-view">
    <!-- 手机预览模块 -->
    <div class="preview">
      <div class="preview-head">
        <div class="preview-head-title">
          {{ pageData.name || "微页面标题" }}
        </div>
      </div>
      <div class="preview-wrap">
        <iframe
          id="previewIframe"
          class="preview-iframe"
          width="100%"
          :src="targetSrc"
          title="频道名称"
          @load="handleLoad"
        />
      </div>
      <div @dragover="handleOver"></div>
      <div @dragover="handleOut"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { decorateOrigin } from "@/config";
export default {
  name: "PageView",
  computed: {
    ...mapState(["pageData"]),
    targetSrc() {
      return decorateOrigin + "?pageId=237&noLogin=true";
    },
  },
  methods: {
    handleOver() {
      console.log("object over");
    },
    handleOut() {
      console.log("object end");
    },
    handleLoad() {
      this.$store.commit("sendH5Data");
    },
  },
};
</script>

<style lang="less" scoped>
.page-view {
  position: absolute;
  top: 56px;
  left: 186px;
  right: 376px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f7f8fa;
  display: flex;
  justify-content: center;
  user-select: none;
}
.cache-box {
  position: absolute;
  left: 20px;
  right: 20px;
  top: 20px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  background: @color-1-bg;
  border: 1px solid @color-1;
  padding: 0 10px;
  z-index: 2;
  .color-1 {
    cursor: pointer;
  }
  .cache-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    color: #aaa;
  }
}
.preview {
  position: absolute;
  width: 100%;
  .preview-head {
    height: @content-header-height;
    width: 375px;
    margin: 72px auto 0;
    background: url("~@/assets/img/layout/header_bg.png") left top no-repeat;
    background-size: cover;
    position: relative;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
    .preview-head-title {
      width: 180px;
      margin: 0 auto;
      height: 64px;
      font-size: 14px;
      text-align: center;
      padding-top: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .preview-iframe {
    min-height: 600px;
  }
  .preview-drag-mask {
    position: absolute;
    left: 50%;
    top: 60px;
    bottom: 20px;
    width: 520px;
    margin-left: -260px;
    z-index: 10;
  }
  .preview-drag-out {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
  }
}
</style>