<template>
  <div class="app-wrapper openSidebar">
    <!-- menu菜单 -->
    <sider-bar class="sidebar-container" />
    <div class="main-container">
      <div>
        <!-- navbar区域 -->
        <nav-bar />
      </div>
      <main-content />
    </div>
  </div>
</template>

<script>
import { SiderBar, NavBar, MainContent } from "@/components";
export default {
  name: "Layout",
  components: {
    SiderBar,
    NavBar,
    MainContent,
  },
};
</script>

<style lang="less" scoped>
.app-wrapper {
  &:after {
    content: "";
    display: table;
    clear: both;
  }

  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .sidebar-container {
    transition: width 0.28s;
    width: 210px !important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: 210px;
    position: relative;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 220px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
#app .hideTree {
  margin-left: 0 !important;
}
</style>