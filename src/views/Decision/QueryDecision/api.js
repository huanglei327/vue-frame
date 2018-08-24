import { get, post } from '@/utils/httpUtils/fetch.js'
export function getDecisionMaking(userName) {
  const apiName = '/m_decisionMaking/query_decisionMaking?userName='+userName
  return get(apiName)
}
