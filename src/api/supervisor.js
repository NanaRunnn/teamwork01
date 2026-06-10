import {
  mockLoginSupervisor,
  mockRegisterSupervisor,
} from '../mock/supervisor'
import request, { useRealApi } from './request'
import { normalizeUser } from './normalizers'

export async function registerSupervisor(payload) {
  if (useRealApi) {
    const result = await request.post('/supervisor/saveSupervisor', payload)
    return {
      ...result,
      data: normalizeUser(result.data),
    }
  }

  return mockRegisterSupervisor(payload)
}

export async function loginSupervisor(payload) {
  if (useRealApi) {
    const result = await request.post('/supervisor/login', payload)
    return {
      ...result,
      data: normalizeUser({
        ...result.data,
        role: 'supervisor',
      }),
    }
  }

  return mockLoginSupervisor(payload)
}
