import { mockListGridProvinceAll } from '../mock/gridRegion'
import request, { useRealApi } from './request'

export async function listGridProvinceAll() {
  if (useRealApi) {
    return request.get('/gridProvince/listGridProvinceAll')
  }

  return mockListGridProvinceAll()
}
