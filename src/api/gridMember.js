import {
  mockListGridMemberByProvinceId,
  mockLoginGridMember,
} from '../mock/gridMember'

export async function loginGridMember(payload) {
  return mockLoginGridMember(payload)
}

export async function listGridMemberByProvinceId(filters) {
  return mockListGridMemberByProvinceId(filters)
}
