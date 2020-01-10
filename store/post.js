export const state = () => ({
    DraftsList: []
})
export const mutations = {
    setDrafts(state, data) {
    state.DraftsList = data
  }
}
