<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import {
  assignAqiFeedback,
  getAqiFeedbackById,
} from '../../api/aqiFeedback'
import { listGridMemberByProvinceId } from '../../api/gridMember'
import AdminShell from '../../components/AdminShell.vue'
import { getAdminUser } from '../../utils/auth'
import { getAqiLevel } from '../../utils/aqi'

const route = useRoute()
const router = useRouter()
const feedback = ref(null)
const gridMembers = ref([])
const selectedGridMemberId = ref('')

const selectedGridMember = computed(() => {
  return gridMembers.value.find((item) => item.id === selectedGridMemberId.value)
})

async function loadData() {
  const feedbackResult = await getAqiFeedbackById(route.params.id)

  if (feedbackResult.code !== 200) {
    ElMessage.error(feedbackResult.message)
    router.push('/admin/feedbacks')
    return
  }

  feedback.value = feedbackResult.data

  const membersResult = await listGridMemberByProvinceId({
    provinceId: feedback.value.provinceId,
    cityId: feedback.value.cityId,
  })

  gridMembers.value = membersResult.data || []
}

async function submitAssign() {
  if (!selectedGridMember.value) {
    ElMessage.warning('请选择网格员')
    return
  }

  const result = await assignAqiFeedback({
    feedbackId: feedback.value.id,
    gridMemberId: selectedGridMember.value.id,
    gridMemberName: selectedGridMember.value.realName,
  })

  if (result.code !== 200) {
    ElMessage.error(result.message)
    return
  }

  ElMessage.success(result.message)
  router.push('/admin/feedbacks')
}

onMounted(async () => {
  if (!getAdminUser()) {
    ElMessage.warning('请先登录管理员账号')
    router.push('/admin/login')
    return
  }

  await loadData()
})
</script>

<template>
  <AdminShell title="指派网格员" narrow>
    <section v-if="feedback" class="assign-panel">
      <div class="feedback-card">
        <p class="label">反馈详情</p>
        <h2>{{ feedback.cityName }}</h2>
        <p class="description">{{ feedback.description }}</p>
        <div class="meta-row">
          <span>监督员：{{ feedback.supervisorName }}</span>
          <span :style="{ color: getAqiLevel(feedback.estimatedAqi).color }">
            AQI：{{ feedback.estimatedAqi }} / {{ getAqiLevel(feedback.estimatedAqi).text }}
          </span>
        </div>
      </div>

      <el-form label-position="top">
        <el-form-item label="选择可用网格员">
          <el-radio-group v-model="selectedGridMemberId" class="member-list">
            <el-radio
              v-for="member in gridMembers"
              :key="member.id"
              :label="member.id"
              border
            >
              {{ member.realName }}（{{ member.code }} / {{ member.cityName || feedback.cityName }}）
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-empty v-if="!gridMembers.length" description="暂无可用网格员" />

        <div class="actions">
          <el-button @click="$router.push('/admin/feedbacks')">返回列表</el-button>
          <el-button type="primary" @click="submitAssign">确认指派</el-button>
        </div>
      </el-form>
    </section>
  </AdminShell>
</template>

<style scoped>
.assign-panel {
  padding: 24px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 50px rgba(31, 45, 61, 0.08);
}

.feedback-card {
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

.description {
  margin: 0 0 14px;
  color: #344054;
  line-height: 1.7;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  color: #667085;
  font-size: 14px;
}

.member-list {
  display: grid;
  width: 100%;
  gap: 10px;
}

.member-list :deep(.el-radio) {
  height: auto;
  margin-right: 0;
  padding: 12px 14px;
  white-space: normal;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 22px;
}

@media (max-width: 480px) {
  .assign-panel {
    padding: 18px 14px;
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
