<template>
  <div>
    <el-card>
      <el-button type="primary" @click="newClick">新增</el-button>
      <div style="float: right; height: 32px">
        <el-input
          v-model="search"
          class="searchRole"
          placeholder="请输入用户名称"
          :prefix-icon="Search"
        />
        <el-button type="primary" @click="goSearch">查询</el-button>
        <el-button @click="goEdit">重置</el-button>
      </div>
    </el-card>
    <el-card class="tableContent">
      <span style="font-size: 18px">用户列表</span>
      <el-table
        :data="roleList.tableData"
        border
        v-loading="loading"
        height="55vh"
        style="width: 100%; margin-top: 12px;"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="id" label="编号" width="120" />
        <el-table-column prop="img" label="头像">
          <template #default="scope">
            <img v-if="scope.row.img == null" src="@/assets/路飞.jpg" class="headerImg" />
            <img v-else :src="scope.row.img" class="headerImg" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名称" />
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-tag>{{ roleList.dictionary[scope.row.role - 1].rolename }}</el-tag>
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
              :icon="Edit"
              circle
              @click="editClick(scope.row)"
            />
            <el-popconfirm
              title="确认要删除该用户吗?"
              @confirm="deleteRole(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" :icon="Delete" circle />
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
        <h1 style="font-weight: 700">新增用户</h1>
      </template>
      <template #default>
        <div>
          <el-form :model="form" label-width="80px">
            <el-form-item label="用户名称">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" />
            </el-form-item>
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:9090/files/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="form.img" :src="form.img" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="角色">
              <el-select
                v-model="form.role"
                placeholder="请选择用户的角色"
              >
                <el-option v-for="(item, index) in roleList.dictionary" :key="item.id" :label="item.rolename" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="form.state" size="small">
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
    <!-- 侧边弹出层 -- 修改 -->
    <el-drawer v-model="drawer2" direction="rtl">
      <template #header>
        <h1 style="font-weight: 700">修改用户</h1>
      </template>
      <template #default>
        <div>
          <el-form :model="form2" label-width="80px">
            <el-form-item label="用户名称">
              <el-input v-model="form2.name" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form2.password" />
            </el-form-item>
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:9090/files/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess2"
                :before-upload="beforeAvatarUpload2"
              >
                <img v-if="form2.img" :src="form2.img" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="角色">
              <el-select
                v-model="form2.role"
                placeholder="请选择用户的角色"
              >
                <el-option v-for="(item, index) in roleList.dictionary" :key="item.id" :label="item.rolename" :value="item.id" />
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
  </div>
</template>

<script setup lang="ts">
import { Search, Edit, Delete, Plus } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { getRoleAllList } from "@/api/role/index";
import { getUserList, addUser, delUser, editUserAll } from "@/api/user/index";
import { ElMessage } from "element-plus";

let search = ref("");
let drawer = ref(false);
let drawer2 = ref(false);
let loading = ref(true);
// 列表相关数据
const roleList = reactive<any>({
  tableData: [],
  dictionary: [],
  tableCount: 0,
  pageNum: 1,
  pageSize: 10,
});
// 新增表单数据
const form = reactive({
  name: "",
  password: "",
  img: "",
  state: 1,
  role: null,
  // time: "",
});
// 修改表单数据
const form2 = reactive({
  id: 0,
  name: "",
  password: "",
  img: "",
  state: 1,
  role: null,
});
// 修改
onMounted(() => {
  // 获取角色字典值
  getRoleList();
  getList();
});

const getRoleList = () => {
  getRoleAllList().then((res) => {
    roleList.dictionary = res.data.data;
  });
};

// 获取用户列表
const getList = () => {
  getUserList({
    query: search.value,
    pageNum: roleList.pageNum,
    pageSize: roleList.pageSize,
  })
    .then((res) => {
      roleList.tableData = res.data.data;
      roleList.tableCount = res.data.numbers;
      loading.value = false;
    })
    .catch((err) => {
      ElMessage({
        message: "请求失败",
        type: "error",
      });
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
  clearForm()
};
// 测边框确认
const confirmClick = () => {
  // form.time = getDate();
  addUser(form).then((res) => {
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
  editUserAll(form2).then((res) => {
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
// 添加用户按钮
const newClick = () => {
  drawer.value = true;
};
// 修改用户按钮
const editClick = (item: any) => {
  console.log(item);
  
  form2.id = item.id,
  form2.name = item.name;
  form2.state = item.state;
  form2.password = item.password;
  form2.img = item.img;
  form2.role = item.role
  drawer2.value = true;
};
// 删除用户
const deleteRole = (id: number) => {
  delUser(id).then((res) => {
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
// 重置表单并关闭
const clearForm = () => {
  form.name = "";
  form.state = 1;
  form.password = '';
  form.img = '';
  form.role = null
  drawer.value = false;
}
const clearForm2 = () => {
  form2.id = 0,
  form2.name = "";
  form2.state = 1;
  form2.password = '';
  form2.img = '';
  form2.role = null
  drawer2.value = false;
}
// 上传成功
const handleAvatarSuccess = (e: any) => {
  form.img = new URL(e, import.meta.url).href;
};
// 上传之前
const beforeAvatarUpload = (e: any) => {};
// 上传成功
const handleAvatarSuccess2 = (e: any) => {
  form2.img = new URL(e, import.meta.url).href;
};
// 上传之前
const beforeAvatarUpload2 = (e: any) => {};
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
