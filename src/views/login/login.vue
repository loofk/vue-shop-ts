<template lang="pug">
  .login.e-txtC.e-flex_center
    h3 登录
    input(v-model="token")
    //- mt-button(type="default" size="normal" @click="login") 登录
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import wxlogin from 'vue-wxlogin'

@Component({
  components: {
    wxlogin
  }
})
export default class Login extends Vue {
  token = ''
  login () {
    this.$toast('登录成功')
  }
}
</script>

<style lang="scss" scoped>
.login {

}
</style>
