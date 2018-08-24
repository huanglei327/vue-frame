import { get, post } from '@common/utils/httpUtils/fetch.js'

export function getSearchData() {
  const apiName = '/m_user/query_userInfo'
  return get(apiName)
}

