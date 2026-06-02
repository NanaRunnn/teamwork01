<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { listAqiFeedbackAll } from '../../api/aqiFeedback'
import AdminShell from '../../components/AdminShell.vue'
import { getAdminUser } from '../../utils/auth'
import { getAqiLevel } from '../../utils/aqi'

const router = useRouter()
const feedbacks = ref([])
const statusFilter = ref('')

const statusMap = {
  0: { text: '未处理', type: 'info' },
  1: { text: '已指派', type: 'warning' },
  2: { text: '已确认', type: 'success' },
}

async function loadFeedbacks() {
  const result = await listAqiFeedbackAll({
    status: statusFilter.value,
  })

  feedbacks.value = result.data || []
}

function goAssign(row) {
  router.push(`/admin/assign/${row.id}`)
}

onMounted(async () => {
  if (!getAdminUser()) {
    ElMessage.warning('请先登录管理员账号')
    router.push('/admin/login')
    return
  }

  await loadFeedbacks()
})
</script>

<template>
  <AdminShell title="公众反馈管理">
    <section class="manage-panel">
      <div class="toolbar">
        <div>
          <p class="count">共 {{ feedbacks.length }} 条反馈记录</p>
        </div>
        <div class="toolbar-actions">
          <el-button @click="$router.push('/admin/statistics')">统计管理</el-button>
          <el-select
            v-model="statusFilter"
            class="status-select"
            placeholder="全部状态"
            @change="loadFeedbacks"
          >
            <el-option label="全部状态" value="" />
            <el-option label="未处理" :value="0" />
            <el-option label="已指派" :value="1" />
            <el-option label="已确认" :value="2" />
          </el-select>
        </div>
      </div>

      <el-table
        v-if="feedbacks.length"
        :data="feedbacks"
        class="feedback-table"
        border
      >
        <el-table-column prop="cityName" label="网格地址" min-width="110" />
        <el-table-column prop="supervisorName" label="监督员" min-width="110" />
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
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="row.status === 0"
              type="primary"
              size="small"
              @click="goAssign(row)"
            >
              指派
            </el-button>
            <span v-else class="assigned-text">{{ row.gridMemberName || '已处理' }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-else description="暂无反馈数据">
        <el-button type="primary" @click="$router.push('/supervisor/feedback')">
          去公众端提交一条
        </el-button>
      </el-empty>
    </section>
  </AdminShell>
</template>

<style scoped>
.manage-panel {
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

.count {
  margin: 0;
  color: #667085;
  font-size: 14px;
}

.status-select {
  width: 160px;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.feedback-table {
  width: 100%;
}

.aqi-text {
  font-weight: 700;
}

.assigned-text {
  color: #667085;
  font-size: 13px;
}

@media (max-width: 640px) {
  .manage-panel {
    padding: 18px 14px;
  }

  .toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .status-select {
    width: 100%;
  }

  .toolbar-actions {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
