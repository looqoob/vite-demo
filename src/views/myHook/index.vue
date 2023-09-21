<template>
  <div>
    <!-- <el-card>
      <h1>当前鼠标所点击的位置为 x: {{ point.x }}, y: {{ point.y }}</h1>
    </el-card> -->
    <el-card>
      <el-button type="primary" @click="drawerClick2">新增</el-button>
      <div style="float: right; height: 32px">
        <el-input
          v-model="search"
          class="searchRole"
          placeholder="请输入用户名称"
          prefix-icon="Search"
        />
        <el-button type="primary" @click="goSearch">查询</el-button>
        <el-button @click="goEdit">重置</el-button>
      </div>
    </el-card>
    <el-card class="tableContent">
      <span style="font-size: 18px">用户列表</span>
      <el-table
        :data="tableList.tableData"
        border
        v-loading="loading"
        height="55vh"
        style="width: 100%; margin-top: 12px"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="id" label="编号" width="120" />
        <el-table-column prop="img" label="头像">
          <template #default="scope">
            <img
              v-if="scope.row.img == null"
              src="@/assets/路飞.jpg"
              class="headerImg"
            />
            <img v-else :src="scope.row.img" class="headerImg" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名称" />
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-tag>{{
              tableList.dictionary[scope.row.role - 1].rolename
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.state === 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="操作" width="160">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              circle
              @click="drawerClick(scope.row)"
            />
            <el-popconfirm
              title="确认要删除该用户吗?"
              @confirm="deleteRole(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete" circle />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        v-model:current-page="tableList.pageNum"
        v-model:page-size="tableList.pageSize"
        :page-sizes="[3, 10, 20, 50]"
        background
        layout="total, sizes, prev, pager, next"
        :total="tableList.tableCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <!-- 侧边弹出层 -- 新增 -->
      <el-drawer v-model="drawer2" direction="rtl">
        <template #header>
          <h1 style="font-weight: 700">新增用户</h1>
        </template>
        <template #default>
          <div>
            <el-form :model="drawerForm2" label-width="80px">
              <el-form-item label="用户名称">
                <el-input v-model="drawerForm2.name" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="drawerForm2.password" />
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:9090/files/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload2"
                >
                  <img v-if="drawerForm2.img" :src="drawerForm2.img" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-form-item>
              <el-form-item label="角色">
                <el-select v-model="drawerForm2.role" placeholder="请选择用户的角色">
                  <el-option
                    v-for="(item, index) in tableList.dictionary"
                    :key="item.id"
                    :label="item.rolename"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="状态">
                <el-radio-group v-model="form2.state" size="small">
                  <el-radio-button :label="0">禁用</el-radio-button>
                  <el-radio-button :label="1">启用</el-radio-button>
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
      <!-- 侧边弹出层 -- 修改 -->
      <el-drawer v-model="drawer" direction="rtl">
        <template #header>
          <h1 style="font-weight: 700">修改用户</h1>
        </template>
        <template #default>
          <div>
            <el-form :model="drawerForm" label-width="80px">
              <el-form-item label="用户名称">
                <el-input v-model="drawerForm.name" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="drawerForm.password" />
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:9090/files/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="drawerForm.img"
                    :src="drawerForm.img"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-form-item>
              <el-form-item label="角色">
                <el-select
                  v-model="drawerForm.role"
                  placeholder="请选择用户的角色"
                >
                  <el-option
                    v-for="(item, index) in tableList.dictionary"
                    :key="item.id"
                    :label="item.rolename"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="状态">
                <el-radio-group v-model="drawerForm.state" size="small">
                  <el-radio-button :label="0">禁用</el-radio-button>
                  <el-radio-button :label="1">启用</el-radio-button>
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
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getRoleAllList } from "@/api/role/index";
import { getUserList, addUser, delUser, editUserAll } from "@/api/user/index";
import { ElMessage } from "element-plus";
// import usePoint from "../../hooks/usePoint";
import useTable from "../../hooks/useTable";
import useDrawer from "../../hooks/useDrawer";

// let point = usePoint();
const getRoleList = () => {
  getRoleAllList().then((res) => {
    tableList.dictionary = res.data.data;
  });
};
// 上传成功
const handleAvatarSuccess = (e: any) => {
  editForm.value.img = new URL(e, import.meta.url).href;
};
// 上传之前
const beforeAvatarUpload = (e: any) => {};
// 上传成功
const handleAvatarSuccess2 = (e: any) => {
  editForm.value.img = new URL(e, import.meta.url).href;
};
// 上传之前
const beforeAvatarUpload2 = (e: any) => {};

const options = {
  list: getUserList,
  del: delUser,
  edit: editUserAll,
  add: addUser,
  dictionaryFn: getRoleList,
};
let {
  loading,
  tableList,
  getList,
  deleteRole,
  handleSizeChange,
  handleCurrentChange,
  search,
  addDrawer,
  addClick,
  goSearch,
  goEdit,
  editForm,
} = useTable(options);
// 修改
const success = () => {
  editUserAll(editForm.value).then((res: any) => {
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
};
const form = {
  id: 0,
  name: "",
  password: "",
  img: "",
  state: 1,
  role: null,
};
let { drawerForm, drawer, cancelClick, confirmClick, drawerClick } = useDrawer({
  success,
  form,
});

// 添加
const success2 = () => {
  editUserAll(editForm.value).then((res: any) => {
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
};
const form2 = {
  name: "",
  password: "",
  img: "",
  state: 1,
  role: null,
};
let {
  drawerForm: drawerForm2,
  drawer: drawer2,
  cancelClick: cancelClick2,
  confirmClick: confirmClick2,
  drawerClick: drawerClick2,
} = useDrawer({
  success: success2,
  form: form2,
});
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
.headerImg {
  height: 60px;
  border-radius: 5px;
  position: relative;
  top: 3.5px;
}

:deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
