<script setup>
import { onMounted, ref } from 'vue'
import { listStatisticsAll } from '../../api/statistics'
import AdminShell from '../../components/AdminShell.vue'
import { getAqiLevel } from '../../utils/aqi'

const records = ref([])

onMounted(async () => {
  const result = await listStatisticsAll()
  records.value = result.data || []
})
</script>

<template>
  <AdminShell title="统计数据管理">
    <section class="statistics-panel">
      <div class="toolbar">
        <p>共 {{ records.length }} 条 AQI 确认记录</p>
        <el-button type="primary" @click="$router.push('/decision/dashboard')">
          查看决策大屏
        </el-button>
      </div>

      <el-table v-if="records.length" :data="records" border class="statistics-table">
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

.toolbar p {
  margin: 0;
  color: #667085;
  font-size: 14px;
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

  .toolbar {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
