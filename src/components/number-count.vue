<template lang="pug">
  .number-count.e-flex_center(:class="[countSize ? 'count-' + countSize : '', { 'is-disabled': countDisabled }, { 'is-without-controls': !controls }]")
    //- 减
    i.icon.icon-minus.count-descrease(:class="{ 'is-disabled': minDisabled }" @click.stop="descrease" v-if="controls")

    //- 输入框
    input.count-input(
      type="number"
      :value="displayValue"
      :disabled="countDisabled"
      :min="min"
      :max="max"
      @blur="handleInputConfirm"
      @focus="handleFocus"
      @input="handleInput")

    //- 加
    i.icon.icon-add.count-increase(:class="{ 'is-disabled': maxDisabled }" @click.stop="increase" v-if="controls")
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class NumberCount extends Vue {
  // 绑定值
  @Prop()
  value: any

  // 最小值
  @Prop({
    type: Number,
    default: -Infinity
  })
  min!: number

  // 最大值
  @Prop({
    type: Number,
    default: Infinity
  })
  max!: number

  // 精度
  @Prop(Number)
  precision!: number

  // 步长
  @Prop({
    type: Number,
    default: 1
  })
  step!: number

  // 输入是否只能是步长倍数
  @Prop({
    type: Boolean,
    default: false
  })
  stepStrictly!: boolean

  // 计步器尺寸，值包含 small 和 large
  @Prop({
    type: String,
    default: 'small'
  })
  size!: string

  // 是否禁用计步器
  @Prop({
    type: Boolean,
    default: false
  })
  disabled!: boolean

  // 是否显示控制按钮（加、减）
  @Prop({
    type: Boolean,
    default: true
  })
  controls!: boolean

  // 计算并约束后得到的最新值
  currentValue = 0
  // 用户输入的值
  userInput: string | null = null

  // 取数值精度
  get numPrecision () {
    const { step, precision, getPrecision, value } = this
    const stepPrecision = getPrecision(step)
    if (precision !== undefined) {
      // 判断精度和步长的精度是否合理
      if (stepPrecision > precision) {
        console.warn(`${this.$options.name}组件报错：步长的精度不能超过设置的精度，步长多余部分被截取`)
      }
      return precision
    } else {
      // 如果未设置精度参数，这里取较大精度是为了防止无法计算步长完整值
      return Math.max(getPrecision(value), stepPrecision)
    }
  }

  get countSize () {
    return this.size
  }

  get countDisabled () {
    return this.disabled
  }

  get minDisabled () {
    return this._descrease(this.value, this.step) < this.min
  }

  get maxDisabled () {
    return this._increase(this.value, this.step) > this.max
  }

  get displayValue () {
    // 如果用户输入了值就展示该值
    if (this.userInput !== null) return this.userInput

    let currentValue = this.currentValue

    if (typeof currentValue === 'number') {
      currentValue = this.fixValue(currentValue)
      this.$emit('input', currentValue)
    }
    return currentValue
  }

  // 立即以value的当前值触发handle回调
  @Watch('value', { immediate: true })
  onHandleValue (value: number) {
    let newValue = value
    if (isNaN(newValue)) return

    newValue = this.fixValue(newValue)

    this.currentValue = newValue
    this.userInput = null
    this.$emit('input', newValue)
  }

  // 取得参数的精度位数
  getPrecision (value: number | undefined) {
    if (value === undefined) return 0

    const valueString = value.toString()
    const dotPosition = valueString.indexOf('.')
    let precision = 0

    // 如果存在小数
    if (dotPosition !== -1) {
      precision = valueString.length - dotPosition - 1
    }

    return precision
  }

  // 将数值调整到指定精度
  toPrecision (num: number) {
    const precisionFactor = Math.pow(10, this.numPrecision)
    return Math.round(num * precisionFactor) / precisionFactor
  }

  // 处理值使其符合步长倍数约束、精度、范围要求
  fixValue (val: number | undefined) {
    let newVal = val === undefined ? val : Number(val)

    if (newVal === undefined) return 0

    // 步长倍数约束
    if (this.stepStrictly) {
      const stepPrecision = this.getPrecision(this.step)
      const precisionFactor = Math.pow(10, stepPrecision)
      newVal = (Math.round(newVal / this.step) * precisionFactor * this.step) / precisionFactor
    }

    // 精度约束
    newVal = this.toPrecision(newVal)

    // 范围约束
    if (newVal <= this.min) newVal = this.min
    if (newVal >= this.max) newVal = this.max

    return newVal
  }

  // 内部使用的减方法
  _descrease (val: number, step: number) {
    // 如果传入的计算数非数字，返回当前值
    if (typeof val !== 'number' && val !== undefined) {
      return this.currentValue
    }

    // 为解决JS计算可能出现的精度差，将小数计算转化成整数计算
    const precisionFactor = Math.pow(10, this.numPrecision)
    return this.toPrecision((val * precisionFactor - step * precisionFactor) / precisionFactor)
  }

  // 内部使用的加方法
  _increase (val: number, step: number) {
    // 如果传入的计算数非数字，返回当前值
    if (typeof val !== 'number' && val !== undefined) {
      return this.currentValue
    }

    const precisionFactor = Math.pow(10, this.numPrecision)
    return this.toPrecision((val * precisionFactor + step * precisionFactor) / precisionFactor)
  }

  // 减控件触发的减方法
  descrease () {
    // 如果控件不可用或者不能再减时点击无效
    if (this.countDisabled) return

    // 如果控件不能再减时toast提示
    if (this.minDisabled) {
      this.$toast('不能再减少了哦')
      return
    }

    const value = this.value || this.min
    const newVal = this._descrease(value, this.step)
    this.setCurrentValue(newVal)
  }

  // 加控件触发的加方法
  increase () {
    // 如果控件不可用时点击无效
    if (this.countDisabled) return

    // 如果控件不能再加时toast提示
    if (this.maxDisabled) {
      this.$toast('不能购买更多哦')
      return
    }

    const value = this.value || this.min
    const newVal = this._increase(value, this.step)
    this.setCurrentValue(newVal)
  }

  // 根据改变后的新值设置当前值
  setCurrentValue (newVal: number) {
    const oldVal = this.currentValue
    if (typeof newVal === 'number') {
      newVal = this.toPrecision(newVal)
    }

    if (newVal <= this.min) newVal = this.min
    if (newVal >= this.max) newVal = this.max
    // console.log(oldVal, newVal);

    if (oldVal === newVal) return

    this.userInput = null
    // 每次修改值后广播事件
    this.$emit('input', newVal)
    this.$emit('confirm', newVal, oldVal)
    this.currentValue = newVal
  }

  // 输入框失去焦点抛出事件
  @Emit('blur')
  handleBlur (event: InputEvent) {
    return event
  }

  // 输入框获得焦点抛出事件
  @Emit('focus')
  handleFocus (event: InputEvent) {
    return event
  }

  // 监听用户实时输入并记录下来
  handleInput (event: InputEvent) {
    const target = event.target as HTMLInputElement
    this.userInput = target.value
  }

  // 点击完成按钮时触发
  handleInputConfirm (event: InputEvent) {
    const target = (event.target as HTMLInputElement)
    const value = target.value
    const newVal = value === '' ? undefined : Number(value)

    this.userInput = null

    // 输入转化值为NaN时，不改变原值
    if (!isNaN(Number(newVal))) {
      this.setCurrentValue(newVal as number)
    }
  }
}
</script>

<style lang="scss" scoped>
.number-count {
  width: 100px;
  height: 25px;

  &.is-disabled .count-descrease,
  &.is-disabled .count-increase {
    color: #e4e7ed;
  }
  &.is-without-controls {
  }
}

.count-small {
  width: 80px;

  .count-descrease,
  .count-increase {
    height: 21px;
    line-height: 21px;
  }
}

.count-large {
}

.count-descrease, .count-increase {
  display: inline-block;
  text-align: center;
  font-size: 22px;
  color: #939393;
  background: $e-gray;
  border-radius: 3px;
  &.is-disabled {
    color: #ddd;
  }
}

.count-input {
  display: inline-block;
  width: 25px;
  height: 20px;
  margin: 0 5px;
  line-height: 1;
  font-size: 12px;
  text-align: center;
  color: $e-3;
  border: none;
}
</style>
