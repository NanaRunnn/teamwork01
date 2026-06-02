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
