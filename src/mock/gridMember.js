const gridMembers = [
  {
    id: 'G001',
    code: 'GM001',
    password: '123456',
    realName: '李四',
    phone: '13900139000',
    provinceId: 'beijing',
    cityId: 'chaoyang',
    cityName: '朝阳区',
    workStatus: 1,
  },
  {
    id: 'G002',
    code: 'GM002',
    password: '123456',
    realName: '王五',
    phone: '13900139001',
    provinceId: 'beijing',
    cityId: 'haidian',
    cityName: '海淀区',
    workStatus: 1,
  },
  {
    id: 'G003',
    code: 'GM003',
    password: '123456',
    realName: '赵六',
    phone: '13900139002',
    provinceId: 'beijing',
    cityId: 'fengtai',
    cityName: '丰台区',
    workStatus: 1,
  },
]

function removePassword(user) {
  const { password, ...safeUser } = user
  return safeUser
}

export function mockLoginGridMember(payload) {
  const user = gridMembers.find(
    (item) => item.code === payload.code && item.password === payload.password,
  )

  if (!user) {
    return {
      code: 400,
      message: '网格员编码或密码错误',
      data: null,
    }
  }

  return {
    code: 200,
    message: '登录成功',
    data: {
      ...removePassword(user),
      role: 'grid',
    },
  }
}

export function mockListGridMemberByProvinceId(filters = {}) {
  const members = gridMembers.filter((item) => {
    const provinceMatched = !filters.provinceId || item.provinceId === filters.provinceId
    const cityMatched = !filters.cityId || item.cityId === filters.cityId

    return provinceMatched && cityMatched && item.workStatus === 1
  })

  return {
    code: 200,
    message: 'success',
    data: members,
  }
}
