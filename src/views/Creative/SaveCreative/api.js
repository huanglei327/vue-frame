import { get, post } from '@/utils/httpUtils/fetch.js'
 
export function SaveTA(param){
  const apiName = '/m_resolution/addResolution'
   return post(apiName,param)
}