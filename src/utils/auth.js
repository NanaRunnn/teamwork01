const SUPERVISOR_USER_KEY = 'nep_supervisor_user'
const ADMIN_USER_KEY = 'nep_admin_user'
const GRID_USER_KEY = 'nep_grid_user'

function readUser(key) {
  const raw = localStorage.getItem(key)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    localStorage.removeItem(key)
    return null
  }
}

function writeUser(key, user) {
  localStorage.setItem(key, JSON.stringify(user))
}

export function getSupervisorUser() {
  return readUser(SUPERVISOR_USER_KEY)
}

export function setSupervisorUser(user) {
  writeUser(SUPERVISOR_USER_KEY, user)
}

export function clearSupervisorUser() {
  localStorage.removeItem(SUPERVISOR_USER_KEY)
}

export function getAdminUser() {
  return readUser(ADMIN_USER_KEY)
}

export function setAdminUser(user) {
  writeUser(ADMIN_USER_KEY, user)
}

export function clearAdminUser() {
  localStorage.removeItem(ADMIN_USER_KEY)
}

export function getGridUser() {
  return readUser(GRID_USER_KEY)
}

export function setGridUser(user) {
  writeUser(GRID_USER_KEY, user)
}

export function clearGridUser() {
  localStorage.removeItem(GRID_USER_KEY)
}

export function clearAllUsers() {
  clearSupervisorUser()
  clearAdminUser()
  clearGridUser()
}
