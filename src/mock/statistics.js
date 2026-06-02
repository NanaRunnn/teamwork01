const STATISTICS_KEY = 'nep_mock_statistics'

function readStatistics() {
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

function writeStatistics(statistics) {
  localStorage.setItem(STATISTICS_KEY, JSON.stringify(statistics))
}

export function mockSaveStatistics(payload) {
  const statistics = readStatistics()
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
