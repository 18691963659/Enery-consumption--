import flexbile from './flexible'

export default {
  mounted() {
    flexbile()
  },
  beforeRouteLeave(to, from, next) {
    // this.show = false
    document.body.style.fontSize = ''
    document.documentElement.style.fontSize = ''
    next()
  }
}
