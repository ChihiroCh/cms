<template>
  <div class="page-head">
    <a class="go-back" @click="backToList">
      <img class="logo" src="~@/assets/img/layout/logo.png" />
      返回频道列表页面
    </a>
    <div class="page-operate">
      <el-button
        type="primary"
        size="medium"
        :loading="saveLoading"
        @click="handleSave"
      >
        保存
      </el-button>
      <el-button size="medium" :loading="previewLoading" @click="handleView">
        预览
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  data() {
    return {
      saveLoading: false,
      previewLoading: false,
    };
  },
  methods: {
    backToList() {},
    handleSave() {},
    handleView() {},
  },
};
</script>

<style lang="less" scoped>
.page-head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: @page-header-height;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .go-back {
    float: left;
    line-height: 55px;
    font-size: 14px;
    color: #4f4f4f;
    cursor: pointer;
    .logo {
      display: inline-block;
      vertical-align: middle;
      margin: -2px 4px 0 0;
      max-width: 30px;
      max-height: 30px;
    }
  }
}
</style>
