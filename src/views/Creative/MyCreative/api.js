import { get, post } from '@/utils/httpUtils/fetch.js'
export function getMyCreactive(param) {
  const apiName = '/m_resolution/query_resolution'
  return post(apiName,param)
}

 