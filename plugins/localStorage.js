plugins: [{ src: '~/plugins/localStorage.js', ssr: false }]
// ~/plugins/localStorage.js
//官方文档： https://github.com/robinvdvleuten/vuex-persistedstate#createpersistedstateoptions
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState( )(store)
  })
}