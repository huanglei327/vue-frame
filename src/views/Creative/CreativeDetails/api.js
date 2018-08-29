import { get, post } from '@/utils/httpUtils/fetch.js'
export function getCreativeDetails(param) {
    const apiName = '/m_resolution/query_resolution'
    return post(apiName, param)
}

export function getResolutionInfo(param){
    const apiName ='/m_resolutionDtl/query_resolutionDtl'
    return post(apiName,param)
}

export function getDecisionMaking(param) {
    const apiName = '/m_decisionMaking/query_decisionMaking'
    return post(apiName,param)
  }
  
export function addQuizInfo(param) {
    const apiName = '/m_quizInfo/addQuizInfo'
    return post(apiName, param)
}

export function addResolutionDtlInfo(param) {
    const apiName = '/m_resolutionDtl/addResolutionDtlInfo'
    return post(apiName, param)
}

export function getQuizInfo(param) {
    const apiName = '/m_quizInfo/query_quizInfo'
    return post(apiName, param)
}

export function addAnswerInfo(param){
    const apiName = '/m_quizInfo/addAnswerInfo'
    return post(apiName,param)
  }