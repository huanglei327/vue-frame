import { get, post } from '@/utils/httpUtils/fetch.js'
export function getName() {
    const apiName = 'api/value'
    return get(apiName)
}

export function getDecisionMaking(decisionId) {
    const apiName = '/m_decisionMaking/query_decisionMaking?decisionId=' + decisionId
    return get(apiName)
}


export function notDecisionMaking(param) {
    const apiName = '/m_decisionMaking/notDecisionMaking'
    return post(apiName, param)
}