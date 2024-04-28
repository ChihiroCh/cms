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
import { saveCmsPage } from "@/api/activity";
export default {
  name: "PageHeader",
  data() {
    return {
      saveLoading: false,
      previewLoading: false,
    };
  },
  computed: {
    pageData() {
      return this.$store.state.pageData;
    },
  },
  methods: {
    backToList() {
      try {
        if (window.opener && window.opener.location.hash === "#/activity") {
          window.opener.close();
        }
        this.$router.push("/activity");
      } catch (error) {
        this.$router.push("/activity");
      }
    },
    handleSave() {
      this.saveLoading = true;
      this.savePage()
        .then(() => {
          this.$message.success("保存成功");
        })
        .catch((err) => {
          this.$message.warning("保存失败" + err.$message);
        })
        .finally(() => {
          this.saveLoading = false;
        });
    },
    handleView() {
      this.previewLoading = true;
      this.savePage({ online: 1 }).then((res) => {
        this.$message.success("保存成功");
        let id = res && res.data ? res.data.id : "";
        this.toPrew(id ? id : this.$route.query.id);
      });
    },
    savePage(params) {
      return saveCmsPage({ ...this.pageData, params }).then((res) => {
        if (res && res.data && res.data.id) {
          const cloneData = JSON.parse(JSON.stringify(this.pageData));
          cloneData.id = res.data.id;
          this.$store.commit("setPageData", { data: cloneData });
          this.$router.push(`/decorate?id=${res.data.id}`);
        }
      });
    },
    toPrew(id) {
      const url = this.$router.resolve({
        path: "preview",
        query: { id },
      });
      window.open(url.href, "_blank");
    },
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
