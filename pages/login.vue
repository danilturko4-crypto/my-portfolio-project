<script setup lang="ts">
const authStore = useAuthStore()
const route = useRoute()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const submit = async () => {
  errorMessage.value = ''

  if (!email.value.trim() || !password.value.trim()) {
    errorMessage.value = 'Введите email и пароль.'
    return
  }

  if (!email.value.includes('@')) {
    errorMessage.value = 'Email указан некорректно.'
    return
  }

  isSubmitting.value = true

  try {
    await authStore.login(email.value.trim(), password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await navigateTo(redirect)
  } catch (error) {
    errorMessage.value = 'Не удалось войти. Проверьте данные.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="login-page">
    <div class="login-card">
      <h2>Вход</h2>
      <p class="note">Авторизуйтесь, чтобы записываться на прием и видеть личные данные.</p>
      <label>Email</label>
      <input v-model="email" type="email" placeholder="user@mail.com" />
      <label>Пароль</label>
      <input v-model="password" type="password" placeholder="••••••" />
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <button class="primary-btn" :disabled="isSubmitting" @click="submit">
        {{ isSubmitting ? 'Входим...' : 'Войти' }}
      </button>
      <NuxtLink class="ghost-btn" to="/">Отмена</NuxtLink>
    </div>
  </section>
</template>
