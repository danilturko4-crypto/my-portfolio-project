<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import ProfitList from './components/ProfitList.vue'
import ExpenseList from './components/ExpenseList.vue'

const store = useStore()

const pTitle = ref('')
const pAmount = ref(0)
const eTitle = ref('')
const eAmount = ref(0)
const eCat = ref('еда')

const addP = () => {
  if(pAmount.value > 0 && pTitle.value.trim()) {
    store.commit('ADD_INCOME', {
      id: Date.now(), 
      title: pTitle.value, 
      number: Number(pAmount.value), 
      date: new Date().toLocaleDateString('ru-RU')
    })
    pTitle.value = '';
    pAmount.value = 0
  }
}

const addE = () => {
  if(eAmount.value > 0 && eTitle.value.trim()) {
    store.commit('ADD_EXPENSE', {
      id: Date.now(), 
      title: eTitle.value,
      number: Number(eAmount.value),
      category: eCat.value,
      date: new Date().toLocaleDateString('ru-RU')
    })
    eTitle.value = ''
    eAmount.value = 0
  }
}
</script>

<template>
  <div class="app">
    <header class="header">
      <h1 class="app-title">💰 Finance Manager</h1>
      <div class="balance-display">
        <span class="balance-label">Текущий баланс:</span>
        <span class="balance-amount" :class="{ positive: store.getters.balance >= 0, negative: store.getters.balance < 0 }">
          {{ store.getters.balance }}₸
        </span>
      </div>
    </header>

    <main class="main-container">
      <div class="left-panel">
        <div class="stats-cards">
          <div class="stat-card income-stat">
            <div class="stat-icon">↑</div>
            <div class="stat-info">
              <div class="stat-label">Общий доход</div>
              <div class="stat-value positive">{{ store.getters.totalIncome }}₸</div>
            </div>
          </div>
          
          <div class="stat-card expense-stat">
            <div class="stat-icon">↓</div>
            <div class="stat-info">
              <div class="stat-label">Общий расход</div>
              <div class="stat-value negative">{{ store.getters.totalExpense }}₸</div>
            </div>
          </div>
          
          <div class="stat-card max-profit">
            <div class="stat-label">Максимальная прибыль</div>
            <div class="stat-value">{{ store.getters.maxIncome }}₸</div>
          </div>
          
          <div class="stat-card max-expense">
            <div class="stat-label">Максимальный расход</div>
            <div class="stat-value">{{ store.getters.maxExpense }}₸</div>
          </div>
        </div>

        <div class="add-forms">
          <div class="form-card income-form">
            <h3 class="form-title">➕ Добавить новый доход</h3>
            <input 
              v-model="pTitle" 
              placeholder="Название дохода..."
              class="form-input"
            >
            <input 
              v-model="pAmount" 
              type="number" 
              min="0"
              placeholder="Amount"
              class="form-input"
            >
            <button 
              @click="addP" 
              class="submit-btn income-btn"
              :disabled="!pTitle.trim() || pAmount <= 0"
            >
              Добавить доход
            </button>
          </div>

          <div class="form-card expense-form">
            <h3 class="form-title">➖ Добавить новый расход</h3>
            <input 
              v-model="eTitle" 
              placeholder="Название расходов..."
              class="form-input"
            >
            <input 
              v-model="eAmount" 
              type="number" 
              min="0"
              placeholder="Amount"
              class="form-input"
            >
            <select v-model="eCat" class="form-select">
              <option value="еда">🍕 Еда</option>
              <option value="одежда">👕 Одежда</option>
              <option value="транспорт">🚗 Транспорт</option>
              <option value="остальное">📦 Другой</option>
            </select>
            <button 
              @click="addE" 
              class="submit-btn expense-btn"
              :disabled="!eTitle.trim() || eAmount <= 0"
            >
              Добавить расходы
            </button>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <ProfitList />
        <ExpenseList />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  background: white;
  border-radius: 16px;
  padding: 24px 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #2d6a4f 0%, #40916c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.balance-display {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.balance-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.balance-amount {
  font-size: 32px;
  font-weight: 700;
}

.balance-amount.positive {
  color: #2d6a4f;
}

.balance-amount.negative {
  color: #bc4749;
}

.main-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.income-stat {
  border-left: 4px solid #2d6a4f;
}

.expense-stat {
  border-left: 4px solid #bc4749;
}

.max-profit, .max-expense {
  border-left: 4px solid #6c757d;
}

.stat-card .stat-icon {
  font-size: 24px;
  margin-bottom: 12px;
}

.income-stat .stat-icon {
  color: #2d6a4f;
}

.expense-stat .stat-icon {
  color: #bc4749;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
}

.stat-value.positive {
  color: #2d6a4f;
}

.stat-value.negative {
  color: #bc4749;
}

.add-forms {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.form-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.form-input, .form-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 15px;
  margin-bottom: 12px;
  transition: all 0.2s ease;
  background: white;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #40916c;
  box-shadow: 0 0 0 3px rgba(64, 145, 108, 0.1);
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23666' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.income-btn {
  background: linear-gradient(135deg, #2d6a4f 0%, #40916c 100%);
  color: white;
}

.income-btn:not(:disabled):hover {
  background: linear-gradient(135deg, #255c43 0%, #38805e 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(45, 106, 79, 0.2);
}

.expense-btn {
  background: linear-gradient(135deg, #bc4749 0%, #d85658 100%);
  color: white;
}

.expense-btn:not(:disabled):hover {
  background: linear-gradient(135deg, #a93e40 0%, #c44c4e 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(188, 71, 73, 0.2);
}

.right-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 1200px) {
  .main-container {
    grid-template-columns: 1fr;
  }
  
  .right-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .balance-display {
    align-items: flex-start;
  }
  
  .stats-cards {
    grid-template-columns: 1fr;
  }
  
  .app {
    padding: 16px;
  }
}
</style>