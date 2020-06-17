<template lang="pug">
  .s-main(@touchmove.stop.prevent="")
    //- 骨架
    .e-absolute(v-for="(item, index) in blocks" :key="index" :class="{ chiaroscuro: loading === 'chiaroscuro' }" :style="item.style")
    //- spin动画
    .spinbox(v-if="loading === 'spin'"): span.spin
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getArgType } from '@/util'

// 需要绘制的块
const ELEMENTS = ['audio', 'button', 'canvas', 'code', 'img', 'input', 'pre', 'svg', 'textarea', 'video', 'xmp']

interface SkeletonDomOptions {
  width: string;
  height: string;
  top: string;
  left: string;
  background?: string;
  radius: string;
  subClass?: string;
}

@Component
export default class Skeleton extends Vue {
  // 选择器字符串
  @Prop({
    type: String,
    default: '.skeleton'
  })
  selector!: string

  // 骨架屏的动画样式，有 spin 和 chiaroscuro 两种
  @Prop({
    type: String,
    default: 'spin'
  })
  loading!: string

  // 可视视窗宽高
  win_w: number = window.innerWidth
  win_h: number = window.innerHeight

  // 绘制数组
  blocks: { class: string; style: string }[] = []

  // 只允许输入两种动画类型中的一种
  get loadingAnimation () {
    return ['spin', 'chiaroscuro'].includes(this.loading) ? this.loading : 'spin'
  }

  mounted () {
    setTimeout(() => {
      this.draw()
    }, 500)
  }

  draw () {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const { isHideStyle, includeElement, getStyle, getPadding, getRect, drawBlock, wPercent, hPercent, $parent, win_w: winW, win_h: winH } = this
    const root = document.querySelector(this.selector) as HTMLElement
    const nodes = root.childNodes

    function deepFindNode (nodes: NodeList) {
      if (nodes.length) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i] as HTMLElement
          // 剔除不可见元素
          const parent: Vue & { includeElement?: (node: HTMLElement, cb: (options: SkeletonDomOptions) => void) => boolean } = $parent
          if (isHideStyle(node) ||
          // eslint-disable-next-line eqeqeq
          (parent.includeElement && getArgType(parent.includeElement) === 'function' && parent.includeElement(node, drawBlock) == false)) continue

          const childNodes = node.childNodes
          let hasChildText = false
          let backgroundHasUrl = getStyle(node, 'backgroundImage').match(/url\(.+?\)/)
          backgroundHasUrl = backgroundHasUrl && backgroundHasUrl.length

          for (let j = 0; j < childNodes.length; j++) {
            if (childNodes[j].nodeType === 3 && (childNodes[j].textContent || '').trim().length) {
              hasChildText = true
              break
            }
          }

          if (includeElement(ELEMENTS, node) ||
            backgroundHasUrl ||
            (node.nodeType === 3 && (node.textContent || '').trim().length) || hasChildText) {
            const { t, l, w, h } = getRect(node)

            if (w && h && l && t && w > 0 && h > 0 && t > 0 && l > 0 && l < winW && winH - t >= 20) {
              const { pt, pb, pl, pr } = getPadding(node)
              drawBlock({
                width: wPercent(w - pl - pr),
                height: hPercent(h - pt - pb),
                top: hPercent(t + pt),
                left: wPercent(l + pl),
                radius: getStyle(node, 'border-radius')
              })
            }
          } else if (childNodes && childNodes.length) {
            if (!hasChildText) deepFindNode(childNodes)
          }
        }
      }
    }

    deepFindNode(nodes)
  }

  drawBlock ({ width, height, top, left, background = '#f5f5f5', radius, subClass }: SkeletonDomOptions) {
    const styles = [`height:${height}%`, `background:${background}`]

    if (!subClass) {
      styles.push(`width:${width}%`, `top:${top}%`, `left:${left}%`)
    }

    radius && radius !== '0px' && styles.push(`border-radius:${radius}`)

    this.blocks.push({ class: subClass || '', style: styles.join(';') })
  }

  includeElement (elements: string[], node: HTMLElement) {
    return elements.includes((node.tagName || '').toLowerCase())
  }

  isHideStyle (node: HTMLElement) {
    const { getStyle } = this
    return getStyle(node, 'display') === 'none' || getStyle(node, 'visibility') === 'hidden' || getStyle(node, 'opacity') === '0' || node.hidden
  }

  getStyle (node: HTMLElement, attr: string) {
    return (node.nodeType === 1 ? (getComputedStyle(node) as any)[attr] : '') || ''
  }

  getRect (node: HTMLElement) {
    if (!node) return {}
    const { top: t, left: l, width: w, height: h } = node.getBoundingClientRect()
    return { t, l, w, h }
  }

  getPadding (node: HTMLElement) {
    return {
      pt: parseFloat(this.getStyle(node, 'paddingTop')),
      pb: parseFloat(this.getStyle(node, 'paddingBottom')),
      pl: parseFloat(this.getStyle(node, 'paddingLeft')),
      pr: parseFloat(this.getStyle(node, 'paddingRight'))
    }
  }

  wPercent (num: number): string {
    return parseFloat((num / this.win_w * 100).toString()).toFixed(3)
  }

  hPercent (num: number): string {
    return parseFloat((num / this.win_h * 100).toString()).toFixed(3)
  }
}
</script>

<style lang="scss" scoped>
@import "../style/skeleton.scss"
</style>
