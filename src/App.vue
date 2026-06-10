<script setup>
import { computed } from 'vue'
import { House, RefreshLeft } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { clearAllUsers } from './utils/auth'

const route = useRoute()
const router = useRouter()

const isHome = computed(() => route.path === '/')

function goHome() {
  router.push('/')
}

function resetDemo() {
  clearAllUsers()
  ElMessage.success('已清除登录状态')
  router.push('/')
}
</script>

<template>
  <router-view />

  <div class="global-actions">
    <el-tooltip content="回到角色选择" placement="left">
      <el-button
        circle
        :type="isHome ? 'info' : 'primary'"
        :disabled="isHome"
        @click="goHome"
      >
        <el-icon><House /></el-icon>
      </el-button>
    </el-tooltip>

    <el-tooltip content="清除登录状态" placement="left">
      <el-button circle @click="resetDemo">
        <el-icon><RefreshLeft /></el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>
