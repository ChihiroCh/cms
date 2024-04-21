<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(it, index) in levelList" :key="it.path">
        <span class="no-redirect" v-if="index == levelList.length - 1">{{
          it.meta.title
        }}</span>
        <a v-else @click.prevent="handleTo(it)">{{ it.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (it) => it.meta && it.meta.title
      );

      if (!this.isHome(matched[0])) {
        matched = [{ path: "/home", meta: { title: "首页" } }, ...matched];
      }

      this.levelList = matched;
    },
    // 是否是首页
    isHome(route) {
      let name = route.name;
      if (!name) {
        return false;
      }
      return name.trim() === "首页";
    },
    handleTo(item) {
      // const { redirect, path } = item;
      this.$router.push(item.path);
    },
  },
};
</script>

<style lang="less" scoped>
.app-breadcrumb.sa-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>