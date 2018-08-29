import { get, post } from '@/utils/httpUtils/fetch.js'
export function getName() {
  const apiName = 'api/value'
  return get(apiName)
}


export function SaveJC(param) {
  const apiName = '/m_decisionMaking/addDecisionMaking'
  return post(apiName, param)
}

export function UpImg(param) {
  const apiName = '/m_decisionMaking/upload_picture'
  return post(apiName, param)
}