import adminRequest from "@/utils/adminRequest";

// 获取角色分页列表
export const getRoleList = (queryInfo: {query: string, pageNum: number, pageSize: number}) => {
  return adminRequest({
    url: '/getRoleList',
    method: 'POST',
    params: queryInfo
  })
}

// 获取全部角色分页列表
export const getRoleAllList = () => {
  return adminRequest({
    url: '/getRoleAllList',
    method: 'GET'
  })
}

// 通过用户角色获取其权限下可显示的菜单
export const getAdminMenuListByRole = (params: object) => {
  return adminRequest({
    url: '/getAdminMenuListByRole',
    method: 'POST',
    params
  })
}


// 添加角色
export const addRole = (params: object) => {
  return adminRequest({
    url: '/addRole',
    method: 'POST',
    params
  })
}

// 删除角色
export const delRole = (id: number) => {
  return adminRequest({
    url: `/delRole?id=${id}`,
    method: 'GET'
  })
}

// 修改角色
export const editRole = (params: object) => {
  return adminRequest({
    url: '/editRole',
    method: 'POST',
    params
  })
}

// 修改角色菜单权限
export const editRoleMenuList = (arr: string, id: number) => {
  return adminRequest({
    url: '/editRoleMenuList',
    method: 'POST',
    params: {arr, id}
  })
}