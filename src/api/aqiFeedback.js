import {
  mockAssignAqiFeedback,
  mockConfirmAqiFeedback,
  mockGetAqiFeedbackById,
  mockListAqiFeedbackAll,
  mockListAqiFeedbackByGridMemberId,
  mockListAqiFeedbackBySupervisorId,
  mockSaveAqiFeedback,
} from '../mock/feedback'
import request, { useRealApi } from './request'
import { normalizeFeedback, normalizeFeedbackList } from './normalizers'

export async function saveAqiFeedback(payload) {
  if (useRealApi) {
    const result = await request.post('/aqiFeedback/saveAqiFeedback', {
      supervisorId: payload.supervisorId,
      provinceId: payload.provinceId,
      cityId: payload.cityId,
      estimatedAqi: payload.estimatedAqi,
      description: payload.description,
    })

    return {
      ...result,
      data: normalizeFeedback({
        ...payload,
        ...result.data,
      }),
    }
  }

  return mockSaveAqiFeedback(payload)
}

export async function listAqiFeedbackBySupervisorId(supervisorId) {
  if (useRealApi) {
    const result = await request.get('/aqiFeedback/listAqiFeedbackBySupervisorId', {
      params: {
        supervisorId,
      },
    })

    return {
      ...result,
      data: normalizeFeedbackList(result.data || []),
    }
  }

  return mockListAqiFeedbackBySupervisorId(supervisorId)
}

export async function listAqiFeedbackAll(filters) {
  if (useRealApi) {
    const result = await request.get('/aqiFeedback/listAqiFeedbackAll', {
      params: filters,
    })

    return {
      ...result,
      data: normalizeFeedbackList(result.data || []),
    }
  }

  return mockListAqiFeedbackAll(filters)
}

export async function getAqiFeedbackById(id) {
  if (useRealApi) {
    const result = await listAqiFeedbackAll({})
    const feedback = (result.data || []).find((item) => item.id === id)

    if (!feedback) {
      return {
        code: 404,
        message: '未找到反馈信息',
        data: null,
      }
    }

    return {
      code: 200,
      message: 'success',
      data: normalizeFeedback(feedback),
    }
  }

  return mockGetAqiFeedbackById(id)
}

export async function assignAqiFeedback(payload) {
  if (useRealApi) {
    const result = await request.post('/aqiFeedback/updateAqiFeedbackAssign', {
      feedbackId: payload.feedbackId,
      gridMemberId: payload.gridMemberId,
      status: 1,
    })

    return {
      ...result,
      data: result.data
        ? normalizeFeedback({
            ...result.data,
            gridMemberName: payload.gridMemberName,
          })
        : result.data,
    }
  }

  return mockAssignAqiFeedback(payload)
}

export async function listAqiFeedbackByGridMemberId(gridMemberId) {
  if (useRealApi) {
    const result = await request.get('/aqiFeedback/listAqiFeedbackByGridMemberId', {
      params: {
        gridMemberId,
      },
    })

    return {
      ...result,
      data: normalizeFeedbackList(result.data || []),
    }
  }

  return mockListAqiFeedbackByGridMemberId(gridMemberId)
}

export async function confirmAqiFeedback(payload) {
  if (useRealApi) {
    return {
      code: 200,
      message: '确认成功',
      data: normalizeFeedback({
        ...payload,
        status: 2,
      }),
    }
  }

  return mockConfirmAqiFeedback(payload)
}
