const SUPERVISOR_KEY = 'nep_mock_supervisors'

const defaultSupervisors = [
  {
    id: 'S001',
    phone: '13800138000',
    password: '123456',
    realName: '张三',
    role: 'supervisor',
  },
]

function readSupervisors() {
  const raw = localStorage.getItem(SUPERVISOR_KEY)

  if (!raw) {
    localStorage.setItem(SUPERVISOR_KEY, JSON.stringify(defaultSupervisors))
    return [...defaultSupervisors]
  }

  try {
    return JSON.parse(raw)
  } catch {
    localStorage.setItem(SUPERVISOR_KEY, JSON.stringify(defaultSupervisors))
    return [...defaultSupervisors]
  }
}

function writeSupervisors(supervisors) {
  localStorage.setItem(SUPERVISOR_KEY, JSON.stringify(supervisors))
}

function removePassword(user) {
  const { password, ...safeUser } = user
  return safeUser
}

export function mockRegisterSupervisor(payload) {
  const supervisors = readSupervisors()
  const exists = supervisors.some((item) => item.phone === payload.phone)

  if (exists) {
    return {
      code: 400,
      message: '该手机号已注册',
      data: null,
    }
  }

  const user = {
    id: `S${Date.now()}`,
    phone: payload.phone,
    password: payload.password,
    realName: payload.realName,
    role: 'supervisor',
  }

  supervisors.push(user)
  writeSupervisors(supervisors)

  return {
    code: 200,
    message: '注册成功',
    data: removePassword(user),
  }
}

export function mockLoginSupervisor(payload) {
  const supervisors = readSupervisors()
  const user = supervisors.find(
    (item) => item.phone === payload.phone && item.password === payload.password,
  )

  if (!user) {
    return {
      code: 400,
      message: '手机号或密码错误',
      data: null,
    }
  }

  return {
    code: 200,
    message: '登录成功',
    data: removePassword(user),
  }
}
