<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { loginAdmin } from '../../api/admins'
import AdminShell from '../../components/AdminShell.vue'
import { setAdminUser } from '../../utils/auth'

const router = useRouter()

const form = reactive({
  code: 'admin',
  password: '123456',
})

async function submitLogin() {
  if (!form.code || !form.password) {
    ElMessage.warning('请填写管理员编码和密码')
    return
  }

  const result = await loginAdmin({ ...form })

  if (result.code !== 200) {
    ElMessage.error(result.message)
    return
  }

  setAdminUser(result.data)
  ElMessage.success(result.message)
  router.push('/admin/feedbacks')
}
</script>

<template>
  <AdminShell title="管理员登录" narrow>
    <el-form class="auth-form" label-position="top">
      <el-form-item label="管理员编码">
        <el-input v-model="form.code" placeholder="请输入管理员编码" size="large" />
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
    </el-form>
  </AdminShell>
</template>

<style scoped>
.auth-form {
  padding: 24px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 50px rgba(31, 45, 61, 0.08);
}

.primary-button {
  width: 100%;
}

@media (max-width: 480px) {
  .auth-form {
    padding: 18px 14px;
  }
}
</style>
