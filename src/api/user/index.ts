import adminRequest from "@/utils/adminRequest";

// 用户登录
export const userLogin = (name: string, password: string) => {
  return adminRequest({
    url: `/login?name=${name}&password=${password}`,
    method: 'GET'
  })
}