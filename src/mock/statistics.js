import { getAqiLevel } from '../utils/aqi'

const STATISTICS_KEY = 'nep_mock_statistics'

const fallbackStatistics = [
  {
    id: 'T001',
    feedbackId: 'F001',
    gridMemberId: 'G001',
    gridMemberName: '李四',
    provinceId: 'beijing',
    provinceName: '北京市',
    cityId: 'chaoyang',
    cityName: '朝阳区',
    so2: 18.5,
    co: 0.8,
    pm25: 62,
    aqi: 86,
    confirmTime: '2026-06-02 09:30:00',
  },
  {
    id: 'T002',
    feedbackId: 'F002',
    gridMemberId: 'G002',
    gridMemberName: '王五',
    provinceId: 'beijing',
    provinceName: '北京市',
    cityId: 'haidian',
    cityName: '海淀区',
    so2: 22.1,
    co: 1.1,
    pm25: 82,
    aqi: 118,
    confirmTime: '2026-06-02 10:20:00',
  },
  {
    id: 'T003',
    feedbackId: 'F003',
    gridMemberId: 'G003',
    gridMemberName: '赵六',
    provinceId: 'beijing',
    provinceName: '北京市',
    cityId: 'fengtai',
    cityName: '丰台区',
    so2: 28.7,
    co: 1.4,
    pm25: 96,
    aqi: 152,
    confirmTime: '2026-06-02 11:10:00',
  },
  {
    id: 'T004',
    feedbackId: 'F004',
    gridMemberId: 'G001',
    gridMemberName: '李四',
    provinceId: 'beijing',
    provinceName: '北京市',
    cityId: 'chaoyang',
    cityName: '朝阳区',
    so2: 15.2,
    co: 0.6,
    pm25: 41,
    aqi: 48,
    confirmTime: '2026-06-02 12:05:00',
  },
]

function readStoredStatistics() {
  const raw = localStorage.getItem(STATISTICS_KEY)

  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw)
  } catch {
    localStorage.removeItem(STATISTICS_KEY)
    return []
  }
}

function readStatistics() {
  const stored = readStoredStatistics()
  return stored.length ? stored : fallbackStatistics
}

function writeStatistics(statistics) {
  localStorage.setItem(STATISTICS_KEY, JSON.stringify(statistics))
}

function groupBy(items, key) {
  return items.reduce((result, item) => {
    const name = item[key] || '未知'
    result[name] = (result[name] || 0) + 1
    return result
  }, {})
}

export function mockSaveStatistics(payload) {
  const statistics = readStoredStatistics()
  const record = {
    id: `T${Date.now()}`,
    ...payload,
    confirmTime: payload.confirmTime || new Date().toLocaleString('zh-CN', { hour12: false }),
  }

  statistics.unshift(record)
  writeStatistics(statistics)

  return {
    code: 200,
    message: '检测数据提交成功',
    data: record,
  }
}

export function mockListStatisticsAll() {
  return {
    code: 200,
    message: 'success',
    data: readStatistics(),
  }
}

export function mockListProvinceItemTotalStatis() {
  const grouped = groupBy(readStatistics(), 'cityName')

  return {
    code: 200,
    message: 'success',
    data: Object.entries(grouped).map(([name, total]) => ({
      name,
      total,
    })),
  }
}

export function mockListAqiDistributeStatis() {
  const grouped = readStatistics().reduce((result, item) => {
    const level = getAqiLevel(Number(item.aqi)).text
    result[level] = (result[level] || 0) + 1
    return result
  }, {})

  return {
    code: 200,
    message: 'success',
    data: Object.entries(grouped).map(([level, total]) => ({
      level,
      total,
    })),
  }
}

export function mockListPm25OverLimitStatis() {
  const sorted = [...readStatistics()].sort((a, b) => {
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

export function mockListGridCoverageStatis() {
  const statistics = readStatistics()
  const coveredCities = new Set(statistics.map((item) => item.cityName)).size
  const totalCities = 3

  return {
    code: 200,
    message: 'success',
    data: {
      coveredCities,
      totalCities,
      rate: Math.round((coveredCities / totalCities) * 100),
    },
  }
}
