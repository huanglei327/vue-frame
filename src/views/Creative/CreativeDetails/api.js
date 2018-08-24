import { get, post } from '@/utils/httpUtils/fetch.js'
export function getCreativeDetails(resolutionId,decisionId) {
    const apiName = '/m_resolution/query_resolution?resolutionId=' + resolutionId
    return get(apiName)
}


export function addQuizInfo(param){
    const apiName = '/m_quizInfo/addQuizInfo'
    return post(apiName,param)
}

export function addResolutionDtlInfo(param){
    const apiName = '/m_resolutionDtl/addResolutionDtlInfo'
    return post(apiName,param)
}

export function getQuizInfo(resolutionId){
    const apiName='/m_quizInfo/query_quizInfo?resolutionId=' + resolutionId
    return get(apiName)
}
