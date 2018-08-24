import { get, post } from '@/utils/httpUtils/fetch.js'
export function getName() {
  const apiName = 'api/value'
  return get(apiName)
}

export function getDecisionMaking(decisionId,userName) {
  const apiName = '/m_decisionMaking/query_decisionMaking?decisionId='+decisionId+'&userName='+userName
  return get(apiName)
}


export function closeDecisionMaking(param){
  const apiName = '/m_decisionMaking/closeDecisionMaking '
  return post(apiName,param)
}