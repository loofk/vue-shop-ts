<template lang="pug">
  .login.e-txtC.e-flex_center
    h3 登录
    input(v-model="token")
    mt-button(type="default" size="normal" @click="login") 登录
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { setToken } from '@/util'

@Component
export default class Login extends Vue {
  token = ''
  login () {
    if (!this.token) {
      this.$toast('请输入正确的token')
      return
    }
    setToken(this.token)
    this.$toast('登录成功')
    setTimeout(() => {
      this.$nav.toHome()
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.login {

}
</style>
