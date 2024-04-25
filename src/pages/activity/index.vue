<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="页面id" width="180"> </el-table-column>
      <el-table-column prop="name" label="页面标题" width="180">
      </el-table-column>
      <el-table-column prop="page_type" label="页面状态"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      <el-table-column prop="update_time" label="更新时间"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCmsPageList } from "@/api/activity";
export default {
  name: "Activity",
  data() {
    return {
      tableData: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
    };
  },
  methods: {
    async getList(val) {
      const data = await getCmsPageList(val);
      this.tableData = data.data.list || [];
      this.page.total = data.data.total;
      // console.log(this.tableData);
    },
    handleClick(val) {
      const routeData = this.$router.resolve({
        path: "decorate",
        query: { id: val.id },
      });
      window.open(routeData.href, "_blank");
      // console.log(val);
    },
  },
  mounted() {
    let { pageNum, pageSize } = this.page;
    this.getList({ pageNum, pageSize });
  },
};
</script>

<style>
</style>