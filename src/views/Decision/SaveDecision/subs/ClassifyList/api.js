import { get, post } from '@/utils/httpUtils/fetch.js'
export function getValue() {
  const apiName = '/api/getValue'
  return get(apiName)
}