import {
  mockListAqiFeedbackBySupervisorId,
  mockSaveAqiFeedback,
} from '../mock/feedback'

export async function saveAqiFeedback(payload) {
  return mockSaveAqiFeedback(payload)
}

export async function listAqiFeedbackBySupervisorId(supervisorId) {
  return mockListAqiFeedbackBySupervisorId(supervisorId)
}
