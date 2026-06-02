<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actionText: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <el-card class="role-card" shadow="hover">
    <div class="role-card__icon">
      <el-icon><component :is="icon" /></el-icon>
    </div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <el-button class="role-card__button" type="primary" @click="$router.push(to)">
      {{ actionText }}
    </el-button>
  </el-card>
</template>

<style scoped>
.role-card {
  height: 100%;
  border-radius: 8px;
}

.role-card :deep(.el-card__body) {
  display: flex;
  min-height: 236px;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
}

.role-card__icon {
  display: inline-flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #ecf5ff;
  color: #409eff;
  font-size: 24px;
}

h2 {
  margin: 18px 0 8px;
  color: #1f2d3d;
  font-size: 20px;
  line-height: 1.3;
}

p {
  flex: 1;
  margin: 0 0 22px;
  color: #667085;
  font-size: 14px;
  line-height: 1.7;
  text-align: left;
}

.role-card__button {
  width: 100%;
}
</style>
