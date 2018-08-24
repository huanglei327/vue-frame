import { get, post } from '@/utils/httpUtils/fetch.js'

export function getSearchData() {
  const apiName = '/m_user/query_userInfo'
  return get(apiName)
}