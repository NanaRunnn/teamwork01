import {
  mockListAqiDistributeStatis,
  mockListGridCoverageStatis,
  mockListPm25OverLimitStatis,
  mockListProvinceItemTotalStatis,
  mockListStatisticsAll,
  mockSaveStatistics,
} from '../mock/statistics'
import request, { useRealApi } from './request'
import {
  normalizeProvinceTotal,
  normalizeStatisticsList,
} from './normalizers'

export async function saveStatistics(payload) {
  if (useRealApi) {
    const result = await request.post('/statistics/saveStatistics', {
      feedbackId: payload.feedbackId,
      gridMemberId: payload.gridMemberId,
      so2: payload.so2,
      co: payload.co,
      pm25: payload.pm25,
      aqi: payload.aqi,
    })

    return {
      ...result,
      data: {
        ...payload,
        ...result.data,
      },
    }
  }

  return mockSaveStatistics(payload)
}

export async function listStatisticsAll() {
  const result = useRealApi
    ? await request.get('/statistics/listStatisticsAll')
    : mockListStatisticsAll()

  return {
    ...result,
    data: normalizeStatisticsList(result.data || []),
  }
}

export async function listProvinceItemTotalStatis() {
  const result = useRealApi
    ? await request.get('/statistics/listProvinceItemTotalStatis')
    : mockListProvinceItemTotalStatis()

  return {
    ...result,
    data: (result.data || []).map((item) => normalizeProvinceTotal(item)),
  }
}

export async function listAqiDistributeStatis() {
  return useRealApi
    ? request.get('/statistics/listAqiDistributeStatis')
    : mockListAqiDistributeStatis()
}

export async function listPm25OverLimitStatis() {
  if (useRealApi) {
    const statisticsResult = await listStatisticsAll()
    const sorted = [...(statisticsResult.data || [])].sort((a, b) => {
      return new Date(a.confirmTime).getTime() - new Date(b.confirmTime).getTime()
    })

    let total = 0

    return {
      code: 200,
      message: 'success',
      data: sorted.map((item) => {
        if (Number(item.pm25) > 75) {
          total += 1
        }

        return {
          time: item.confirmTime,
          cityName: item.cityName,
          total,
        }
      }),
    }
  }

  return mockListPm25OverLimitStatis()
}

export async function listGridCoverageStatis() {
  if (useRealApi) {
    const statisticsResult = await listStatisticsAll()
    const coveredCities = new Set(
      (statisticsResult.data || []).map((item) => item.cityId || item.cityName),
    ).size

    return {
      code: 200,
      message: 'success',
      data: {
        coveredCities,
        totalCities: Math.max(coveredCities, 1),
        rate: coveredCities ? 100 : 0,
      },
    }
  }

  return mockListGridCoverageStatis()
}
