const provinces = [
  {
    id: 'beijing',
    name: '北京市',
  },
  {
    id: 'shanghai',
    name: '上海市',
  },
  {
    id: 'guangdong',
    name: '广东省',
  },
  {
    id: 'jiangsu',
    name: '江苏省',
  },
]

const cities = [
  {
    id: 'chaoyang',
    provinceId: 'beijing',
    name: '朝阳区',
  },
  {
    id: 'haidian',
    provinceId: 'beijing',
    name: '海淀区',
  },
  {
    id: 'fengtai',
    provinceId: 'beijing',
    name: '丰台区',
  },
  {
    id: 'pudong',
    provinceId: 'shanghai',
    name: '浦东新区',
  },
  {
    id: 'minhang',
    provinceId: 'shanghai',
    name: '闵行区',
  },
  {
    id: 'guangzhou',
    provinceId: 'guangdong',
    name: '广州市',
  },
  {
    id: 'shenzhen',
    provinceId: 'guangdong',
    name: '深圳市',
  },
  {
    id: 'nanjing',
    provinceId: 'jiangsu',
    name: '南京市',
  },
  {
    id: 'suzhou',
    provinceId: 'jiangsu',
    name: '苏州市',
  },
]

export function mockListGridProvinceAll() {
  return {
    code: 200,
    message: 'success',
    data: provinces,
  }
}

export function mockListGridCityByProvinceId(provinceId) {
  return {
    code: 200,
    message: 'success',
    data: cities.filter((item) => item.provinceId === provinceId),
  }
}

export function mockListGridCityAll() {
  return {
    code: 200,
    message: 'success',
    data: cities,
  }
}

export function getGridCityCount() {
  return cities.length
}
