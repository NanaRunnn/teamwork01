import {
  mockListGridCityAll,
  mockListGridCityByProvinceId,
} from '../mock/gridRegion'
import request, { useRealApi } from './request'

export async function listGridCityByProvinceId(provinceId) {
  if (useRealApi) {
    return request.get('/gridCity/listGridCityByProvinceId', {
      params: {
        provinceId,
      },
    })
  }

  return mockListGridCityByProvinceId(provinceId)
}

export async function listGridCityAll() {
  if (useRealApi) {
    const provinceResult = await request.get('/gridProvince/listGridProvinceAll')
    const cityResults = await Promise.all(
      (provinceResult.data || []).map((province) => listGridCityByProvinceId(province.id)),
    )

    return {
      code: 200,
      message: 'success',
      data: cityResults.flatMap((result) => result.data || []),
    }
  }

  return mockListGridCityAll()
}
