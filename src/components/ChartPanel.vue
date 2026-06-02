<script setup>
import * as echarts from 'echarts'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  option: {
    type: Object,
    required: true,
  },
  height: {
    type: String,
    default: '320px',
  },
})

const chartRef = ref(null)
let chart = null

function renderChart() {
  if (!chartRef.value) {
    return
  }

  if (!chart) {
    chart = echarts.init(chartRef.value)
  }

  chart.setOption(props.option, true)
}

function resizeChart() {
  chart?.resize()
}

onMounted(async () => {
  await nextTick()
  renderChart()
  window.addEventListener('resize', resizeChart)
})

watch(
  () => props.option,
  async () => {
    await nextTick()
    renderChart()
  },
  { deep: true },
)

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chart?.dispose()
  chart = null
})
</script>

<template>
  <section class="chart-panel">
    <h2>{{ title }}</h2>
    <div ref="chartRef" class="chart-body" :style="{ height }" />
  </section>
</template>

<style scoped>
.chart-panel {
  min-width: 0;
  padding: 20px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.72);
  box-shadow: 0 20px 60px rgba(2, 6, 23, 0.22);
}

h2 {
  margin: 0 0 14px;
  color: #e2e8f0;
  font-size: 18px;
  line-height: 1.3;
}

.chart-body {
  width: 100%;
  min-height: 240px;
}

@media (max-width: 480px) {
  .chart-panel {
    padding: 16px 12px;
  }

  h2 {
    font-size: 16px;
  }
}
</style>
