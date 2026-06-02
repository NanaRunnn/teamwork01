<script setup>
defineProps({
  eyebrow: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  primaryText: {
    type: String,
    default: '',
  },
  primaryTo: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <main class="placeholder-page">
    <el-container class="placeholder-shell">
      <el-main class="placeholder-main">
        <section class="placeholder-panel">
          <p class="eyebrow">{{ eyebrow }}</p>
          <h1>{{ title }}</h1>
          <p class="description">{{ description }}</p>
          <div class="actions">
            <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
            <el-button v-if="primaryText && primaryTo" @click="$router.push(primaryTo)">
              {{ primaryText }}
            </el-button>
          </div>
        </section>
      </el-main>
    </el-container>
  </main>
</template>

<style scoped>
.placeholder-page {
  min-height: 100vh;
  background:
    linear-gradient(135deg, rgba(64, 158, 255, 0.14), rgba(103, 194, 58, 0.12)),
    #f5f7fb;
}

.placeholder-shell {
  width: min(100%, 760px);
  min-height: 100vh;
  margin: 0 auto;
  padding: 28px 20px;
}

.placeholder-main {
  display: flex;
  align-items: center;
  padding: 0;
}

.placeholder-panel {
  width: 100%;
  padding: 28px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 50px rgba(31, 45, 61, 0.08);
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

.description {
  margin: 16px 0 24px;
  color: #667085;
  font-size: 15px;
  line-height: 1.8;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 480px) {
  .placeholder-shell {
    padding: 20px 14px;
  }

  .placeholder-panel {
    padding: 22px 16px;
  }

  h1 {
    font-size: 24px;
  }

  .actions .el-button {
    width: 100%;
    margin-left: 0;
  }
}
</style>
