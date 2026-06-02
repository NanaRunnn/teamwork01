import {
  mockListAqiDistributeStatis,
  mockListGridCoverageStatis,
  mockListPm25OverLimitStatis,
  mockListProvinceItemTotalStatis,
  mockListStatisticsAll,
  mockSaveStatistics,
} from '../mock/statistics'

export async function saveStatistics(payload) {
  return mockSaveStatistics(payload)
}

export async function listStatisticsAll() {
  return mockListStatisticsAll()
}

export async function listProvinceItemTotalStatis() {
  return mockListProvinceItemTotalStatis()
}

export async function listAqiDistributeStatis() {
  return mockListAqiDistributeStatis()
}

export async function listPm25OverLimitStatis() {
  return mockListPm25OverLimitStatis()
}

export async function listGridCoverageStatis() {
  return mockListGridCoverageStatis()
}
