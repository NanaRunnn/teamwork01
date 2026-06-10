<script setup>
import { computed, onMounted, ref } from 'vue'
import { Refresh, View } from '@element-plus/icons-vue'
import { listGridCityAll, listGridCityByProvinceId } from '../../api/gridCity'
import { listGridProvinceAll } from '../../api/gridProvince'
import { listStatisticsAll } from '../../api/statistics'
import AdminShell from '../../components/AdminShell.vue'
import { getAqiLevel } from '../../utils/aqi'

const records = ref([])
const provinceOptions = ref([])
const cityOptions = ref([])
const filters = ref({
  provinceId: '',
  cityId: '',
})

const filteredRecords = computed(() => {
  const selectedProvince = provinceOptions.value.find((item) => item.id === filters.value.provinceId)
  const selectedCity = cityOptions.value.find((item) => item.id === filters.value.cityId)

  return records.value.filter((item) => {
    const provinceMatched = !filters.value.provinceId ||
      item.provinceId === filters.value.provinceId ||
      item.provinceName === selectedProvince?.name
    const cityMatched = !filters.value.cityId ||
      item.cityId === filters.value.cityId ||
      item.cityName === selectedCity?.name

    return provinceMatched && cityMatched
  })
})

const averageAqi = computed(() => {
  if (!filteredRecords.value.length) {
    return 0
  }

  const total = filteredRecords.value.reduce((sum, item) => sum + Number(item.aqi || 0), 0)
  return Math.round(total / filteredRecords.value.length)
})

const pm25OverTotal = computed(() => {
  return filteredRecords.value.filter((item) => Number(item.pm25) > 75).length
})

const coveredCityTotal = computed(() => {
  return new Set(filteredRecords.value.map((item) => item.cityId || item.cityName)).size
})

const cityTotals = computed(() => {
  const grouped = filteredRecords.value.reduce((result, item) => {
    const key = item.cityId || item.cityName || 'unknown'

    if (!result[key]) {
      result[key] = {
        cityName: item.cityName || '未知区域',
        total: 0,
        aqiTotal: 0,
        pm25OverTotal: 0,
      }
    }

    result[key].total += 1
    result[key].aqiTotal += Number(item.aqi || 0)

    if (Number(item.pm25) > 75) {
      result[key].pm25OverTotal += 1
    }

    return result
  }, {})

  return Object.values(grouped).map((item) => ({
    ...item,
    averageAqi: Math.round(item.aqiTotal / item.total),
  }))
})

const aqiDistribution = computed(() => {
  const grouped = filteredRecords.value.reduce((result, item) => {
    const level = getAqiLevel(Number(item.aqi || 0)).text
    result[level] = (result[level] || 0) + 1
    return result
  }, {})

  return Object.entries(grouped).map(([level, total]) => ({
    level,
    total,
  }))
})

const metricCards = computed(() => [
  {
    label: '确认记录',
    value: filteredRecords.value.length,
    unit: '条',
  },
  {
    label: '平均 AQI',
    value: averageAqi.value,
    unit: '',
  },
  {
    label: 'PM2.5 超标',
    value: pm25OverTotal.value,
    unit: '次',
  },
  {
    label: '覆盖网格',
    value: coveredCityTotal.value,
    unit: '个',
  },
])

async function loadRecords() {
  const result = await listStatisticsAll()
  records.value = result.data || []
}

async function loadProvinces() {
  const result = await listGridProvinceAll()
  provinceOptions.value = result.data || []
}

async function loadCities() {
  const result = filters.value.provinceId
    ? await listGridCityByProvinceId(filters.value.provinceId)
    : await listGridCityAll()

  cityOptions.value = result.data || []
}

async function handleProvinceChange() {
  filters.value.cityId = ''
  await loadCities()
}

async function refreshData() {
  await Promise.all([loadRecords(), loadProvinces(), loadCities()])
}

onMounted(async () => {
  await refreshData()
})
</script>

