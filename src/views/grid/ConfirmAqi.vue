<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import {
  confirmAqiFeedback,
  getAqiFeedbackById,
} from '../../api/aqiFeedback'
import { saveStatistics } from '../../api/statistics'
import GridShell from '../../components/GridShell.vue'
import { getGridUser } from '../../utils/auth'
import { getAqiLevel } from '../../utils/aqi'

const route = useRoute()
const router = useRouter()
const task = ref(null)

const form = reactive({
  so2: 20,
  co: 0.8,
  pm25: 60,
  aqi: 90,
})

const aqiLevel = computed(() => getAqiLevel(Number(form.aqi)))

function isValidNumber(value) {
  return value !== '' && value !== null && value !== undefined && !Number.isNaN(Number(value))
}

async function submitConfirm() {
  const user = getGridUser()

  if (!user) {
    ElMessage.warning('请先登录网格员账号')
    router.push('/grid/login')
    return
  }

  if (![form.so2, form.co, form.pm25, form.aqi].every(isValidNumber)) {
    ElMessage.warning('请完整填写检测数据')
    return
  }

  const confirmTime = new Date().toLocaleString('zh-CN', { hour12: false })
  const payload = {
    feedbackId: task.value.id,
    gridMemberId: user.id,
    gridMemberName: user.realName,
    provinceId: task.value.provinceId,
    provinceName: task.value.provinceName,
    cityId: task.value.cityId,
    cityName: task.value.cityName,
    so2: Number(form.so2),
    co: Number(form.co),
    pm25: Number(form.pm25),
    aqi: Number(form.aqi),
    confirmTime,
  }

  const statisticsResult = await saveStatistics(payload)

  if (statisticsResult.code !== 200) {
    ElMessage.error(statisticsResult.message)
    return
  }

  const feedbackResult = await confirmAqiFeedback(payload)

  if (feedbackResult.code !== 200) {
    ElMessage.error(feedbackResult.message)
    return
  }

  ElMessage.success(statisticsResult.message)
  router.push('/grid/tasks')
}

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
  <GridShell title="AQI 检测确认" narrow>
    <section v-if="task" class="confirm-panel">
      <div class="task-summary">
        <p class="label">当前任务</p>
        <h2>{{ task.cityName }}</h2>
        <p>{{ task.description }}</p>
      </div>

      <el-form label-position="top">
        <el-form-item label="SO2 浓度">
          <el-input-number v-model="form.so2" :min="0" :precision="1" class="number-input" />
        </el-form-item>

        <el-form-item label="CO 浓度">
          <el-input-number v-model="form.co" :min="0" :precision="1" class="number-input" />
        </el-form-item>

        <el-form-item label="PM2.5 浓度">
          <el-input-number v-model="form.pm25" :min="0" :precision="1" class="number-input" />
        </el-form-item>

        <el-form-item label="实测 AQI">
          <div class="aqi-field">
            <el-input-number
              v-model="form.aqi"
              :min="0"
              :max="500"
              :precision="0"
              class="number-input"
            />
            <span class="aqi-level" :style="{ color: aqiLevel.color }">
              {{ aqiLevel.text }}
            </span>
          </div>
        </el-form-item>

        <div class="actions">
          <el-button @click="$router.push('/grid/tasks')">返回任务列表</el-button>
          <el-button type="primary" @click="submitConfirm">提交检测数据</el-button>
        </div>
      </el-form>
    </section>
  </GridShell>
</template>

<style scoped>
.confirm-panel {
  padding: 24px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 50px rgba(31, 45, 61, 0.08);
}

.task-summary {
  margin-bottom: 22px;
  padding: 18px;
  border-radius: 8px;
  background: #f8fafc;
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
  font-size: 22px;
}

.task-summary p:last-child {
  margin: 0;
  color: #344054;
  line-height: 1.7;
}

.number-input {
  width: 100%;
}

.aqi-field {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
}

.aqi-level {
  min-width: 80px;
  font-weight: 700;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 22px;
}

@media (max-width: 480px) {
  .confirm-panel {
    padding: 18px 14px;
  }

  .aqi-field {
    align-items: stretch;
    flex-direction: column;
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
