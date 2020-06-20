<template lang="pug">
  .tabbar-page
    Nav(tabbar title="购物车")
    cart(:style="`paddingTop: ${navHeight}px`")
    tabbar(selected="cart")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import tabbar from '@/components/tabbar.vue'
import cart from '@/components/cart.vue'

const appModule = namespace('app')

@Component({
  components: {
    tabbar,
    cart
  }
})
export default class Cart extends Vue {
  @appModule.State navHeight!: number
}
</script>

<style lang="scss" scoped>
</style>
