<script setup>
import { computed, onMounted, ref, watch } from 'vue'

const isLoading = ref(true)
const loadError = ref('')

const specialties = [
  'Кардиолог',
  'Невролог',
  'Терапевт',
  'Дерматолог',
  'Педиатр',
  'Офтальмолог'
]

const doctors = ref([
  {
    id: 1,
    name: 'Анна Викторовна Петрова',
    specialty: 'Кардиолог',
    rating: 4.9,
    reviewsCount: 128,
    achievements: ['Кандидат мед. наук', 'Стажировка в Mayo Clinic'],
    experience: 12,
    price: 3200,
    todaySlots: ['10:30', '12:00', '15:30'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=facearea&w=120&h=120',
    education: 'Первый МГМУ им. И.М. Сеченова',
    description: 'Специализируется на диагностике и лечении сердечно-сосудистых заболеваний.',
    weeklySchedule: [
      { date: '2024-09-23', dayLabel: 'Пн, 23', slots: ['09:00', '10:00', '11:30'] },
      { date: '2024-09-25', dayLabel: 'Ср, 25', slots: ['13:00', '14:30'] },
      { date: '2024-09-27', dayLabel: 'Пт, 27', slots: ['09:30', '12:00', '16:00'] }
    ],
    reviews: [
      { id: 1, name: 'Мария К.', rating: 5, text: 'Очень внимательный врач, все объяснила.', date: '2024-08-14' },
      { id: 2, name: 'Иван С.', rating: 4, text: 'Профессионально, но ожидал больше времени.', date: '2024-07-20' },
      { id: 3, name: 'Алина П.', rating: 5, text: 'После консультации стало спокойнее.', date: '2024-07-02' }
    ]
  },
  {
    id: 2,
    name: 'Дмитрий Сергеевич Волков',
    specialty: 'Невролог',
    rating: 4.7,
    reviewsCount: 94,
    achievements: ['Член Ассоциации неврологов', 'Автор 15 публикаций'],
    experience: 9,
    price: 2800,
    todaySlots: ['11:00', '13:30'],
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=facearea&w=120&h=120',
    education: 'РНИМУ им. Н.И. Пирогова',
    description: 'Занимается лечением хронических болевых синдромов и мигреней.',
    weeklySchedule: [
      { date: '2024-09-24', dayLabel: 'Вт, 24', slots: ['09:00', '12:00', '14:00'] },
      { date: '2024-09-26', dayLabel: 'Чт, 26', slots: ['10:30', '11:30', '15:00'] }
    ],
    reviews: [
      { id: 4, name: 'Ольга Н.', rating: 5, text: 'Помог разобраться с диагнозом.', date: '2024-08-01' },
      { id: 5, name: 'Сергей Р.', rating: 4, text: 'Все четко и по делу.', date: '2024-06-18' }
    ]
  },
  {
    id: 3,
    name: 'Елена Михайловна Юдина',
    specialty: 'Терапевт',
    rating: 4.8,
    reviewsCount: 211,
    achievements: ['Лучший терапевт года', 'Ведущий врач клиники'],
    experience: 15,
    price: 2400,
    todaySlots: ['09:00', '10:00', '17:00'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=facearea&w=120&h=120',
    education: 'СПбГМУ им. акад. И.П. Павлова',
    description: 'Проводит комплексные консультации и профилактические осмотры.',
    weeklySchedule: [
      { date: '2024-09-23', dayLabel: 'Пн, 23', slots: ['10:00', '11:00', '12:00'] },
      { date: '2024-09-27', dayLabel: 'Пт, 27', slots: ['09:30', '13:00'] }
    ],
    reviews: [
      { id: 6, name: 'Людмила П.', rating: 5, text: 'Очень доброжелательная и внимательная.', date: '2024-08-19' },
      { id: 7, name: 'Артем Л.', rating: 4, text: 'Помогла быстро вылечиться.', date: '2024-07-08' },
      { id: 8, name: 'Дарья Ф.', rating: 5, text: 'Советую всем знакомым.', date: '2024-06-30' }
    ]
  },
  {
    id: 4,
    name: 'Николай Алексеевич Смирнов',
    specialty: 'Дерматолог',
    rating: 4.6,
    reviewsCount: 58,
    achievements: ['Эксперт по акне', 'Опыт 7 лет'],
    experience: 7,
    price: 2600,
    todaySlots: [],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=120&h=120',
    education: 'КГМУ',
    description: 'Работает с хроническими кожными заболеваниями.',
    weeklySchedule: [
      { date: '2024-09-25', dayLabel: 'Ср, 25', slots: ['09:00', '10:30'] },
      { date: '2024-09-28', dayLabel: 'Сб, 28', slots: ['09:00', '11:00'] }
    ],
    reviews: [{ id: 9, name: 'Юрий П.', rating: 4, text: 'Хороший специалист.', date: '2024-06-12' }]
  },
  {
    id: 5,
    name: 'Марина Олеговна Орлова',
    specialty: 'Педиатр',
    rating: 4.9,
    reviewsCount: 173,
    achievements: ['Врач высшей категории', '10 лет в детской клинике'],
    experience: 11,
    price: 2300,
    todaySlots: ['08:30', '11:00'],
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=120&h=120',
    education: 'СГМУ',
    description: 'Консультирует родителей по вопросам здоровья детей.',
    weeklySchedule: [
      { date: '2024-09-24', dayLabel: 'Вт, 24', slots: ['09:30', '10:30', '13:00'] },
      { date: '2024-09-26', dayLabel: 'Чт, 26', slots: ['09:00', '12:00'] }
    ],
    reviews: [
      { id: 10, name: 'Ксения М.', rating: 5, text: 'Очень чуткий врач, ребенок в восторге.', date: '2024-08-09' },
      { id: 11, name: 'Павел С.', rating: 5, text: 'Подробно объяснила лечение.', date: '2024-07-15' }
    ]
  },
  {
    id: 6,
    name: 'Светлана Игоревна Белова',
    specialty: 'Офтальмолог',
    rating: 4.5,
    reviewsCount: 66,
    achievements: ['Операции по коррекции зрения', 'Член общества офтальмологов'],
    experience: 8,
    price: 3000,
    todaySlots: ['14:00'],
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=120&h=120',
    education: 'НГМУ',
    description: 'Проводит диагностику зрения и подбор оптики.',
    weeklySchedule: [
      { date: '2024-09-23', dayLabel: 'Пн, 23', slots: ['12:00', '14:00'] },
      { date: '2024-09-26', dayLabel: 'Чт, 26', slots: ['09:00', '11:00'] }
    ],
    reviews: [{ id: 12, name: 'Егор П.', rating: 4, text: 'Все понравилось, внимательно.', date: '2024-07-28' }]
  }
])

const selectedDoctor = ref(doctors.value[0])
const currentView = ref('home')
const previousView = ref('home')

const selectedSpecialty = ref('')
const minRating = ref(0)
const searchQuery = ref('')
const sortBy = ref('rating')
const sortOrder = ref('desc')
const currentPage = ref(1)
const pageSize = 4

const isAuthenticated = ref(false)
const userProfile = ref({
  name: 'Гость',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=48&h=48'
})

const loginForm = ref({
  email: '',
  password: ''
})
const loginError = ref('')
const loginNotice = ref('')

const appointmentModal = ref({
  open: false,
  doctor: null,
  slot: ''
})
const appointmentForm = ref({
  complaints: '',
  chronic: '',
  height: '',
  weight: '',
  file: null
})
const appointmentError = ref('')
const appointmentSuccess = ref('')

const pendingAppointment = ref(null)

const reviewSort = ref('date')
const reviewPage = ref(1)
const reviewsPerPage = 6

onMounted(() => {
  setTimeout(() => {
    if (doctors.value.length === 0) {
      loadError.value = 'Не удалось загрузить список врачей.'
    }
    isLoading.value = false
  }, 600)
})

const filteredDoctors = computed(() => {
  let list = [...doctors.value]

  if (selectedSpecialty.value) {
    list = list.filter((doctor) => doctor.specialty === selectedSpecialty.value)
  }

  if (minRating.value > 0) {
    list = list.filter((doctor) => doctor.rating >= minRating.value)
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter((doctor) => doctor.name.toLowerCase().includes(query))
  }

  list.sort((a, b) => {
    let compare = 0
    switch (sortBy.value) {
      case 'experience':
        compare = a.experience - b.experience
        break
      case 'price':
        compare = a.price - b.price
        break
      case 'name':
        compare = a.name.localeCompare(b.name)
        break
      default:
        compare = a.rating - b.rating
    }
    return sortOrder.value === 'asc' ? compare : -compare
  })

  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredDoctors.value.length / pageSize)))

const paginatedDoctors = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredDoctors.value.slice(start, start + pageSize)
})

