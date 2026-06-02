<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { loginSupervisor } from '../../api/supervisor'
import SupervisorShell from '../../components/SupervisorShell.vue'
import { setSupervisorUser } from '../../utils/auth'

const router = useRouter()

const form = reactive({
  phone: '13800138000',
  password: '123456',
})

async function submitLogin() {
  if (!form.phone || !form.password) {
    ElMessage.warning('请填写手机号和密码')
    return
  }

  const result = await loginSupervisor({ ...form })

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
  <SupervisorShell title="公众监督员登录">
    <el-form class="auth-form" label-position="top">
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
          placeholder="请输入登录密码"
          show-password
          size="large"
          type="password"
        />
      </el-form-item>

      <el-button class="primary-button" type="primary" size="large" @click="submitLogin">
        登录
      </el-button>

      <el-button class="secondary-button" text @click="$router.push('/supervisor/register')">
        还没有账号？去注册
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
