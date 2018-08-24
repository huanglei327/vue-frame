import { get, post } from '@/utils/httpUtils/fetch.js'
export function BindUserInfo(param) {
    const apiName = '/m_user/addOpenId'
    return post(apiName,param)
}
