import adminRequest from "@/utils/adminRequest";


// 获取胜利记录
export const getMine = (params: number) => {
  return adminRequest({
    url: `/getMine?userid=${params}`,
    method: 'GET'
  })
}

// 添加胜利记录
export const addMine = (params: object) => {
  return adminRequest({
    url: '/addMine',
    method: 'POST',
    params
  })
}

// // 删除胜利记录
// export const delMenu = (id: number) => {
//   return adminRequest({
//     url: `/delMenu?id=${id}`,
//     method: 'GET'
//   })
// }

// // 修改胜利记录
// export const editMenu = (params: object) => {
//   return adminRequest({
//     url: '/editMenu',
//     method: 'POST',
//     params
//   })
// }