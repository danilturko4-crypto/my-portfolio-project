<script setup lang="ts">
const authStore = useAuthStore()
const route = useRoute()

onMounted(async () => {
  await authStore.fetchMe()
})

const isActive = (path: string) => route.path === path
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="brand">
        <p class="eyebrow">Digital Direction</p>
        <h1>Медицинская запись</h1>
        <p class="subtitle">Поиск врачей, расписание и запись на консультации в одном сервисе.</p>
      </div>
      <nav class="nav">
        <NuxtLink class="ghost-btn" :class="{ active: isActive('/') }" to="/">Врачи</NuxtLink>
        <NuxtLink class="ghost-btn" :class="{ active: route.path.startsWith('/doctors') }" to="/doctors/1">
          Профиль врача
        </NuxtLink>
        <NuxtLink class="ghost-btn" :class="{ active: isActive('/login') }" to="/login">Вход</NuxtLink>
      </nav>
      <div class="profile">
        <div class="profile-info">
          <span class="profile-name">{{ authStore.user?.name || 'Гость' }}</span>
          <span class="profile-status">{{ authStore.isAuthenticated ? 'Авторизован' : 'Гость' }}</span>
        </div>
        <img
          :src="authStore.user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=48&h=48'"
          alt="User avatar"
          class="profile-avatar"
        />
      </div>
    </header>

    <main class="main">
      <slot />
    </main>
  </div>
</template>
