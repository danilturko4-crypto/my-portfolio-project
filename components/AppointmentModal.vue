<script setup lang="ts">
import type { Doctor } from '~/types/medical'

const props = defineProps<{ open: boolean; doctor: Doctor | null; slot: string }>()
const emit = defineEmits<{ (event: 'close'): void }>()

const authStore = useAuthStore()

const form = reactive({
  complaints: '',
  chronic: '',
  height: '',
  weight: '',
  file: null as File | null
})

const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

const resetForm = () => {
  form.complaints = ''
  form.chronic = ''
  form.height = ''
  form.weight = ''
  form.file = null
  errorMessage.value = ''
  successMessage.value = ''
  isSubmitting.value = false
}

watch(
  () => props.open,
  (value) => {
    if (value) {
      resetForm()
    }
  }
)

const handleFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  const [file] = target.files ?? []
  form.file = file || null
}

const submit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.complaints.trim()) {
    errorMessage.value = 'Укажите жалобы.'
    return
  }

  const height = Number(form.height)
  const weight = Number(form.weight)

  if (!height || height < 50 || height > 250) {
    errorMessage.value = 'Рост должен быть в диапазоне 50-250 см.'
    return
  }

  if (!weight || weight < 20 || weight > 300) {
    errorMessage.value = 'Вес должен быть в диапазоне 20-300 кг.'
    return
  }

  if (!authStore.token) {
    errorMessage.value = 'Нужно войти в аккаунт для записи.'
    return
  }

  isSubmitting.value = true

  try {
    const formData = new FormData()
    formData.append('complaints', form.complaints)
    formData.append('chronic', form.chronic)
    formData.append('height', String(height))
    formData.append('weight', String(weight))
    if (form.file) {
      formData.append('file', form.file)
    }
    formData.append('doctorId', String(props.doctor?.id ?? ''))
    formData.append('slot', props.slot)

    await $fetch('/api/appointments', {
      method: 'POST',
      body: formData,
      headers: {
        authorization: `Bearer ${authStore.token}`
      }
    })

    successMessage.value = 'Запись успешно создана. Мы отправили подтверждение на email.'
    setTimeout(() => emit('close'), 1600)
  } catch (error) {
    errorMessage.value = 'Не удалось создать запись. Попробуйте позже.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div v-if="open" class="modal">
    <div class="modal-card">
      <header>
        <h3>Запись на прием</h3>
        <button class="ghost-btn" @click="emit('close')">Отмена</button>
      </header>
      <p class="modal-info">{{ doctor?.name }} · {{ slot }}</p>
      <label>Жалобы *</label>
      <textarea v-model="form.complaints" rows="3" placeholder="Опишите симптомы"></textarea>
      <label>Хронические заболевания</label>
      <textarea v-model="form.chronic" rows="2" placeholder="Если есть"></textarea>
      <div class="grid">
        <div>
          <label>Рост, см *</label>
          <input v-model="form.height" type="number" min="50" max="250" />
        </div>
        <div>
          <label>Вес, кг *</label>
          <input v-model="form.weight" type="number" min="20" max="300" />
        </div>
      </div>
      <label>Результаты анализов</label>
      <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt" @change="handleFile" />
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <button class="primary-btn" :disabled="isSubmitting" @click="submit">
        {{ isSubmitting ? 'Отправка...' : 'Записаться' }}
      </button>
    </div>
  </div>
</template>
