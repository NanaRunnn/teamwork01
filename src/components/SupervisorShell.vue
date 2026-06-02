<script setup>
import { clearSupervisorUser, getSupervisorUser } from '../utils/auth'

defineProps({
  eyebrow: {
    type: String,
    default: '公众监督员端',
  },
  title: {
    type: String,
    required: true,
  },
  narrow: {
    type: Boolean,
    default: true,
  },
})

const user = getSupervisorUser()

function logout() {
  clearSupervisorUser()
  location.hash = '#/supervisor/login'
}
</script>

<template>
  <main class="supervisor-page">
    <el-container class="page-shell" :class="{ 'page-shell--wide': !narrow }">
      <el-header class="page-header">
        <div class="top-line">
          <el-button text @click="$router.push('/')">返回首页</el-button>
          <div v-if="user" class="user-actions">
            <span>{{ user.realName }}</span>
            <el-button text @click="logout">退出</el-button>
          </div>
        </div>
        <p class="eyebrow">{{ eyebrow }}</p>
        <h1>{{ title }}</h1>
      </el-header>

      <el-main class="page-main">
        <slot />
      </el-main>
    </el-container>
  </main>
</template>

<style scoped>
.supervisor-page {
  min-height: 100vh;
  background:
    linear-gradient(135deg, rgba(64, 158, 255, 0.16), rgba(103, 194, 58, 0.12)),
    #f5f7fb;
  color: #1f2d3d;
}

.page-shell {
  width: min(100%, 760px);
  min-height: 100vh;
  margin: 0 auto;
  padding: 28px 20px;
}

.page-shell--wide {
  width: min(100%, 1040px);
}

.page-header {
  height: auto;
  padding: 16px 0 22px;
}

.top-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.top-line > .el-button {
  margin-left: -12px;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #667085;
  font-size: 14px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #409eff;
  font-size: 14px;
  font-weight: 700;
}

.page-header h1 {
  margin: 0;
  font-size: 30px;
  line-height: 1.25;
  font-weight: 800;
}

.page-main {
  padding: 0;
}

@media (max-width: 480px) {
  .page-shell {
    padding: 20px 14px;
  }

  .page-header {
    padding-bottom: 18px;
  }

  .page-header h1 {
    font-size: 24px;
  }
}
</style>
