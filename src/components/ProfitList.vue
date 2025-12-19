<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const items = computed(() => store.state.incomes)
</script>

<template>
  <div class="list-section">
    <div class="list-header">
      <h3 class="title">📈 СПИСОК ДОХОДОВ</h3>
      <span class="count-badge">{{ items.length }} items</span>
    </div>

    <div v-if="items.length === 0" class="empty-state">
      <div class="empty-icon">💸</div>
      <p class="empty-text">No income records yet</p>
    </div>

    <div v-else class="articles">
      <div
        v-for="item in items"
        :key="item.id"
        class="article-card"
      >
        <div class="card-icon">
          <span class="icon-income">↑</span>
        </div>
        
        <div class="info">
          <div class="info-main">
            <span class="name">{{ item.title }}</span>
            <span class="amount positive">+{{ item.number }}₸</span>
          </div>
          <div class="info-footer">
            <span class="date">{{ item.date }}</span>
            <span class="category">Доход</span>
          </div>
        </div>

        <button
          @click="store.commit('REMOVE_INCOME', item.id)"
          class="del-btn"
          title="Delete"
        >
          <svg class="del-icon" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="total-bar">
      <div class="total-info">
        <span class="total-label">СУММА ДОХОДА:</span>
        <span class="total-amount">{{ store.getters.totalIncome }}₸</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 600px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #2d6a4f;
  display: flex;
  align-items: center;
  gap: 8px;
}

.count-badge {
  background: #e8f5e9;
  color: #2d6a4f;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-text {
  margin: 0;
  font-size: 16px;
  color: #666;
}

.articles {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
}

.articles::-webkit-scrollbar {
  width: 6px;
}

.articles::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.articles::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.articles::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.article-card {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.article-card:hover {
  background: white;
  border-color: #e0e0e0;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.card-icon {
  width: 40px;
  height: 40px;
  background: rgba(45, 106, 79, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-income {
  color: #2d6a4f;
  font-size: 18px;
  font-weight: bold;
}

.info {
  flex: 1;
  min-width: 0;
}

.info-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.name {
  font-weight: 600;
  font-size: 15px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.amount {
  font-weight: 700;
  font-size: 16px;
  margin-left: 12px;
  flex-shrink: 0;
}

.amount.positive {
  color: #2d6a4f;
}

.info-footer {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #888;
}

.category {
  background: rgba(45, 106, 79, 0.1);
  color: #2d6a4f;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.del-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.del-btn:hover {
  background: rgba(220, 53, 69, 0.2);
  transform: scale(1.1);
}

.del-icon {
  transition: transform 0.2s ease;
}

.del-btn:hover .del-icon {
  transform: rotate(90deg);
}

.total-bar {
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #2d6a4f 0%, #40916c 100%);
  color: white;
  border-radius: 12px;
}

.total-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-weight: 600;
  font-size: 15px;
  opacity: 0.9;
}

.total-amount {
  font-weight: 700;
  font-size: 20px;
}

@media (max-width: 768px) {
  .list-section {
    height: auto;
    max-height: 500px;
  }
  
  .info-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .amount {
    margin-left: 0;
  }
}
</style>