const sortedReviews = computed(() => {
  if (!selectedDoctor.value) {
    return []
  }
  const list = [...selectedDoctor.value.reviews]
  if (reviewSort.value === 'rating') {
    list.sort((a, b) => b.rating - a.rating)
  } else {
    list.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
  return list
})

const reviewPages = computed(() => Math.max(1, Math.ceil(sortedReviews.value.length / reviewsPerPage)))

const paginatedReviews = computed(() => {
  const start = (reviewPage.value - 1) * reviewsPerPage
  return sortedReviews.value.slice(start, start + reviewsPerPage)
})

watch([selectedSpecialty, minRating, searchQuery, sortBy, sortOrder], () => {
  currentPage.value = 1
})

watch(selectedDoctor, () => {
  reviewPage.value = 1
})

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const selectDoctor = (doctor) => {
  selectedDoctor.value = doctor
  previousView.value = currentView.value
  currentView.value = 'doctor'
}

const clearSearch = () => {
  searchQuery.value = ''
}

const openSlot = (doctor, slot) => {
  if (!isAuthenticated.value) {
    pendingAppointment.value = { doctor, slot }
    loginNotice.value = 'Чтобы записаться, нужно войти в аккаунт.'
    previousView.value = currentView.value
    currentView.value = 'login'
    return
  }
  appointmentModal.value = {
    open: true,
    doctor,
    slot
  }
  appointmentError.value = ''
  appointmentSuccess.value = ''
}

const closeAppointment = () => {
  appointmentModal.value = { open: false, doctor: null, slot: '' }
  appointmentForm.value = { complaints: '', chronic: '', height: '', weight: '', file: null }
  appointmentError.value = ''
  appointmentSuccess.value = ''
}

const submitAppointment = () => {
  appointmentError.value = ''
  appointmentSuccess.value = ''

  if (!appointmentForm.value.complaints.trim()) {
    appointmentError.value = 'Укажите жалобы.'
    return
  }

  const height = Number(appointmentForm.value.height)
  const weight = Number(appointmentForm.value.weight)

  if (!height || height < 50 || height > 250) {
    appointmentError.value = 'Рост должен быть в диапазоне 50-250 см.'
    return
  }

  if (!weight || weight < 20 || weight > 300) {
    appointmentError.value = 'Вес должен быть в диапазоне 20-300 кг.'
    return
  }

  appointmentSuccess.value = 'Запись успешно создана. Мы отправили подтверждение на email.'
  setTimeout(() => {
    closeAppointment()
  }, 1600)
}

const submitLogin = () => {
  loginError.value = ''
  if (!loginForm.value.email.trim() || !loginForm.value.password.trim()) {
    loginError.value = 'Введите email и пароль.'
    return
  }
  if (!loginForm.value.email.includes('@')) {
    loginError.value = 'Email указан некорректно.'
    return
  }

  isAuthenticated.value = true
  userProfile.value = {
    name: 'Екатерина Иванова',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=48&h=48'
  }
  loginForm.value = { email: '', password: '' }
  loginError.value = ''
  loginNotice.value = ''

  currentView.value = previousView.value

  if (pendingAppointment.value) {
    appointmentModal.value = {
      open: true,
      doctor: pendingAppointment.value.doctor,
      slot: pendingAppointment.value.slot
    }
    pendingAppointment.value = null
  }
}

const handleFile = (event) => {
  const [file] = event.target.files
  appointmentForm.value.file = file || null
}
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
        <button class="ghost-btn" :class="{ active: currentView === 'home' }" @click="currentView = 'home'">
          Врачи
        </button>
        <button
          class="ghost-btn"
          :class="{ active: currentView === 'doctor' }"
          :disabled="!selectedDoctor"
          @click="currentView = 'doctor'"
        >
          Профиль врача
        </button>
        <button class="ghost-btn" :class="{ active: currentView === 'login' }" @click="currentView = 'login'">
          Вход
        </button>
      </nav>
      <div class="profile">
        <div class="profile-info">
          <span class="profile-name">{{ userProfile.name }}</span>
          <span class="profile-status">{{ isAuthenticated ? 'Авторизован' : 'Гость' }}</span>
        </div>
        <img :src="userProfile.avatar" alt="User avatar" class="profile-avatar" />
      </div>
    </header>

    <main class="main">
      <section v-if="currentView === 'home'" class="home">
        <div class="filters">
          <div class="filter-card">
            <label class="filter-label">Специальность</label>
            <select v-model="selectedSpecialty" class="filter-select">
              <option value="">Все специальности</option>
              <option v-for="item in specialties" :key="item" :value="item">
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
            <strong>{{ filteredDoctors.length }}</strong>
            <span class="hint">Обновлено 2 минуты назад</span>
          </div>
        </div>

        <section class="list">
          <div class="list-head">
            <h2>Список врачей</h2>
            <p class="note">Данные приходят из /api/doctors с учетом фильтров и сортировки.</p>
          </div>
          <div class="loading" v-if="isLoading">Загрузка списка...</div>
          <div class="error" v-else-if="loadError">{{ loadError }}</div>
          <div v-else>
            <div class="doctor-card" v-for="doctor in paginatedDoctors" :key="doctor.id">
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
                    <button
                      v-for="slot in doctor.todaySlots"
                      :key="slot"
                      class="slot"
                      @click="openSlot(doctor, slot)"
                    >
                      {{ slot }}
                    </button>
                    <span v-if="doctor.todaySlots.length === 0" class="empty">Нет слотов</span>
                  </div>
                </div>
                <button class="primary-btn" @click="selectDoctor(doctor)">Подробнее</button>
              </div>
            </div>
            <div class="pagination">
              <button class="ghost-btn" :disabled="currentPage === 1" @click="currentPage -= 1">Назад</button>
              <span>Страница {{ currentPage }} из {{ totalPages }}</span>
              <button class="ghost-btn" :disabled="currentPage === totalPages" @click="currentPage += 1">
                Вперед
              </button>
            </div>
          </div>
        </section>
      </section>

      <section v-else-if="currentView === 'doctor'" class="doctor-page" v-if="selectedDoctor">
        <div class="doctor-hero">
          <button class="ghost-btn" @click="currentView = 'home'">← Назад к списку</button>
          <div class="doctor-profile">
            <img :src="selectedDoctor.avatar" :alt="selectedDoctor.name" />
            <div>
              <h2>{{ selectedDoctor.name }}</h2>
              <p class="doctor-specialty">{{ selectedDoctor.specialty }}</p>
              <p class="doctor-rating">
                Рейтинг {{ selectedDoctor.rating.toFixed(1) }} · {{ selectedDoctor.reviewsCount }} отзывов
              </p>
              <p class="doctor-description">{{ selectedDoctor.description }}</p>
              <div class="profile-grid">
                <div>
                  <span>Стаж</span>
                  <strong>{{ selectedDoctor.experience }} лет</strong>
                </div>
                <div>
                  <span>Цена консультации</span>
                  <strong>{{ selectedDoctor.price }} ₽</strong>
                </div>
                <div>
                  <span>Образование</span>
                  <strong>{{ selectedDoctor.education }}</strong>
                </div>
                <div>
                  <span>Достижения</span>
                  <strong>{{ selectedDoctor.achievements.join(', ') }}</strong>
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
              <div class="day" v-for="day in selectedDoctor.weeklySchedule" :key="day.date">
                <div class="day-header">
                  <span class="day-label">{{ day.dayLabel }}</span>
                  <span class="day-meta">{{ day.slots.length }} слотов</span>
                </div>
                <div class="slots">
                  <button v-for="slot in day.slots" :key="slot" class="slot" @click="openSlot(selectedDoctor, slot)">
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
            <div v-if="paginatedReviews.length === 0" class="empty">Пока нет отзывов.</div>
            <div v-else class="review-card" v-for="review in paginatedReviews" :key="review.id">
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
              <button class="ghost-btn" :disabled="reviewPage === reviewPages" @click="reviewPage += 1">
                Вперед
              </button>
            </div>
          </div>
        </div>
      </section>

      <section v-else class="login-page">
        <div class="login-card">
          <h2>Вход</h2>
          <p class="note">Авторизуйтесь, чтобы записываться на прием и видеть личные данные.</p>
          <label>Email</label>
          <input v-model="loginForm.email" type="email" placeholder="user@mail.com" />
          <label>Пароль</label>
          <input v-model="loginForm.password" type="password" placeholder="••••••" />
          <p v-if="loginNotice" class="info">{{ loginNotice }}</p>
          <p v-if="loginError" class="error">{{ loginError }}</p>
          <button class="primary-btn" @click="submitLogin">Войти</button>
          <button class="ghost-btn" @click="currentView = previousView">Отмена</button>
        </div>
      </section>
    </main>

    <div class="modal" v-if="appointmentModal.open">
      <div class="modal-card">
        <header>
          <h3>Запись на прием</h3>
          <button class="ghost-btn" @click="closeAppointment">Отмена</button>
        </header>
        <p class="modal-info">{{ appointmentModal.doctor?.name }} · {{ appointmentModal.slot }}</p>
        <label>Жалобы *</label>
        <textarea v-model="appointmentForm.complaints" rows="3" placeholder="Опишите симптомы"></textarea>
        <label>Хронические заболевания</label>
        <textarea v-model="appointmentForm.chronic" rows="2" placeholder="Если есть"></textarea>
        <div class="grid">
          <div>
            <label>Рост, см *</label>
            <input v-model="appointmentForm.height" type="number" min="50" max="250" />
          </div>
          <div>
            <label>Вес, кг *</label>
            <input v-model="appointmentForm.weight" type="number" min="20" max="300" />
          </div>
        </div>
        <label>Результаты анализов</label>
        <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt" @change="handleFile" />
        <p v-if="appointmentError" class="error">{{ appointmentError }}</p>
        <p v-if="appointmentSuccess" class="success">{{ appointmentSuccess }}</p>
        <button class="primary-btn" @click="submitAppointment">Записаться</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  padding: 32px;
  background: #f5f6fb;
  color: #1c1f2a;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.header {
  display: grid;
  grid-template-columns: minmax(220px, 1.2fr) minmax(240px, 1fr) auto;
  gap: 24px;
  align-items: center;
  background: #ffffff;
  padding: 24px 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.brand h1 {
  margin: 4px 0;
  font-size: 28px;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.12em;
  color: #7c8195;
  margin: 0;
}

.subtitle {
  margin: 0;
  color: #5f6477;
}

.nav {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.nav .ghost-btn.active {
  background: #eef2ff;
  border-color: #c7d2fe;
  color: #3730a3;
}

.profile {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.profile-name {
  font-weight: 600;
}

.profile-status {
  font-size: 12px;
  color: #6b7280;
}

.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.main {
  margin-top: 24px;
}

.home {
  display: grid;
  gap: 24px;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.filter-card {
  background: #ffffff;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-card.stats strong {
  font-size: 22px;
}

.filter-card.stats .hint {
  font-size: 12px;
  color: #9ca3af;
}

.filter-label {
  font-size: 13px;
  color: #6b7280;
}

.filter-select,
.search-field input,
input,
textarea,
select {
  border: 1px solid #d8dce7;
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 14px;
  background: #fff;
}

.search-field {
  display: flex;
  gap: 8px;
  align-items: center;
}

.list {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.list-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.doctor-card {
  border: 1px solid #eef0f6;
  border-radius: 18px;
  padding: 16px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.doctor-main {
  display: flex;
  gap: 16px;
}

.doctor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  object-fit: cover;
}

.doctor-info h3 {
  margin: 0;
}

.doctor-specialty {
  color: #6b7280;
  margin: 4px 0 8px;
}

.doctor-rating {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
}

.achievements {
  margin: 8px 0 0;
  padding-left: 16px;
  color: #4b5563;
  font-size: 13px;
}

.doctor-meta {
  display: grid;
  gap: 12px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: #6b7280;
}

.meta-item strong {
  color: #111827;
}

.slots {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.slot {
  border: 1px solid #c7d2fe;
  background: #eef2ff;
  color: #4338ca;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 12px;
  cursor: pointer;
}

.empty {
  font-size: 12px;
  color: #9ca3af;
}

.primary-btn {
  border: none;
  background: #4f46e5;
  color: #fff;
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}

.ghost-btn {
  border: 1px solid #d1d5db;
  background: #fff;
  color: #111827;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.ghost-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;
}

.doctor-page {
  display: grid;
  gap: 24px;
}

.doctor-hero {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  display: grid;
  gap: 16px;
}

.doctor-profile {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
}

.doctor-profile img {
  width: 140px;
  height: 140px;
  border-radius: 16px;
  object-fit: cover;
}

.doctor-description {
  color: #4b5563;
}

.profile-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  font-size: 13px;
  color: #6b7280;
}

.profile-grid strong {
  display: block;
  color: #111827;
}

.doctor-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
}

.schedule,
.reviews {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.note {
  font-size: 12px;
  color: #6b7280;
}

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.day {
  background: #f9fafb;
  padding: 12px;
  border-radius: 12px;
}

.day-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
}

.day-meta {
  font-weight: 400;
  color: #6b7280;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-card {
  border-bottom: 1px solid #eef0f6;
  padding: 12px 0;
  font-size: 14px;
}

.review-head {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}

.review-date {
  font-size: 12px;
  color: #9ca3af;
}

.login-page {
  display: grid;
  place-items: center;
  padding: 40px 0;
}

.login-card {
  background: #ffffff;
  padding: 32px;
  border-radius: 20px;
  width: min(420px, 92vw);
  display: grid;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.info {
  font-size: 13px;
  color: #1d4ed8;
}

.loading,
.error,
.success {
  margin-top: 12px;
  font-size: 14px;
}

.error {
  color: #dc2626;
}

.success {
  color: #16a34a;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: grid;
  place-items: center;
  z-index: 10;
}

.modal-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  width: min(480px, 90vw);
  display: grid;
  gap: 10px;
}

.modal-card header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-info {
  color: #4b5563;
  font-size: 14px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

@media (max-width: 1100px) {
  .header {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .profile {
    justify-content: flex-start;
  }

  .doctor-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .doctor-card {
    grid-template-columns: 1fr;
  }

  .doctor-profile {
    grid-template-columns: 1fr;
  }

  .list-head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
