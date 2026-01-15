<script setup lang="ts">
import type { Doctor, ReviewsResponse, ScheduleDay } from '~/types/medical'

const authStore = useAuthStore()
const bookingStore = useBookingStore()
const route = useRoute()

const doctorId = computed(() => Number(route.params.id))

const { data: doctor, error: doctorError } = await useAsyncData<Doctor>(
  () => `doctor-${doctorId.value}`,
  () => $fetch(`/api/doctors/${doctorId.value}`)
)

const { data: schedule } = await useAsyncData<ScheduleDay[]>(
  () => `schedule-${doctorId.value}`,
  () => $fetch(`/api/doctors/${doctorId.value}/schedule`)
)

const reviewSort = ref<'date' | 'rating'>('date')
const reviewPage = ref(1)
const reviewsPerPage = 6

const reviewQuery = computed(() => ({
  sort: reviewSort.value,
  page: reviewPage.value,
  pageSize: reviewsPerPage
}))

const { data: reviewsData, pending: reviewsPending } = await useAsyncData<ReviewsResponse>(
  () => `reviews-${doctorId.value}`,
  () => $fetch(`/api/doctors/${doctorId.value}/reviews`, { query: reviewQuery.value }),
  { watch: [reviewQuery] }
)

const reviews = computed(() => reviewsData.value?.data ?? [])
const reviewTotal = computed(() => reviewsData.value?.total ?? 0)
const reviewPages = computed(() => Math.max(1, Math.ceil(reviewTotal.value / reviewsPerPage)))
const scheduleDays = computed(() => schedule.value ?? [])

watch(reviewSort, () => {
  reviewPage.value = 1
})

const appointment = ref<{ open: boolean; doctor: Doctor | null; slot: string }>({
  open: false,
  doctor: null,
  slot: ''
})

const openSlot = (slot: string) => {
  if (!doctor.value) {
    return
  }

  if (!authStore.isAuthenticated) {
    bookingStore.setPending({ doctorId: doctor.value.id, slot })
    return navigateTo({ path: '/login', query: { redirect: route.fullPath } })
  }

  appointment.value = { open: true, doctor: doctor.value, slot }
}

watch(
  () => authStore.isAuthenticated,
  (value) => {
    if (!value || !bookingStore.pending || !doctor.value) {
      return
    }

    if (bookingStore.pending.doctorId === doctor.value.id) {
      appointment.value = {
        open: true,
        doctor: doctor.value,
        slot: bookingStore.pending.slot
      }
      bookingStore.clearPending()
    }
  }
)
</script>

<template>
  <section v-if="doctor" class="doctor-page">
    <div class="doctor-hero">
      <NuxtLink class="ghost-btn" to="/">← Назад к списку</NuxtLink>
      <div class="doctor-profile">
        <img :src="doctor.avatar" :alt="doctor.name" />
        <div>
          <h2>{{ doctor.name }}</h2>
          <p class="doctor-specialty">{{ doctor.specialty }}</p>
          <p class="doctor-rating">Рейтинг {{ doctor.rating.toFixed(1) }} · {{ doctor.reviewsCount }} отзывов</p>
          <p class="doctor-description">{{ doctor.description }}</p>
          <div class="profile-grid">
            <div>
              <span>Стаж</span>
              <strong>{{ doctor.experience }} лет</strong>
            </div>
            <div>
              <span>Цена консультации</span>
              <strong>{{ doctor.price }} ₽</strong>
            </div>
            <div>
              <span>Образование</span>
              <strong>{{ doctor.education }}</strong>
            </div>
            <div>
              <span>Достижения</span>
              <strong>{{ doctor.achievements.join(', ') }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="doctor-grid">
      <div class="schedule">
        <h3>Расписание на неделю</h3>
        <p class="note">Показаны только дни с доступными слотами. В выходные — до 14:00.</p>
        <div class="schedule-grid">
          <div class="day" v-for="day in scheduleDays" :key="day.date">
            <div class="day-header">
              <span class="day-label">{{ day.dayLabel }}</span>
              <span class="day-meta">{{ day.slots.length }} слотов</span>
            </div>
            <div class="slots">
              <button v-for="slot in day.slots" :key="slot" class="slot" @click="openSlot(slot)">
                {{ slot }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="reviews">
        <div class="reviews-header">
          <h3>Отзывы</h3>
          <select v-model="reviewSort" class="filter-select">
            <option value="date">Сначала новые</option>
            <option value="rating">По рейтингу</option>
          </select>
        </div>
        <div v-if="reviewsPending" class="loading">Загрузка отзывов...</div>
        <div v-else-if="reviews.length === 0" class="empty">Пока нет отзывов.</div>
        <div v-else class="review-card" v-for="review in reviews" :key="review.id">
          <div class="review-head">
            <strong>{{ review.name }}</strong>
            <span>{{ review.rating }}★</span>
          </div>
          <p>{{ review.text }}</p>
          <span class="review-date">{{ review.date }}</span>
        </div>
        <div class="pagination">
          <button class="ghost-btn" :disabled="reviewPage === 1" @click="reviewPage -= 1">Назад</button>
          <span>Страница {{ reviewPage }} из {{ reviewPages }}</span>
          <button class="ghost-btn" :disabled="reviewPage === reviewPages" @click="reviewPage += 1">Вперед</button>
        </div>
      </div>
    </div>

    <AppointmentModal
      :open="appointment.open"
      :doctor="appointment.doctor"
      :slot="appointment.slot"
      @close="appointment.open = false"
    />
  </section>

  <section v-else class="card">
    <div v-if="doctorError" class="error">Не удалось загрузить врача.</div>
    <div v-else class="loading">Загрузка профиля...</div>
  </section>
</template>
