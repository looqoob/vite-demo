import adminRequest from "@/utils/adminRequest";


// 获取全部按钮级权限
export const getPermissionListByRoleId = (params: object) => {
  return adminRequest({
    url: '/getPermissionListByRoleId',
    method: 'POST',
    params
  })
}

// 获取全部按钮级权限
export const getPermissionAllList = () => {
  return adminRequest({
    url: '/getPermissionAllList',
    method: 'POST'
  })
}

// 添加按钮级权限
export const addPermission = (params: object) => {
  return adminRequest({
    url: '/adPermission',
    method: 'POST',
    params
  })
}

// 删除按钮级权限
export const delPermission = (id: number) => {
  return adminRequest({
    url: `/delPermission?id=${id}`,
    method: 'GET'
  })
}

// 修改按钮级权限
export const editPermission = (params: object) => {
  return adminRequest({
    url: '/editPermission',
    method: 'POST',
    params
  })
}