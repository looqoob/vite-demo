interface option {
  success: Function;
  danger?: Function;
  form: object;
}

import { ref } from "vue";
import { ElMessage } from "element-plus";

export default function (props: option) {
  let { success, danger, form } = props;
  let drawer = ref(false); // 修改功能侧边栏
  // 修改表单数据
  const drawerForm = ref<any>(form);
  // 修改用户按钮
  const drawerClick = (item: any) => {
    drawerForm.value = item;
    drawer.value = true;
  };
  // 侧边框取消
  const cancelClick = () => {
    if (danger) {
      danger()
    }
    clearForm();
  };
  // 测边框确认
  const confirmClick = () => {
    success();
    clearForm();
  };
  const clearForm = () => {
    drawerForm.value = form;
    drawer.value = false;
  };
  return {
    drawerForm,
    drawer,
    drawerClick,
    cancelClick,
    confirmClick,
  };
}
