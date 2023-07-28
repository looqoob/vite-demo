import adminRequest from "@/utils/adminRequest";


// 获取全部菜单分页列表
export const getMenuAllList = () => {
  return adminRequest({
    url: '/getMenuAllList',
    method: 'POST'
  })
}

// 添加菜单
export const addMenu = (params: object) => {
  return adminRequest({
    url: '/addMenu',
    method: 'POST',
    params
  })
}

// 删除菜单
export const delMenu = (id: number) => {
  return adminRequest({
    url: `/delMenu?id=${id}`,
    method: 'GET'
  })
}

// 修改菜单
export const editMenu = (params: object) => {
  return adminRequest({
    url: '/editMenu',
    method: 'POST',
    params
  })
}