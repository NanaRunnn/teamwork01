<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ChatLineRound, Location, Upload } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { saveAqiFeedback } from '../../api/aqiFeedback'
import { listGridCityByProvinceId } from '../../api/gridCity'
import { listGridProvinceAll } from '../../api/gridProvince'
import SupervisorShell from '../../components/SupervisorShell.vue'
import { getSupervisorUser } from '../../utils/auth'
import { getAqiLevel } from '../../utils/aqi'

const router = useRouter()
const provinceOptions = ref([])
const cityOptions = ref([])
const cityLoading = ref(false)

const form = reactive({
  provinceId: '',
  cityId: '',
  aqi: 80,
  content: '',
})

const selectedProvince = computed(() => {
  return provinceOptions.value.find((item) => item.id === form.provinceId)
})

const selectedCity = computed(() => {
  return cityOptions.value.find((item) => item.id === form.cityId)
})

const aqiLevel = computed(() => getAqiLevel(form.aqi))

async function loadProvinces() {
  const result = await listGridProvinceAll()
  provinceOptions.value = result.data || []

  if (provinceOptions.value.length && !form.provinceId) {
    form.provinceId = provinceOptions.value[0].id
    await loadCities()
  }
}

async function loadCities() {
  form.cityId = ''

  if (!form.provinceId) {
    cityOptions.value = []
    return
  }

  cityLoading.value = true
  const result = await listGridCityByProvinceId(form.provinceId)
  cityOptions.value = result.data || []
  cityLoading.value = false
}

async function submitFeedback() {
  const user = getSupervisorUser()

  if (!user) {
    ElMessage.warning('请先登录公众监督员账号')
    router.push('/supervisor/login')
    return
  }

  if (!form.provinceId || !form.cityId || !form.content.trim()) {
    ElMessage.warning('请选择网格地址并填写反馈内容')
    return
  }

  const payload = {
    supervisorId: user.id,
    supervisorName: user.realName,
    provinceId: form.provinceId,
    provinceName: selectedProvince.value?.name || '',
    cityId: form.cityId,
    cityName: selectedCity.value?.name || '',
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
  form.cityId = ''
  form.aqi = 80
  form.content = ''
  router.push('/supervisor/history')
}

onMounted(loadProvinces)
</script>

<template>
  <SupervisorShell title="提交所在网格空气情况">
    <el-form class="feedback-form" label-position="top">
      <el-form-item label="网格地址">
        <div class="region-grid">
          <el-select
            v-model="form.provinceId"
            class="field-control"
            placeholder="请选择省份"
            size="large"
            @change="loadCities"
          >
            <el-option
              v-for="item in provinceOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>

          <el-select
            v-model="form.cityId"
            class="field-control"
            :disabled="!form.provinceId"
            :loading="cityLoading"
            placeholder="请选择网格区域"
            size="large"
          >
            <el-option
              v-for="item in cityOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
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
        <span>{{ selectedCity?.name || '未选择网格' }}</span>
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

.region-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
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

  .region-grid {
    grid-template-columns: 1fr;
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
