<script setup lang="ts">
import type { Doctor, DoctorsResponse } from '~/types/medical'

const authStore = useAuthStore()
const bookingStore = useBookingStore()
const route = useRoute()

const selectedSpecialty = ref('')
const minRating = ref(0)
const searchQuery = ref('')
const sortBy = ref('rating')
const sortOrder = ref<'asc' | 'desc'>('desc')
const currentPage = ref(1)
const pageSize = 4

const { data: specialties } = await useFetch<string[]>('/api/specialties')

const query = computed(() => ({
  specialty: selectedSpecialty.value || undefined,
  minRating: minRating.value || undefined,
  search: searchQuery.value || undefined,
  sortBy: sortBy.value,
  sortOrder: sortOrder.value,
  page: currentPage.value,
  pageSize
}))

const {
  data: doctorsData,
  pending,
  error
} = await useAsyncData<DoctorsResponse>('doctors', () => $fetch('/api/doctors', { query: query.value }), {
  watch: [query]
})

const doctors = computed(() => doctorsData.value?.data ?? [])
const total = computed(() => doctorsData.value?.total ?? 0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))
const specialtiesList = computed(() => specialties.value ?? [])

watch([selectedSpecialty, minRating, searchQuery, sortBy, sortOrder], () => {
  currentPage.value = 1
})

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const clearSearch = () => {
  searchQuery.value = ''
}

const appointment = ref<{ open: boolean; doctor: Doctor | null; slot: string }>({
  open: false,
  doctor: null,
  slot: ''
})

const openSlot = (doctor: Doctor, slot: string) => {
  if (!authStore.isAuthenticated) {
    bookingStore.setPending({ doctorId: doctor.id, slot })
    return navigateTo({ path: '/login', query: { redirect: route.fullPath } })
  }

  appointment.value = {
    open: true,
    doctor,
    slot
  }
}

watch(
  () => authStore.isAuthenticated,
  (value) => {
    if (!value || !bookingStore.pending) {
      return
    }

    const match = doctors.value.find((doctor) => doctor.id === bookingStore.pending?.doctorId)
    if (match) {
      appointment.value = {
        open: true,
        doctor: match,
        slot: bookingStore.pending.slot
      }
      bookingStore.clearPending()
    }
  }
)
</script>

<template>
  <section class="home">
    <div class="filters">
      <div class="filter-card">
        <label class="filter-label">Специальность</label>
        <select v-model="selectedSpecialty" class="filter-select">
          <option value="">Все специальности</option>
          <option v-for="item in specialtiesList" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="filter-card">
        <label class="filter-label">Минимальный рейтинг: {{ minRating }}</label>
        <input type="range" min="0" max="5" step="0.5" v-model.number="minRating" />
      </div>
      <div class="filter-card search">
        <label class="filter-label">Поиск по ФИО</label>
        <div class="search-field">
          <input v-model="searchQuery" type="text" placeholder="Начните вводить имя врача" />
          <button v-if="searchQuery" class="ghost-btn" @click="clearSearch">Очистить</button>
        </div>
      </div>
      <div class="filter-card">
        <label class="filter-label">Сортировка</label>
        <select v-model="sortBy" class="filter-select">
          <option value="rating">По рейтингу</option>
          <option value="experience">По стажу</option>
          <option value="price">По цене</option>
          <option value="name">По имени</option>
        </select>
      </div>
      <div class="filter-card">
        <label class="filter-label">Порядок</label>
        <button class="ghost-btn" @click="toggleSortOrder">
          {{ sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию' }}
        </button>
      </div>
      <div class="filter-card stats">
        <span class="filter-label">Найдено врачей</span>
        <strong>{{ total }}</strong>
        <span class="hint">Обновлено 2 минуты назад</span>
      </div>
    </div>

    <section class="list">
      <div class="list-head">
        <h2>Список врачей</h2>
        <p class="note">GET /api/doctors — фильтры, сортировка и пагинация.</p>
      </div>
      <div class="loading" v-if="pending">Загрузка списка...</div>
      <div class="error" v-else-if="error">Не удалось загрузить список.</div>
      <div v-else>
        <div class="doctor-card" v-for="doctor in doctors" :key="doctor.id">
          <div class="doctor-main">
            <img :src="doctor.avatar" :alt="doctor.name" class="doctor-avatar" />
            <div class="doctor-info">
              <h3>{{ doctor.name }}</h3>
              <p class="doctor-specialty">{{ doctor.specialty }}</p>
              <div class="doctor-rating">
                <span class="rating">{{ doctor.rating.toFixed(1) }}</span>
                <span class="reviews">({{ doctor.reviewsCount }} отзывов)</span>
              </div>
              <ul class="achievements">
                <li v-for="item in doctor.achievements" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
          <div class="doctor-meta">
            <div class="meta-item">
              <span>Стаж</span>
              <strong>{{ doctor.experience }} лет</strong>
            </div>
            <div class="meta-item">
              <span>Цена</span>
              <strong>{{ doctor.price }} ₽</strong>
            </div>
            <div class="meta-item">
              <span>Сегодня</span>
              <div class="slots">
                <button v-for="slot in doctor.todaySlots" :key="slot" class="slot" @click="openSlot(doctor, slot)">
                  {{ slot }}
                </button>
                <span v-if="doctor.todaySlots.length === 0" class="empty">Нет слотов</span>
              </div>
            </div>
            <NuxtLink class="primary-btn" :to="`/doctors/${doctor.id}`">Подробнее</NuxtLink>
          </div>
        </div>
        <div class="pagination">
          <button class="ghost-btn" :disabled="currentPage === 1" @click="currentPage -= 1">Назад</button>
          <span>Страница {{ currentPage }} из {{ totalPages }}</span>
          <button class="ghost-btn" :disabled="currentPage === totalPages" @click="currentPage += 1">Вперед</button>
        </div>
      </div>
    </section>

    <AppointmentModal
      :open="appointment.open"
      :doctor="appointment.doctor"
      :slot="appointment.slot"
      @close="appointment.open = false"
    />
  </section>
</template>
