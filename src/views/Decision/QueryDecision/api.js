import { get, post } from '@/utils/httpUtils/fetch.js'
export function getDecisionMaking(param) {
  const apiName = '/m_decisionMaking/query_decisionMaking'
  return post(apiName,param)
}
