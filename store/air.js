export const state = () => ({
  history: [],
  allPrice:0
})
export const mutations = {
  setHistory(state, data) {
    // 在数组前面添加数据
    state.history.unshift(data)
  },
  setAllPrice(state,price){
    state.allPrice = price
  }
}
