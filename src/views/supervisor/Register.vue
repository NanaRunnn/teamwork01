<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { registerSupervisor } from '../../api/supervisor'
import SupervisorShell from '../../components/SupervisorShell.vue'
import { setSupervisorUser } from '../../utils/auth'

const router = useRouter()

const form = reactive({
  realName: '',
  phone: '',
  password: '',
})

function isValidPhone(phone) {
  return /^1\d{10}$/.test(phone)
}

async function submitRegister() {
  if (!form.realName || !form.phone || !form.password) {
    ElMessage.warning('请完整填写注册信息')
    return
  }

  if (!isValidPhone(form.phone)) {
    ElMessage.warning('请输入 11 位手机号码')
    return
  }

  if (form.password.length < 6) {
    ElMessage.warning('密码至少需要 6 位')
    return
  }

  const result = await registerSupervisor({ ...form })

  if (result.code !== 200) {
    ElMessage.error(result.message)
    return
  }

  setSupervisorUser(result.data)
  ElMessage.success(result.message)
  router.push('/supervisor/feedback')
}
</script>

<template>
  <SupervisorShell title="公众监督员注册">
    <el-form class="auth-form" label-position="top">
      <el-form-item label="真实姓名">
        <el-input v-model="form.realName" placeholder="请输入真实姓名" size="large" />
      </el-form-item>

      <el-form-item label="手机号码">
        <el-input
          v-model="form.phone"
          maxlength="11"
          placeholder="请输入手机号码"
          size="large"
        />
      </el-form-item>

      <el-form-item label="登录密码">
        <el-input
          v-model="form.password"
          placeholder="请设置至少 6 位密码"
          show-password
          size="large"
          type="password"
        />
      </el-form-item>

      <el-button class="primary-button" type="primary" size="large" @click="submitRegister">
        注册并进入
      </el-button>

      <el-button class="secondary-button" text @click="$router.push('/supervisor/login')">
        已有账号？去登录
      </el-button>
    </el-form>
  </SupervisorShell>
</template>

<style scoped>
.auth-form {
  padding: 24px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 50px rgba(31, 45, 61, 0.08);
}

.primary-button,
.secondary-button {
  width: 100%;
}

.secondary-button {
  margin: 10px 0 0;
}

@media (max-width: 480px) {
  .auth-form {
    padding: 18px 14px;
  }
}
</style>
