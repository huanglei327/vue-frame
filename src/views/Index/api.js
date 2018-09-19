import { get, post } from '@/utils/httpUtils/fetch.js'
export function getCountApi(param) {
  const apiName = '/m_resolution/queryCount'
  return post(apiName, param)
}