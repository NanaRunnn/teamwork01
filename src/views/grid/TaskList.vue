<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { listAqiFeedbackByGridMemberId } from '../../api/aqiFeedback'
import GridShell from '../../components/GridShell.vue'
import { getGridUser } from '../../utils/auth'
import { getAqiLevel } from '../../utils/aqi'

const router = useRouter()
const tasks = ref([])

const statusMap = {
  1: { text: '待检测', type: 'warning' },
  2: { text: '已确认', type: 'success' },
}

async function loadTasks() {
  const user = getGridUser()

  if (!user) {
    ElMessage.warning('请先登录网格员账号')
    router.push('/grid/login')
    return
  }

  const result = await listAqiFeedbackByGridMemberId(user.id)
  tasks.value = result.data || []
}

onMounted(loadTasks)
</script>

<template>
  <GridShell title="指派任务列表">
    <section class="task-panel">
      <div class="toolbar">
        <p>共 {{ tasks.length }} 条指派任务</p>
      </div>

      <el-table v-if="tasks.length" :data="tasks" class="task-table" border>
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
        <el-table-column prop="assignTime" label="指派时间" min-width="170" />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="$router.push(`/grid/task/${row.id}`)">
              详情
            </el-button>
            <el-button
              v-if="row.status === 1"
              type="primary"
              size="small"
              @click="$router.push(`/grid/confirm/${row.id}`)"
            >
              去检测
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-else description="暂无指派任务">
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
      </el-empty>
    </section>
  </GridShell>
</template>

<style scoped>
.task-panel {
  padding: 24px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 50px rgba(31, 45, 61, 0.08);
}

.toolbar {
  margin-bottom: 18px;
}

.toolbar p {
  margin: 0;
  color: #667085;
  font-size: 14px;
}

.task-table {
  width: 100%;
}

.aqi-text {
  font-weight: 700;
}

@media (max-width: 640px) {
  .task-panel {
    padding: 18px 14px;
  }
}
</style>
