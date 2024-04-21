<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 没有子菜单 -->
    <template
      v-if="
        showOneChild(item.children, item) &&
        (!noChildMenu.children || noChildMenu.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link
        v-if="item.redirect != 'noRedirect' && noChildMenu.meta"
        :to="resolvePath(noChildMenu.path)"
      >
        <el-menu-item
          class="submenu-title-noDropdown"
          :index="resolvePath(noChildMenu.path)"
        >
          <i class="el-icon-tickets" />
          {{ noChildMenu.meta.title }}
        </el-menu-item>
      </app-link>
    </template>
    <!-- 有子菜单 -->
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <Item :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <siderbar-item
        v-for="child in item.children"
        :key="child.path"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      ></siderbar-item>
    </el-submenu>
  </div>
</template>

<script>
import AppLink from "./Link.vue";
import Item from "./Item.vue";
import { Validator } from "@bigbighu/cms-utils";
import path from "path";
export default {
  name: "SiderbarItem",
  components: {
    AppLink,
    Item,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    // 记录上一级path，如果当前路由没有设置path，会跳到上一级path
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      noChildMenu: "",
    };
  },
  methods: {
    showOneChild(children = [], item) {
      // 过滤不显示的菜单
      const showChildren = children.filter((it) => {
        if (it.hidden) {
          return false;
        } else {
          return true;
        }
      });
      // 没有子菜单
      if (showChildren.length === 0) {
        this.noChildMenu = { ...item, path: "", noShowingChildren: true };
        return true;
      }
      return false;
    },
    resolvePath(routerPath) {
      if (Validator.isExternal(routerPath)) {
        return routerPath;
      }
      if (Validator.isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routerPath);
    },
  },
};
</script>

<style lang="less" scope>
#app .hideSidebar .el-submenu > .el-submenu__title .iconfont {
  margin-left: 18px;
}
#app .el-menu-item {
  display: flex;
  align-items: center;
}
#app .el-menu-item [class^="el-icon-"] {
  font-size: 20px;
}
</style>