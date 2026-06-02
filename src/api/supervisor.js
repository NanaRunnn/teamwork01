import {
  mockLoginSupervisor,
  mockRegisterSupervisor,
} from '../mock/supervisor'

export async function registerSupervisor(payload) {
  return mockRegisterSupervisor(payload)
}

export async function loginSupervisor(payload) {
  return mockLoginSupervisor(payload)
}
