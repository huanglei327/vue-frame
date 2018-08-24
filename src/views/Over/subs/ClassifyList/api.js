import { get, post } from '@/utils/httpUtils/fetch.js'
export function getTaInfo(decisionId,userName) {
  const apiName = '/m_resolution/query_resolution?decisionId='+decisionId+'&userName='+userName
  return get(apiName)
}