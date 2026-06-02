<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { listAqiFeedbackBySupervisorId } from '../../api/aqiFeedback'
import SupervisorShell from '../../components/SupervisorShell.vue'
import { getSupervisorUser } from '../../utils/auth'
import { getAqiLevel } from '../../utils/aqi'

const router = useRouter()
const feedbacks = ref([])

const statusMap = {
  0: { text: '未处理', type: 'info' },
  1: { text: '已指派', type: 'warning' },
  2: { text: '已确认', type: 'success' },
}

onMounted(async () => {
  const user = getSupervisorUser()

  if (!user) {
    ElMessage.warning('请先登录公众监督员账号')
    router.push('/supervisor/login')
    return
  }

  const result = await listAqiFeedbackBySupervisorId(user.id)
  feedbacks.value = result.data || []
})
</script>

<template>
  <SupervisorShell title="历史反馈" :narrow="false">
    <section class="history-panel">
      <div class="toolbar">
        <p>共 {{ feedbacks.length }} 条反馈记录</p>
        <el-button type="primary" @click="$router.push('/supervisor/feedback')">
          提交新反馈
        </el-button>
      </div>

      <el-table
        v-if="feedbacks.length"
        :data="feedbacks"
        class="history-table"
        border
      >
        <el-table-column prop="cityName" label="网格地址" min-width="110" />
        <el-table-column label="预估 AQI" min-width="120">
          <template #default="{ row }">
            <span class="aqi-text" :style="{ color: getAqiLevel(row.estimatedAqi).color }">
              {{ row.estimatedAqi }} / {{ getAqiLevel(row.estimatedAqi).text }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="反馈内容" min-width="220" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusMap[row.status]?.type || 'info'">
              {{ statusMap[row.status]?.text || '未知' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="提交时间" min-width="170" />
      </el-table>

      <el-empty v-else description="暂无历史反馈">
        <el-button type="primary" @click="$router.push('/supervisor/feedback')">
          去提交反馈
        </el-button>
      </el-empty>
    </section>
  </SupervisorShell>
</template>

<style scoped>
.history-panel {
  padding: 24px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 50px rgba(31, 45, 61, 0.08);
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.toolbar p {
  margin: 0;
  color: #667085;
  font-size: 14px;
}

.history-table {
  width: 100%;
}

.aqi-text {
  font-weight: 700;
}

@media (max-width: 640px) {
  .history-panel {
    padding: 18px 14px;
  }

  .toolbar {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
