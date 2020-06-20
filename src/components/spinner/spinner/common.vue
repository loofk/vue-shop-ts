<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Common extends Vue {
  // 图标大小
  @Prop(Number)
  size!: number

  // 图标颜色
  @Prop(String)
  color!: string

  parent: Vue & { size?: number; color?: string } = this.$parent

  get spinnerSize () {
    return (this.size || this.parent.size || 28) + 'px'
  }

  get spinnerColor () {
    return this.color || this.parent.color || '#ccc'
  }
}
</script>
