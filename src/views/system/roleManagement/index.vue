<template>
  <div>
    <el-card>
      <el-button type="primary" @click="newClick">新增</el-button>
      <div style="float: right; height: 32px">
        <el-input
          v-model="search"
          class="searchRole"
          placeholder="请输入角色名称"
          :prefix-icon="Search"
        />
        <el-button type="primary" @click="goSearch">查询</el-button>
        <el-button @click="goEdit">重置</el-button>
      </div>
    </el-card>
    <el-card class="tableContent">
      <span style="font-size: 18px">角色列表</span>
      <el-table
        :data="roleList.tableData"
        border
        style="width: 100%; margin-top: 12px"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="id" label="编号" width="120" />
        <el-table-column prop="rolename" label="角色名称" />
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.state === 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="创建时间" />
        <el-table-column prop="time" label="操作" width="160">
          <template #default="scope">
            <el-button
              type="danger"
              size="small"
              :icon="Edit"
              circle
              @click="editClick(scope.row)"
            />
            <el-popconfirm
              title="确认要删除该角色吗?"
              @confirm="deleteRole(scope.row.id)"
            >
              <template #reference>
                <el-button type="primary" size="small" :icon="Delete" circle />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        v-model:current-page="roleList.pageNum"
        v-model:page-size="roleList.pageSize"
        :page-sizes="[5, 10, 20, 50]"
        background
        layout="total, sizes, prev, pager, next"
        :total="roleList.tableCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 侧边弹出层 -- 新增 -->
    <el-drawer v-model="drawer" direction="rtl">
      <template #header>
        <h1 style="font-weight: 700">新增角色</h1>
      </template>
      <template #default>
        <div>
          <el-form :model="form" label-width="80px">
            <el-form-item label="角色名称">
              <el-input v-model="form.rolename" />
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="form.state" size="small">
                <el-radio-button :label='0'>禁用</el-radio-button>
                <el-radio-button :label='1'>启用</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 侧边弹出层 -- 修改 -->
    <el-drawer v-model="drawer2" direction="rtl">
      <template #header>
        <h1 style="font-weight: 700">修改角色</h1>
      </template>
      <template #default>
        <div>
          <el-form :model="form2" label-width="80px">
            <el-form-item label="角色名称">
              <el-input v-model="form2.rolename"/>
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="form2.state" size="small">
                <el-radio-button :label='0'>禁用</el-radio-button>
                <el-radio-button :label='1'>启用</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick2">取消</el-button>
          <el-button type="primary" @click="confirmClick2">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { Search, Edit, Delete } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { getRoleList, addRole, delRole } from "@/api/role/index.ts";
import { getDate } from "@/utils/date.ts";
import { ElMessage } from "element-plus";

let search = ref("");
let drawer = ref(false);
let drawer2 = ref(false);
// 列表相关数据
const roleList = reactive({
  tableData: [],
  tableCount: 0,
  pageNum: 1,
  pageSize: 10,
});
// 新增表单数据
const form = reactive({
  rolename: "",
  state: 1,
  time: "",
});
// 修改表单数据
const form2 = reactive({
  rolename: "",
  state: 1,
});
// 修改
onMounted(() => {
  getList();
});

// 获取角色列表
const getList = () => {
  getRoleList({
    query: search.value,
    pageNum: roleList.pageNum,
    pageSize: roleList.pageSize,
  }).then((res) => {
    roleList.tableData = res.data.data;
    roleList.tableCount = res.data.numbers;
  });
};
// 每页数量变化
const handleSizeChange = () => {
  getList();
};
// 页码变化
const handleCurrentChange = () => {
  getList();
};
// 搜索
const goSearch = () => {
  getList();
};
// 重置搜索框
const goEdit = () => {
  search.value = "";
  getList();
};
// 侧边框取消
const cancelClick = () => {
  form.rolename = "";
  form.state = 1;
  drawer.value = false;
};
// 测边框确认
const confirmClick = () => {
  form.time = getDate();
  addRole(form).then((res) => {
    if (res.data === "success") {
      ElMessage({
        message: "添加成功",
        type: "success",
      });
      getList();
    } else {
      ElMessage({
        message: "添加失败",
        type: "error",
      });
    }
  });
  form.rolename = "";
  form.state = 0;
  form.time = "";
  drawer.value = false;
};
// 侧边框取消
const cancelClick2 = () => {
  form2.rolename = "";
  form2.state = 0;
  drawer2.value = false;
};
// 测边框确认
const confirmClick2 = () => {
  form.time = getDate();
  addRole(form).then((res) => {
    if (res.data === "success") {
      ElMessage({
        message: "修改成功",
        type: "success",
      });
      getList();
    } else {
      ElMessage({
        message: "修改失败",
        type: "error",
      });
    }
  });
  form2.rolename = "";
  form2.state = 0;
  drawer2.value = false;
};
// 添加角色按钮
const newClick = () => {
  drawer.value = true;
};
// 修改角色按钮
const editClick = (item: any) => {
  form2.rolename = item.rolename;
  form2.state = item.state;
  console.log(form2.state);
  drawer2.value = true;
};
// 删除角色
const deleteRole = (id: number) => {
  delRole(id).then((res) => {
    if (res.data === "success") {
      ElMessage({
        message: "删除成功",
        type: "success",
      });
      getList();
    } else {
      ElMessage({
        message: "删除失败",
        type: "error",
      });
    }
  });
};
</script>

<style scoped lang="less">
.searchRole {
  width: 170px;
  margin-right: 15px;
}
.tableContent {
  margin-top: 10px;
  min-height: 400px;
  height: 71vh;
  position: relative;
  .pagination {
    position: absolute;
    bottom: 12px;
    right: 20px;
  }
}
</style>
