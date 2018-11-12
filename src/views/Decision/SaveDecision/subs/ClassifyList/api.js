import { get, post } from '@/utils/httpUtils/fetch.js'
export function getValue(param) {
  const apiName = '/m_lookup/query_lookup'
  return get(apiName)
}