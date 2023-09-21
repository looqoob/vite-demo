export interface option {
  list: Function;
  del: Function;
  edit: Function;
  add: Function;
  dictionaryFn?: Function;
}

import { ref, reactive, onMounted } from "vue";
import { getUserList, addUser, delUser, editUser } from "@/api/user/index";
import { ElMessage } from "element-plus";
/**
 *
 * @param props
 *
 *
 *
 *
 *
 * @returns
 */
export default function (props: option) {
  let { list, del, dictionaryFn, edit, add } = props;
  let search = ref(""); // 搜索值
  let addDrawer = ref(false); // 添加功能侧边栏
  let editDrawer = ref(false); // 修改功能侧边栏
  let loading = ref(true);
  // 列表相关数据
  const tableList = reactive<any>({
    tableData: [],
    dictionary: [],
    tableCount: 0,
    pageNum: 1,
    pageSize: 10,
  });

  onMounted(() => {
    if (dictionaryFn) {
      dictionaryFn();
    }
    getList();
  });

  // 获取列表
  const getList = () => {
    list({
      query: search.value,
      pageNum: tableList.pageNum,
      pageSize: tableList.pageSize,
    })
      .then((res: any) => {
        tableList.tableData = res.data.data;
        tableList.tableCount = res.data.numbers;
        loading.value = false;
      })
      .catch((err: any) => {
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

  // 删除
  const deleteRole = (id: number) => {
    del(id).then((res: any) => {
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
  // 添加用户按钮
  const addClick = () => {
    addDrawer.value = true;
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
  // 修改表单数据
  const editForm = ref({
    id: 0,
    name: "",
    password: "",
    img: "",
    state: 1,
    role: null,
  });
  // 修改用户按钮
  const editClick = (item: any) => {
    editForm.value = item
    editDrawer.value = true;
  };
  // 侧边框取消
const editCancelClick = () => {
  editClearForm()
};
// 测边框确认
const editConfirmClick = () => {
  edit(editForm.value).then((res: any) => {
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
  editClearForm()
};
const editClearForm = () => {
  editForm.value = {
    id: 0,
    name: "",
    password: "",
    img: "",
    state: 1,
    role: null,
  }
  editDrawer.value = false;
}
  return {
    loading,
    getList,
    tableList,
    deleteRole,
    handleSizeChange,
    handleCurrentChange,
    search,
    addDrawer,
    editDrawer,
    addClick,
    goSearch,
    goEdit,
    editClick,
    editForm,
    editCancelClick,
    editConfirmClick
  };
}
