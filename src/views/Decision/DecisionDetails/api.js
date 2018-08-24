import { get, post } from '@/utils/httpUtils/fetch.js'
export function getDecisionMaking(decisionId,userName) {
  const apiName = '/m_decisionMaking/query_decisionMaking?decisionId='+decisionId+'&userName='+userName
  return get(apiName)
}

export function getQuizInfo(decisionId){
    const apiName = '/m_quizInfo/query_quizInfo?decisionId='+decisionId
    return get(apiName)
}


export function notDecisionMaking(param) {
  const apiName = '/m_decisionMaking/notDecisionMaking'
  return post(apiName, param)
}


export function addQuizInfo(param){
  const apiName = '/m_quizInfo/addQuizInfo'
  return post(apiName,param)
}