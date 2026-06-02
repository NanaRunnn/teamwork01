<script setup>
import { computed, onMounted, ref } from 'vue'
import ChartPanel from '../../components/ChartPanel.vue'
import {
  listAqiDistributeStatis,
  listGridCoverageStatis,
  listPm25OverLimitStatis,
  listProvinceItemTotalStatis,
  listStatisticsAll,
} from '../../api/statistics'

const statistics = ref([])
const provinceTotals = ref([])
const aqiDistribution = ref([])
const pm25Trend = ref([])
const gridCoverage = ref({
  coveredCities: 0,
  totalCities: 3,
  rate: 0,
})

const confirmedTotal = computed(() => statistics.value.length)
const averageAqi = computed(() => {
  if (!statistics.value.length) {
    return 0
  }

  const total = statistics.value.reduce((sum, item) => sum + Number(item.aqi || 0), 0)
  return Math.round(total / statistics.value.length)
})

const pm25OverTotal = computed(() => {
  return statistics.value.filter((item) => Number(item.pm25) > 75).length
})

const latestTime = computed(() => {
  return statistics.value[0]?.confirmTime || '暂无检测数据'
})

const metricCards = computed(() => [
  {
    label: '确认数据',
    value: confirmedTotal.value,
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
    label: '网格覆盖率',
    value: gridCoverage.value.rate,
    unit: '%',
  },
])

const chartTextStyle = {
  color: '#cbd5e1',
}

const aqiPieOption = computed(() => ({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: 0,
    textStyle: chartTextStyle,
  },
  series: [
    {
      name: 'AQI 等级',
      type: 'pie',
      radius: ['42%', '68%'],
      center: ['50%', '44%'],
      data: aqiDistribution.value.map((item) => ({
        name: item.level,
        value: item.total,
      })),
      label: {
        color: '#e2e8f0',
      },
    },
  ],
}))

const cityBarOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: 36,
    right: 20,
    top: 24,
    bottom: 42,
  },
  xAxis: {
    type: 'category',
    data: provinceTotals.value.map((item) => item.name),
    axisLabel: chartTextStyle,
    axisLine: {
      lineStyle: {
        color: '#475569',
      },
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: chartTextStyle,
    splitLine: {
      lineStyle: {
        color: 'rgba(148, 163, 184, 0.18)',
      },
    },
  },
  series: [
    {
      name: '检测数量',
      type: 'bar',
      data: provinceTotals.value.map((item) => item.total),
      barWidth: 32,
      itemStyle: {
        color: '#38bdf8',
        borderRadius: [4, 4, 0, 0],
      },
    },
  ],
}))

const pm25LineOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: 36,
    right: 20,
    top: 24,
    bottom: 42,
  },
  xAxis: {
    type: 'category',
    data: pm25Trend.value.map((item, index) => `第${index + 1}次`),
    axisLabel: chartTextStyle,
    axisLine: {
      lineStyle: {
        color: '#475569',
      },
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: chartTextStyle,
    splitLine: {
      lineStyle: {
        color: 'rgba(148, 163, 184, 0.18)',
      },
    },
  },
  series: [
    {
      name: 'PM2.5 超标累计',
      type: 'line',
      smooth: true,
      data: pm25Trend.value.map((item) => item.total),
      symbolSize: 8,
      lineStyle: {
        color: '#f59e0b',
        width: 3,
      },
      itemStyle: {
        color: '#f59e0b',
      },
      areaStyle: {
        color: 'rgba(245, 158, 11, 0.16)',
      },
    },
  ],
}))

const coverageGaugeOption = computed(() => ({
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 100,
      progress: {
        show: true,
        width: 16,
        itemStyle: {
          color: '#22c55e',
        },
      },
      axisLine: {
        lineStyle: {
          width: 16,
          color: [[1, 'rgba(148, 163, 184, 0.22)']],
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}%',
        color: '#e2e8f0',
        fontSize: 34,
        offsetCenter: [0, '6%'],
      },
      data: [
        {
          value: gridCoverage.value.rate,
          name: `${gridCoverage.value.coveredCities}/${gridCoverage.value.totalCities} 网格`,
        },
      ],
      title: {
        color: '#94a3b8',
        fontSize: 14,
        offsetCenter: [0, '48%'],
      },
    },
  ],
}))

async function loadDashboard() {
  const [
    statisticsResult,
    provinceResult,
    distributionResult,
    pm25Result,
    coverageResult,
  ] = await Promise.all([
    listStatisticsAll(),
    listProvinceItemTotalStatis(),
    listAqiDistributeStatis(),
    listPm25OverLimitStatis(),
    listGridCoverageStatis(),
  ])

  statistics.value = statisticsResult.data || []
  provinceTotals.value = provinceResult.data || []
  aqiDistribution.value = distributionResult.data || []
  pm25Trend.value = pm25Result.data || []
  gridCoverage.value = coverageResult.data || gridCoverage.value
}

onMounted(loadDashboard)
</script>

<template>
  <main class="dashboard-page">
    <div class="dashboard-shell">
      <header class="dashboard-header">
        <el-button text @click="$router.push('/')">返回首页</el-button>
        <p>决策者端</p>
        <h1>空气质量监督数据大屏</h1>
        <span>最近检测：{{ latestTime }}</span>
      </header>

      <section class="metric-grid">
        <div v-for="item in metricCards" :key="item.label" class="metric-card">
          <p>{{ item.label }}</p>
          <strong>{{ item.value }}<span>{{ item.unit }}</span></strong>
        </div>
      </section>

      <section class="chart-grid">
        <ChartPanel title="AQI 等级分布" :option="aqiPieOption" />
        <ChartPanel title="地区检测数量" :option="cityBarOption" />
        <ChartPanel title="PM2.5 超标累计" :option="pm25LineOption" />
        <ChartPanel title="网格覆盖率" :option="coverageGaugeOption" />
      </section>
    </div>
  </main>
</template>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background:
    linear-gradient(135deg, rgba(14, 165, 233, 0.14), rgba(34, 197, 94, 0.1)),
    #020617;
  color: #e2e8f0;
}

.dashboard-shell {
  width: min(100%, 1180px);
  min-height: 100vh;
  margin: 0 auto;
  padding: 28px 22px 36px;
}

.dashboard-header {
  padding: 10px 0 24px;
}

.dashboard-header .el-button {
  margin: 0 0 20px -12px;
  color: #93c5fd;
}

.dashboard-header p {
  margin: 0 0 8px;
  color: #38bdf8;
  font-size: 14px;
  font-weight: 700;
}

.dashboard-header h1 {
  margin: 0;
  color: #f8fafc;
  font-size: 34px;
  line-height: 1.25;
}

.dashboard-header span {
  display: block;
  margin-top: 10px;
  color: #94a3b8;
  font-size: 14px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 18px;
}

.metric-card {
  padding: 18px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.72);
}

.metric-card p {
  margin: 0 0 8px;
  color: #94a3b8;
  font-size: 14px;
}

.metric-card strong {
  color: #f8fafc;
  font-size: 30px;
  line-height: 1;
}

.metric-card span {
  margin-left: 4px;
  color: #94a3b8;
  font-size: 14px;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 820px) {
  .metric-grid,
  .chart-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .dashboard-shell {
    padding: 20px 14px 28px;
  }

  .dashboard-header h1 {
    font-size: 26px;
  }

  .metric-card {
    padding: 16px 14px;
  }
}
</style>
