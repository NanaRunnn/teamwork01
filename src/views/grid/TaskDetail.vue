<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { getAqiFeedbackById } from '../../api/aqiFeedback'
import GridShell from '../../components/GridShell.vue'
import { getGridUser } from '../../utils/auth'
import { getAqiLevel } from '../../utils/aqi'

const route = useRoute()
const router = useRouter()
const task = ref(null)

onMounted(async () => {
  if (!getGridUser()) {
    ElMessage.warning('请先登录网格员账号')
    router.push('/grid/login')
    return
  }

  const result = await getAqiFeedbackById(route.params.id)

  if (result.code !== 200) {
    ElMessage.error(result.message)
    router.push('/grid/tasks')
    return
  }

  task.value = result.data
})
</script>

<template>
  <GridShell title="任务详情" narrow>
    <section v-if="task" class="detail-panel">
      <p class="label">反馈信息</p>
      <h2>{{ task.cityName }}</h2>
      <p class="description">{{ task.description }}</p>

      <div class="info-grid">
        <div>
          <span>公众监督员</span>
          <strong>{{ task.supervisorName }}</strong>
        </div>
        <div>
          <span>预估 AQI</span>
          <strong :style="{ color: getAqiLevel(task.estimatedAqi).color }">
            {{ task.estimatedAqi }} / {{ getAqiLevel(task.estimatedAqi).text }}
          </strong>
        </div>
        <div>
          <span>指派网格员</span>
          <strong>{{ task.gridMemberName }}</strong>
        </div>
        <div>
          <span>提交时间</span>
          <strong>{{ task.createTime }}</strong>
        </div>
      </div>

      <div class="actions">
        <el-button @click="$router.push('/grid/tasks')">返回任务列表</el-button>
        <el-button
          v-if="task.status === 1"
          type="primary"
          @click="$router.push(`/grid/confirm/${task.id}`)"
        >
          提交检测数据
        </el-button>
      </div>
    </section>
  </GridShell>
</template>

<style scoped>
.detail-panel {
  padding: 24px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 50px rgba(31, 45, 61, 0.08);
}

.label {
  margin: 0 0 8px;
  color: #409eff;
  font-size: 13px;
  font-weight: 700;
}

h2 {
  margin: 0 0 10px;
  color: #1f2d3d;
  font-size: 24px;
}

.description {
  margin: 0 0 20px;
  color: #344054;
  line-height: 1.7;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 24px;
}

.info-grid div {
  padding: 14px;
  border-radius: 8px;
  background: #f8fafc;
}

.info-grid span {
  display: block;
  margin-bottom: 6px;
  color: #667085;
  font-size: 13px;
}

.info-grid strong {
  color: #1f2d3d;
  font-size: 15px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

@media (max-width: 560px) {
  .detail-panel {
    padding: 18px 14px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .actions {
    align-items: stretch;
    flex-direction: column-reverse;
  }

  .actions .el-button {
    width: 100%;
    margin-left: 0;
  }
}
</style>
