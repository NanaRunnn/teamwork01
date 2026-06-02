const admins = [
  {
    id: 'A001',
    code: 'admin',
    password: '123456',
    realName: '系统管理员',
    role: 'admin',
  },
]

function removePassword(user) {
  const { password, ...safeUser } = user
  return safeUser
}

export function mockLoginAdmin(payload) {
  const user = admins.find(
    (item) => item.code === payload.code && item.password === payload.password,
  )

  if (!user) {
    return {
      code: 400,
      message: '管理员编码或密码错误',
      data: null,
    }
  }

  return {
    code: 200,
    message: '登录成功',
    data: removePassword(user),
  }
}
