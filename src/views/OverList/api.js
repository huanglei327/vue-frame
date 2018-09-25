import { get, post } from '@/utils/httpUtils/fetch.js'
export function getCloseInfo(param) {
  const apiName = '/m_decisionMaking/query_colseInfo'
  return post(apiName,param)
}