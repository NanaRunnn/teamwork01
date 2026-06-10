<script setup>
import {
  DataAnalysis,
  Guide,
  Management,
  RefreshLeft,
  UserFilled,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import RoleCard from '../components/RoleCard.vue'
import { clearAllUsers } from '../utils/auth'

const roles = [
  {
    title: '公众监督员',
    description: '提交空气质量反馈，查看本人历史反馈记录。',
    actionText: '进入公众端',
    to: '/supervisor/login',
    icon: UserFilled,
  },
  {
    title: '网格员',
    description: '查看指派任务，完成实地检测并提交 AQI 确认数据。',
    actionText: '进入网格员端',
    to: '/grid/login',
    icon: Guide,
  },
  {
    title: '系统管理员',
    description: '管理公众反馈，指派网格员，查看确认数据。',
    actionText: '进入管理端',
    to: '/admin/login',
    icon: Management,
  },
  {
    title: '决策者',
    description: '查看统计图表和空气质量数据可视化大屏。',
    actionText: '进入决策端',
    to: '/decision/dashboard',
    icon: DataAnalysis,
  },
]

function resetDemo() {
  clearAllUsers()
  ElMessage.success('已清除登录状态，请重新选择角色登录')
}
</script>

<template>
  <main class="home-page">
    <el-container class="home-shell">
      <el-header class="home-header">
        <div class="header-top">
          <div>
            <p class="eyebrow">东软环保公众监督系统</p>
            <h1>请选择使用端</h1>
          </div>
          <el-button @click="resetDemo">
            <el-icon><RefreshLeft /></el-icon>
            清除登录状态
          </el-button>
        </div>
      </el-header>

      <el-main class="home-main">
        <el-row :gutter="18">
          <el-col
            v-for="role in roles"
            :key="role.title"
            :xs="24"
            :sm="12"
            :lg="6"
            class="role-col"
          >
            <RoleCard v-bind="role" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </main>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background:
    linear-gradient(135deg, rgba(64, 158, 255, 0.14), rgba(103, 194, 58, 0.12)),
    #f5f7fb;
  color: #1f2d3d;
}

.home-shell {
  width: min(100%, 1120px);
  min-height: 100vh;
  margin: 0 auto;
  padding: 36px 22px;
}

.home-header {
  height: auto;
  padding: 24px 0 28px;
}

.header-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.header-top .el-button .el-icon {
  margin-right: 4px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #409eff;
  font-size: 14px;
  font-weight: 700;
}

h1 {
  margin: 0;
  color: #1f2d3d;
  font-size: 34px;
  line-height: 1.25;
}

.home-main {
  padding: 0;
}

.role-col {
  margin-bottom: 18px;
}

@media (max-width: 480px) {
  .home-shell {
    padding: 22px 14px;
  }

  .home-header {
    padding: 16px 0 20px;
  }

  .header-top {
    align-items: stretch;
    flex-direction: column;
  }

  h1 {
    font-size: 26px;
  }
}
</style>
