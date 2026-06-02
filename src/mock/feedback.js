const FEEDBACK_KEY = 'nep_mock_feedbacks'

function readFeedbacks() {
  const raw = localStorage.getItem(FEEDBACK_KEY)

  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw)
  } catch {
    localStorage.removeItem(FEEDBACK_KEY)
    return []
  }
}

function writeFeedbacks(feedbacks) {
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbacks))
}

export function mockSaveAqiFeedback(payload) {
  const feedbacks = readFeedbacks()
  const feedback = {
    id: `F${Date.now()}`,
    ...payload,
    status: 0,
    createTime: new Date().toLocaleString('zh-CN', { hour12: false }),
  }

  feedbacks.unshift(feedback)
  writeFeedbacks(feedbacks)

  return {
    code: 200,
    message: '反馈提交成功',
    data: feedback,
  }
}

export function mockListAqiFeedbackBySupervisorId(supervisorId) {
  const feedbacks = readFeedbacks().filter(
    (item) => item.supervisorId === supervisorId,
  )

  return {
    code: 200,
    message: 'success',
    data: feedbacks,
  }
}

export function mockListAqiFeedbackAll(filters = {}) {
  let feedbacks = readFeedbacks()

  if (filters.status !== '' && filters.status !== undefined && filters.status !== null) {
    feedbacks = feedbacks.filter((item) => Number(item.status) === Number(filters.status))
  }

  return {
    code: 200,
    message: 'success',
    data: feedbacks,
  }
}

export function mockListAqiFeedbackByGridMemberId(gridMemberId) {
  const feedbacks = readFeedbacks().filter(
    (item) => item.gridMemberId === gridMemberId,
  )

  return {
    code: 200,
    message: 'success',
    data: feedbacks,
  }
}

export function mockGetAqiFeedbackById(id) {
  const feedback = readFeedbacks().find((item) => item.id === id)

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
    data: feedback,
  }
}

export function mockAssignAqiFeedback(payload) {
  const feedbacks = readFeedbacks()
  const target = feedbacks.find((item) => item.id === payload.feedbackId)

  if (!target) {
    return {
      code: 404,
      message: '未找到反馈信息',
      data: null,
    }
  }

  Object.assign(target, {
    gridMemberId: payload.gridMemberId,
    gridMemberName: payload.gridMemberName,
    status: 1,
    assignTime: new Date().toLocaleString('zh-CN', { hour12: false }),
  })

  writeFeedbacks(feedbacks)

  return {
    code: 200,
    message: '指派成功',
    data: target,
  }
}

export function mockConfirmAqiFeedback(payload) {
  const feedbacks = readFeedbacks()
  const target = feedbacks.find((item) => item.id === payload.feedbackId)

  if (!target) {
    return {
      code: 404,
      message: '未找到反馈信息',
      data: null,
    }
  }

  Object.assign(target, {
    status: 2,
    confirmTime: payload.confirmTime,
    confirmedAqi: payload.aqi,
  })

  writeFeedbacks(feedbacks)

  return {
    code: 200,
    message: '确认成功',
    data: target,
  }
}
