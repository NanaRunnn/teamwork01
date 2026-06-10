import {
  mockListGridMemberByProvinceId,
  mockLoginGridMember,
} from '../mock/gridMember'
import request, { useRealApi } from './request'
import { normalizeUser } from './normalizers'

export async function loginGridMember(payload) {
  if (useRealApi) {
    const result = await request.post('/gridMember/login', payload)
    return {
      ...result,
      data: normalizeUser({
        ...result.data,
        role: 'grid',
      }),
    }
  }

  return mockLoginGridMember(payload)
}

export async function listGridMemberByProvinceId(filters) {
  if (useRealApi) {
    return request.get('/gridMember/listGridMemberByProvinceId', {
      params: filters,
    })
  }

  return mockListGridMemberByProvinceId(filters)
}
