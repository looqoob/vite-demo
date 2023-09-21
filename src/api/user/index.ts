import adminRequest from "@/utils/adminRequest";

// 用户登录
export const userLogin = (name: string, password: string) => {
  return adminRequest({
    url: `/login?name=${name}&password=${password}`,
    method: 'GET'
  })
}

// 获取用户分页列表
export const getUserList = (queryInfo: {query: string, pageNum: number, pageSize: number}) => {
  return adminRequest({
    url: '/getUserList',
    method: 'POST',
    params: queryInfo
  })
}

// 添加用户
export const addUser = (params: object) => {
  return adminRequest({
    url: '/addUser',
    method: 'POST',
    params
  })
}

// 删除用户
export const delUser = (id: number) => {
  return adminRequest({
    url: `/delUser?id=${id}`,
    method: 'GET'
  })
}

// 修改密码
export const editUser = (params: object) => {
  return adminRequest({
    url: '/editUser',
    method: 'POST',
    params
  })
}

// 修改用户
export const editUserAll = (params: object) => {
  return adminRequest({
    url: '/editUserAll',
    method: 'POST',
    params
  })
}