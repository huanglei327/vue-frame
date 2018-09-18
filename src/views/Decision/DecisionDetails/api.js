import { get, post } from '@/utils/httpUtils/fetch.js'
export function getDecisionMaking(param) {
  const apiName = '/m_decisionMaking/query_decisionMaking'
  return post(apiName, param)
}

export function getQuizInfo(decisionId, userName) {
  const apiName = '/m_quizInfo/query_quizInfo?decisionId=' + decisionId + '&userName=' + userName
  return get(apiName)
}
export function getQuizInfoA(param) {
  const apiName = '/m_quizInfo/query_quizInfo'
  return post(apiName, param)
}

export function notDecisionMaking(param) {
  const apiName = '/m_decisionMaking/notDecisionMaking'
  return post(apiName, param)
}

export function getCreativeDetails(param) {
  const apiName = '/m_resolution/query_resolution'
  return post(apiName, param)
}

export function addQuizInfo(param) {
  const apiName = '/m_quizInfo/addQuizInfo'
  return post(apiName, param)
}

export function addAnswerInfo(param) {
  const apiName = '/m_quizInfo/addAnswerInfo'
  return post(apiName, param)
}

export function queryImg(param) {
  const apiName = '/m_decisionMaking/loadImage'
  return post(apiName, param)
}

export function queryNoJC(param) {
  const apiName = '/m_decisionMaking/query_nonparticipationInfo'
  return post(apiName, param)
}