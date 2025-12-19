import { createStore } from 'vuex';


export default createStore({
  state: {
    expenses: [],
    incomes: []
  },
  mutations: {
    ADD_INCOME(state, payload) { state.incomes.push(payload) },
    ADD_EXPENSE(state, payload) { state.expenses.push(payload) },
    REMOVE_INCOME(state, id) { state.incomes = state.incomes.filter(i => i.id !== id) },
    REMOVE_EXPENSE(state, id) { state.expenses = state.expenses.filter(e => e.id !== id) }
  },
  getters: {
    totalIncome: state => state.incomes.reduce((sum, i) => sum + i.number, 0),
    totalExpense: state => state.expenses.reduce((sum, e) => sum + e.number, 0),
    balance: (state, getters) => getters.totalIncome - getters.totalExpense,
    maxIncome: state => state.incomes.length ? Math.max(...state.incomes.map(i => i.number)) : 0,
    maxExpense: state => state.expenses.length ? Math.max(...state.expenses.map(e => e.number)) : 0,
    categoryStats: state => {
      const cats = { еда: 0, одежда: 0, транспорт: 0, остальное: 0 }
      state.expenses.forEach(e => { if(cats[e.category] !== undefined) cats[e.category] += e.number })
      return cats
    }
  }
})