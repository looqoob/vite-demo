import adminRequest from "@/utils/adminRequest";

// 获取角色分页列表
export const getRoleList = (queryInfo: {query: string, pageNum: number, pageSize: number}) => {
  return adminRequest({
    url: '/getRoleList',
    method: 'POST',
    params: queryInfo
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