import {
  mockAssignAqiFeedback,
  mockGetAqiFeedbackById,
  mockListAqiFeedbackAll,
  mockListAqiFeedbackBySupervisorId,
  mockSaveAqiFeedback,
} from '../mock/feedback'

export async function saveAqiFeedback(payload) {
  return mockSaveAqiFeedback(payload)
}

export async function listAqiFeedbackBySupervisorId(supervisorId) {
  return mockListAqiFeedbackBySupervisorId(supervisorId)
}

export async function listAqiFeedbackAll(filters) {
  return mockListAqiFeedbackAll(filters)
}

export async function getAqiFeedbackById(id) {
  return mockGetAqiFeedbackById(id)
}

export async function assignAqiFeedback(payload) {
  return mockAssignAqiFeedback(payload)
}
