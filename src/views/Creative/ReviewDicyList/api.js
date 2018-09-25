import { get, post } from '@/utils/httpUtils/fetch.js'
export function getDecisionMaking(param) {
  const apiName = '/m_decisionMaking/query_decisionMaking'
  return post(apiName, param)
}

export function getMyCreactive(param) {
  const apiName = '/m_resolution/query_resolution'
  return post(apiName, param)
}

export function GetDecisionList(param) {
  const apiName = '/m_resolution/query_assessor'
  return post(apiName, param)
}