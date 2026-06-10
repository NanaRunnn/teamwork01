export function normalizeUser(user = {}) {
  return {
    ...user,
    realName: user.realName || user.name || user.supervisorRealName || '',
  }
}

export function normalizeFeedback(item = {}) {
  return {
    ...item,
    supervisorName: item.supervisorName || item.supervisorRealName || '',
    level: item.level || '',
    assignTime: item.assignTime || item.createTime || '',
  }
}

export function normalizeFeedbackList(list = []) {
  return list.map((item) => normalizeFeedback(item))
}

export function normalizeStatistics(item = {}) {
  return {
    ...item,
    provinceId: item.provinceId || item.provinceName || '',
    cityId: item.cityId || item.cityName || '',
  }
}

export function normalizeStatisticsList(list = []) {
  return list.map((item) => normalizeStatistics(item))
}

export function normalizeProvinceTotal(item = {}) {
  return {
    ...item,
    name: item.name || item.provinceName || item.cityName || '未知地区',
    total: Number(item.total || 0),
  }
}
