<template>
  <div class="page-left">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        :title="list.title"
        v-for="(list, index) in ComponentList"
        :key="index"
        :name="index + 1"
        class="component-item"
      >
        <ul class="component-list">
          <li
            :draggable="draggableEnbaled(card)"
            v-for="(card, idx) in list.components"
            :key="idx"
            :class="draggableEnbaled(card) ? 'drag-enabled' : 'drag-disabled'"
            @dragstart="handleDragStart(card)"
            @dragend="handleDragEnd"
          >
            <i :class="card.iconClass" style="font-size: 28px" />
            <p class="name">
              {{ card.name }}
            </p>
            <p class="num">
              {{
                `${PageComponentTotal[card.data.component] || 0}/${
                  card.maxNumForAdd
                }`
              }}
            </p>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import ComponentList from "@/config/component-list";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "PageLeft",
  data() {
    return {
      ComponentList,
      activeNames: [1, 2],
    };
  },
  computed: {
    ...mapState(["dragActive"]),
    ...mapGetters(["PageComponentTotal"]),
  },
  methods: {
    ...mapMutations(["setDragActive", "setCurDragComponent"]),
    draggableEnbaled(card) {
      // console.log("object card", card);
      let curnum = this.PageComponentTotal[card.data.component] || 0;
      return curnum < card.maxNumForAdd;
    },
    handleDragEnd(e) {
      console.log("object grag", e);
    },
    handleDragStart(component) {
      this.setDragActive(true);
      this.setCurDragComponent(JSON.parse(JSON.stringify(component)));
      // console.log("object", component);
    },
  },
};
</script>

<style lang="less" scoped>
.page-left {
  position: absolute;
  top: 56px;
  left: 0;
  width: 186px;
  overflow-x: hidden;
  overflow-y: auto;
  bottom: 0;
  background: #fff;
  user-select: none;
}

.component-item {
  padding: 0 20px;
  margin-top: 22px;
  .component-list {
    overflow: hidden;
    li {
      float: left;
      width: 50%;
      font-size: 12px;
      padding-bottom: 8px;
      text-align: center;
      &.drag-enabled {
        cursor: move;
      }
      &.drag-disabled {
        cursor: not-allowed;
      }
      &.drag-enabled:hover {
        background: @color-1;
        color: #fff;
        border-radius: 2px;
        .ico {
          background-position: 0 -32px;
        }
        .num,
        .name {
          color: #ffffff !important;
        }
      }
      .ico {
        display: inline-block;
        margin-top: 8px;
        background-position: 0 0;
        height: 32px;
        width: 32px;
        background-size: cover;
      }
      .name {
        line-height: 16px;
        margin-top: -4px;
      }
      .num {
        font-size: 12px;
        color: #999999;
      }
    }
  }
}

.el-collapse {
  border: none;
  /deep/ .el-collapse-item__header {
    border: none;
    height: 30px;
    line-height: 30px;
  }
  /deep/ .el-collapse-item__wrap {
    border: none;
  }
  /deep/ .el-collapse-item__content {
    padding-bottom: 0;
  }
}
</style>