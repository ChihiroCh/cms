<template>
  <div class="page-right">
    <change-settype v-model="setType" />
    <!-- 页面设置 -->
    <div v-show="setType === 1">
      <set-page-info />
    </div>
    <!-- 组件设置 -->
    <div v-show="setType === 2">
      <com-title
        :title="(currentComponent && currentComponent.name) || '组件管理'"
      />
      <!-- 生效时间 -->
      <com-valid-time
        v-if="currentComponent"
        v-model="currentComponent.data.validTime"
      />
      <component
        :is="currentComponent.data.component"
        v-if="currentComponent"
        @edmitComponent="edmitComponent"
      />
    </div>
  </div>
</template>

<script>
import ChangeSettype from "./components/ChangeSettype.vue";
import ComTitle from "@/components/BasicUi/ComTitle";
import SetPageInfo from "./components/SetPageInfo.vue";
import { dynamicComponents } from "../../../utils";
import ComValidTime from "@/components/BasicUi/ComValidTime";
import { mapState } from "vuex";
export default {
  name: "PageRight",
  data() {
    return {};
  },
  components: {
    ChangeSettype,
    SetPageInfo,
    ComValidTime,
    ComTitle,
    ...dynamicComponents,
  },
  computed: {
    ...mapState(["pageData", "activeComponentId"]),
    setType: {
      get() {
        return this.$store.state.setType;
      },
      set(val) {
        this.$store.commit("updateType", val);
      },
    },
    currentComponent() {
      const pageList = this.pageData.componentList;
      return pageList && pageList.length > 0
        ? pageList.find((it) => it.id === this.activeComponentId)
        : null;
    },
  },
  methods: {
    edmitComponent() {},
  },
};
</script>

<style lang="less">
@import url("~@/styles/icon.less");

.page-right {
  position: absolute;
  top: 56px;
  right: 0;
  bottom: 0;
  width: 376px;
  padding-bottom: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
}

// 组件配置模块
.com-group {
  // slide 滑块
  .el-slider {
    width: 95%;
    .el-slider__input {
      width: 60px;
    }
    .el-slider__runway {
      margin-right: 80px;
    }
  }
  // 单选框
  .el-radio {
    line-height: 30px;
    color: #323233;
  }
}

// 右上角删除样式
.up-pic-item-delete {
  position: absolute;
  cursor: pointer;
  font-size: 20px;
  right: -10px;
  top: -10px;
  color: #bbb;
  background: #fff;
  border-radius: 50%;
  visibility: hidden;
  z-index: 2;
  &:hover {
    color: #aaa;
  }
}
</style>
