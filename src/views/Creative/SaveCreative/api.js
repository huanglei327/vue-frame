import { get, post } from '@/utils/httpUtils/fetch.js'
 
export function SaveTA(param){
  const apiName = '/m_resolution/addResolution'
   return post(apiName,param)
}

export function UpImg(param) {
  const apiName = '/m_decisionMaking/upload_picture'
  return post(apiName, param)
}