const USER_KEY = 'nep_supervisor_user'

export function getSupervisorUser() {
  const raw = localStorage.getItem(USER_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

export function setSupervisorUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSupervisorUser() {
  localStorage.removeItem(USER_KEY)
}
