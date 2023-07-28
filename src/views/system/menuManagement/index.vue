<template>
  <div>
    <el-card>
      <el-button type="primary" @click="newClick">新增</el-button>
      <div style="float: right; height: 32px">
        <el-input
          v-model="search"
          class="searchRole"
          placeholder="请输入菜单名称"
          :prefix-icon="Search"
        />
        <el-button type="primary" @click="goSearch">查询</el-button>
        <el-button @click="goEdit">重置</el-button>
      </div>
    </el-card>
    <el-card class="tableContent">
      <span style="font-size: 18px">菜单列表</span>
      <el-table
        :data="roleList.tableData"
        border
        row-key="id"
        v-loading="loading"
        height="55vh"
        empty-text="空"
        style="width: 100%; margin-top: 12px"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="id" label="编号" width="120" />
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="icon" label="图标" />
        <el-table-column prop="description" label="菜单描述" />
        <el-table-column prop="time" label="操作" width="160">
          <template #default="scope">
            <el-tooltip content="添加下级" placement="top" effect="light">
              <el-button type="warning" size="small" :icon="Plus" circle />
            </el-tooltip>
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              circle
              @click="editClick(scope.row)"
            />
            <el-popconfirm
              title="确认要删除该菜单吗?"
              @confirm="deleteRole(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" :icon="Delete" circle />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 侧边弹出层 -- 新增 -->
    <el-drawer v-model="drawer" direction="rtl">
      <template #header>
        <h1 style="font-weight: 700">新增菜单</h1>
      </template>
      <template #default>
        <div>
          <el-radio-group v-model="isOneMenu" style="margin-bottom: 20px;">
            <el-radio-button :label="true">一级菜单</el-radio-button>
            <el-radio-button :label="false">二级菜单</el-radio-button>
          </el-radio-group>
          <el-form :model="form" label-width="80px">
            <el-form-item label="菜单名称">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="菜单路径">
              <el-input v-model="form.path" />
            </el-form-item>
            <el-form-item label="父菜单id" v-if="!isOneMenu">
              <el-input v-model="form.pid" />
            </el-form-item>
            <el-form-item label="菜单图标">
              <el-input v-model="form.icon" />
            </el-form-item>
            <el-form-item label="菜单描述">
              <el-input v-model="form.description" />
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
        <h1 style="font-weight: 700">修改菜单</h1>
      </template>
      <template #default>
        <div>
          <el-form :model="form2" label-width="80px">
            <el-form-item label="菜单名称">
              <el-input v-model="form2.name" />
            </el-form-item>
            <el-form-item label="菜单路径">
              <el-input v-model="form2.path" />
            </el-form-item>
            <el-form-item label="父菜单id" v-if="!isOneMenu">
              <el-input v-model="form2.pid" />
            </el-form-item>
            <el-form-item label="菜单图标">
              <el-input v-model="form2.icon" />
            </el-form-item>
            <el-form-item label="菜单描述">
              <el-input v-model="form2.description" />
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
import { Search, Edit, Delete, Plus } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { getMenuAllList, addMenu, delMenu, editMenu } from "@/api/menu/index";
import { ElMessage } from "element-plus";

let search = ref("");
let drawer = ref(false);
let drawer2 = ref(false);
let loading = ref(true);
let isOneMenu = ref(true);
// 列表相关数据
const roleList = reactive({
  tableData: [],
  tableCount: 0,
  pageNum: 1,
  pageSize: 10,
});
// 新增表单数据
const form = reactive({
  name: "",
  path: "",
  icon: "",
  description: "",
  pid: 0
});
// 修改表单数据
const form2 = reactive({
  id: 0,
  name: "",
  path: "",
  icon: "",
  description: "",
  pid: 0
});
// 修改
onMounted(() => {
  getList();
});

// 获取菜单列表
const getList = () => {
  getMenuAllList()
    .then((res) => {
      roleList.tableData = res.data.data;
      loading.value = false;
    })
    .catch((err) => {
      ElMessage({
        message: "请求失败",
        type: "error",
      });
    });
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
  clearForm()
};
// 测边框确认
const confirmClick = () => {
  // form.time = getDate();
  addMenu(form).then((res) => {
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
  clearForm()
};
// 侧边框取消
const cancelClick2 = () => {
  clearForm2()
};
// 测边框确认
const confirmClick2 = () => {
  editMenu(form2).then((res) => {
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
  clearForm2()
};
// 添加菜单按钮
const newClick = () => {
  drawer.value = true;
};
// 修改菜单按钮
const editClick = (item: any) => {
  form2.id = item.id
  form2.name= item.name
  form2.path= item.path
  form2.icon= item.icon
  form2.description= item.description
  form2.pid= item.pid
  drawer2.value = true;
};
// 删除菜单
const deleteRole = (id: number) => {
  delMenu(id).then((res) => {
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
// 初始化表单1
const clearForm = () => {
  form.name= ""
  form.path= ""
  form.icon= ""
  form.description= ""
  form.pid= 0
  drawer.value = false;
}
// 初始化表单2
const clearForm2 = () => {
  form2.name= ""
  form2.path= ""
  form2.icon= ""
  form2.description= ""
  form2.pid= 0
  drawer2.value = false;
}
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
