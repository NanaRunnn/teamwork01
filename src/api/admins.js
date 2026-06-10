import { mockLoginAdmin } from '../mock/admins'
import request, { useRealApi } from './request'
import { normalizeUser } from './normalizers'

export async function loginAdmin(payload) {
  if (useRealApi) {
    const result = await request.post('/admins/getAdminsByCode', payload)
    return {
      ...result,
      data: normalizeUser({
        ...result.data,
        role: 'admin',
      }),
    }
  }

  return mockLoginAdmin(payload)
}