<template>
  <AdminShell title="统计数据管理">
    <section class="statistics-panel">
      <div class="toolbar">
        <p>共 {{ filteredRecords.length }} 条 AQI 确认记录</p>
        <div class="toolbar-actions">
          <el-button @click="refreshData">
            <el-icon><Refresh /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="$router.push('/decision/dashboard')">
            <el-icon><View /></el-icon>
            查看决策大屏
          </el-button>
        </div>
      </div>

      <div class="filter-row">
        <el-select
          v-model="filters.provinceId"
          class="filter-select"
          placeholder="全部省份"
          @change="handleProvinceChange"
        >
          <el-option label="全部省份" value="" />
          <el-option
            v-for="item in provinceOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>

        <el-select
          v-model="filters.cityId"
          class="filter-select"
          placeholder="全部网格区域"
        >
          <el-option label="全部网格区域" value="" />
          <el-option
            v-for="item in cityOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>

      <section class="metric-grid">
        <div v-for="item in metricCards" :key="item.label" class="metric-card">
          <p>{{ item.label }}</p>
          <strong>{{ item.value }}<span>{{ item.unit }}</span></strong>
        </div>
      </section>

      <section v-if="filteredRecords.length" class="summary-grid">
        <div class="summary-block">
          <h2>地区检测统计</h2>
          <el-table :data="cityTotals" border size="small">
            <el-table-column prop="cityName" label="网格区域" min-width="100" />
            <el-table-column prop="total" label="确认次数" min-width="90" />
            <el-table-column prop="averageAqi" label="平均 AQI" min-width="100" />
            <el-table-column prop="pm25OverTotal" label="PM2.5 超标" min-width="110" />
          </el-table>
        </div>

        <div class="summary-block">
          <h2>AQI 等级分布</h2>
          <div class="level-list">
            <div v-for="item in aqiDistribution" :key="item.level" class="level-item">
              <span>{{ item.level }}</span>
              <el-progress
                :percentage="Math.round((item.total / filteredRecords.length) * 100)"
                :stroke-width="10"
                :show-text="false"
              />
              <strong>{{ item.total }} 条</strong>
            </div>
          </div>
        </div>
      </section>

      <el-table v-if="filteredRecords.length" :data="filteredRecords" border class="statistics-table">
        <el-table-column prop="provinceName" label="省份" min-width="100" />
        <el-table-column prop="cityName" label="网格区域" min-width="110" />
        <el-table-column prop="gridMemberName" label="网格员" min-width="110" />
        <el-table-column prop="so2" label="SO2" min-width="90" />
        <el-table-column prop="co" label="CO" min-width="90" />
        <el-table-column prop="pm25" label="PM2.5" min-width="100" />
        <el-table-column label="实测 AQI" min-width="120">
          <template #default="{ row }">
            <span class="aqi-text" :style="{ color: getAqiLevel(row.aqi).color }">
              {{ row.aqi }} / {{ getAqiLevel(row.aqi).text }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="confirmTime" label="确认时间" min-width="170" />
      </el-table>

      <el-empty v-else description="暂无 AQI 确认数据" />
    </section>
  </AdminShell>
</template>

<style scoped>
.statistics-panel {
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

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toolbar-actions .el-icon {
  margin-right: 4px;
}

.toolbar p {
  margin: 0;
  color: #667085;
  font-size: 14px;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 220px));
  gap: 12px;
  margin-bottom: 18px;
}

.filter-select {
  width: 100%;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 18px;
}

.metric-card {
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #f8fafc;
}

.metric-card p {
  margin: 0 0 8px;
  color: #667085;
  font-size: 13px;
}

.metric-card strong {
  color: #1f2d3d;
  font-size: 28px;
  line-height: 1;
}

.metric-card span {
  margin-left: 4px;
  color: #667085;
  font-size: 13px;
}

.summary-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.8fr);
  gap: 16px;
  margin-bottom: 18px;
}

.summary-block {
  min-width: 0;
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #ffffff;
}

.summary-block h2 {
  margin: 0 0 12px;
  color: #1f2d3d;
  font-size: 16px;
}

.level-list {
  display: grid;
  gap: 12px;
}

.level-item {
  display: grid;
  grid-template-columns: 78px minmax(0, 1fr) 52px;
  align-items: center;
  gap: 10px;
  color: #344054;
  font-size: 13px;
}

.level-item strong {
  color: #1f2d3d;
  font-size: 13px;
  text-align: right;
}

.statistics-table {
  width: 100%;
}

.aqi-text {
  font-weight: 700;
}

@media (max-width: 640px) {
  .statistics-panel {
    padding: 18px 14px;
  }

  .toolbar,
  .toolbar-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .filter-row,
  .metric-grid,
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
