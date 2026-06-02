export function getAqiLevel(aqi) {
  if (aqi <= 50) return { text: '优', color: '#2f9e44' }
  if (aqi <= 100) return { text: '良', color: '#f59f00' }
  if (aqi <= 150) return { text: '轻度污染', color: '#f76707' }
  if (aqi <= 200) return { text: '中度污染', color: '#e03131' }
  if (aqi <= 300) return { text: '重度污染', color: '#9c36b5' }
  return { text: '严重污染', color: '#862e9c' }
}
