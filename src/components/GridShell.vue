<script setup>
import { clearGridUser, getGridUser } from '../utils/auth'

defineProps({
  title: {
    type: String,
    required: true,
  },
  narrow: {
    type: Boolean,
    default: false,
  },
})

const user = getGridUser()

function logout() {
  clearGridUser()
  location.hash = '#/grid/login'
}
</script>

<template>
  <main class="grid-page">
    <el-container class="page-shell" :class="{ 'page-shell--narrow': narrow }">
      <el-header class="page-header">
        <div class="top-line">
          <el-button text @click="$router.push('/')">返回首页</el-button>
          <div v-if="user" class="user-actions">
            <span>{{ user.realName }}</span>
            <el-button text @click="logout">退出</el-button>
          </div>
        </div>
        <p class="eyebrow">网格员端</p>
        <h1>{{ title }}</h1>
      </el-header>

      <el-main class="page-main">
        <slot />
      </el-main>
    </el-container>
  </main>
</template>

<style scoped>
.grid-page {
  min-height: 100vh;
  background:
    linear-gradient(135deg, rgba(64, 158, 255, 0.14), rgba(103, 194, 58, 0.1)),
    #f5f7fb;
  color: #1f2d3d;
}

.page-shell {
  width: min(100%, 1040px);
  min-height: 100vh;
  margin: 0 auto;
  padding: 28px 20px;
}

.page-shell--narrow {
  width: min(100%, 760px);
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

h1 {
  margin: 0;
  color: #1f2d3d;
  font-size: 30px;
  line-height: 1.25;
}

.page-main {
  padding: 0;
}

@media (max-width: 480px) {
  .page-shell {
    padding: 20px 14px;
  }

  h1 {
    font-size: 24px;
  }
}
</style>
