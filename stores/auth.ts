import { defineStore } from 'pinia'
import type { UserProfile } from '~/types/medical'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProfile | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => Boolean(token.value))

  const login = async (email: string, password: string) => {
    const response = await $fetch<{ user: UserProfile; token: string }>('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })

    token.value = response.token
    user.value = response.user
  }

  const fetchMe = async () => {
    if (!token.value) {
      return
    }

    const response = await $fetch<{ user: UserProfile }>('/api/auth/me', {
      headers: {
        authorization: `Bearer ${token.value}`
      }
    })

    user.value = response.user
  }

  const logout = () => {
    token.value = null
    user.value = null
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    fetchMe,
    logout
  }
})
