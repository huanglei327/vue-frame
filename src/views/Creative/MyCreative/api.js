import { get, post } from '@/utils/httpUtils/fetch.js'
export function getMyCreactive(userName) {
  const apiName = '/m_resolution/query_resolution?userName='+userName
  return get(apiName)
}

 