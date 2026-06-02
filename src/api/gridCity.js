import {
  mockListGridCityAll,
  mockListGridCityByProvinceId,
} from '../mock/gridRegion'

export async function listGridCityByProvinceId(provinceId) {
  return mockListGridCityByProvinceId(provinceId)
}

export async function listGridCityAll() {
  return mockListGridCityAll()
}
