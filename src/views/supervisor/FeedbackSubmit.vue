<script setup>
import { computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { ChatLineRound, Location, Upload } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { saveAqiFeedback } from '../../api/aqiFeedback'
import SupervisorShell from '../../components/SupervisorShell.vue'
import { getSupervisorUser } from '../../utils/auth'
import { getAqiLevel } from '../../utils/aqi'

const router = useRouter()

const districtOptions = [
  { label: '朝阳区', value: 'chaoyang' },
  { label: '海淀区', value: 'haidian' },
  { label: '丰台区', value: 'fengtai' },
]

const form = reactive({
  district: '',
  aqi: 80,
  content: '',
})

const selectedDistrictName = computed(() => {
  return districtOptions.find((item) => item.value === form.district)?.label || ''
})

const aqiLevel = computed(() => getAqiLevel(form.aqi))

async function submitFeedback() {
  const user = getSupervisorUser()

  if (!user) {
    ElMessage.warning('请先登录公众监督员账号')
    router.push('/supervisor/login')
    return
  }

  if (!form.district || !form.content.trim()) {
    ElMessage.warning('请选择网格地址并填写反馈内容')
    return
  }

  const payload = {
    supervisorId: user.id,
    supervisorName: user.realName,
    provinceId: 'beijing',
    provinceName: '北京市',
    cityId: form.district,
    cityName: selectedDistrictName.value,
    estimatedAqi: form.aqi,
    level: aqiLevel.value.text,
    description: form.content.trim(),
  }

  const result = await saveAqiFeedback(payload)

  if (result.code !== 200) {
    ElMessage.error(result.message)
    return
  }

  console.log('空气质量反馈表单数据:', result.data)
  ElMessage.success(result.message)
  form.district = ''
  form.aqi = 80
  form.content = ''
  router.push('/supervisor/history')
}
</script>

<template>
  <SupervisorShell title="提交所在网格空气情况">
    <el-form class="feedback-form" label-position="top">
      <el-form-item label="网格地址">
        <el-select
          v-model="form.district"
          class="field-control"
          placeholder="请选择所在区域"
          size="large"
        >
          <el-option
            v-for="item in districtOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="空气质量指数等级">
        <div class="slider-panel">
          <div class="aqi-summary">
            <span class="aqi-number">{{ form.aqi }}</span>
            <span class="aqi-level" :style="{ color: aqiLevel.color }">
              {{ aqiLevel.text }}
            </span>
          </div>
          <el-slider
            v-model="form.aqi"
            :min="0"
            :max="500"
            :step="1"
            show-input
            class="aqi-slider"
          />
        </div>
      </el-form-item>

      <el-form-item label="反馈内容">
        <el-input
          v-model="form.content"
          class="field-control"
          type="textarea"
          :rows="5"
          maxlength="300"
          show-word-limit
          resize="none"
          placeholder="请描述附近空气情况，例如异味、扬尘、烟雾或其他观察到的问题"
        />
      </el-form-item>

      <el-button
        class="submit-button"
        type="primary"
        size="large"
        @click="submitFeedback"
      >
        <el-icon><Upload /></el-icon>
        提交反馈
      </el-button>
    </el-form>

    <el-footer class="page-footer">
      <div class="footer-item">
        <el-icon><Location /></el-icon>
        <span>{{ selectedDistrictName || '未选择网格' }}</span>
      </div>
      <div class="footer-item">
        <el-icon><ChatLineRound /></el-icon>
        <span>反馈将用于空气质量巡查</span>
      </div>
    </el-footer>
  </SupervisorShell>
</template>

<style scoped>
.feedback-form {
  padding: 24px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 50px rgba(31, 45, 61, 0.08);
}

.field-control {
  width: 100%;
}

.slider-panel {
  width: 100%;
  padding: 18px 18px 10px;
  border-radius: 8px;
  background: #f8fafc;
}

.aqi-summary {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}

.aqi-number {
  color: #1f2d3d;
  font-size: 32px;
  font-weight: 800;
  line-height: 1;
}

.aqi-level {
  font-size: 15px;
  font-weight: 700;
}

.aqi-slider {
  --el-slider-main-bg-color: #409eff;
}

.submit-button {
  width: 100%;
  margin-top: 6px;
  font-weight: 700;
}

.submit-button .el-icon {
  margin-right: 6px;
}

.page-footer {
  display: flex;
  height: auto;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 0 0;
  color: #667085;
  font-size: 13px;
}

.footer-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

@media (max-width: 480px) {
  .feedback-form {
    padding: 18px 14px;
  }

  .slider-panel {
    padding: 16px 12px 8px;
  }

  .aqi-slider :deep(.el-slider__runway.show-input) {
    margin-right: 0;
  }

  .aqi-slider :deep(.el-slider__input) {
    width: 96px;
    margin-top: 12px;
    margin-left: 0;
  }

  .aqi-slider :deep(.el-slider__runway.show-input + .el-slider__input) {
    display: block;
  }

  .page-footer {
    flex-direction: column;
  }
}
</style>
