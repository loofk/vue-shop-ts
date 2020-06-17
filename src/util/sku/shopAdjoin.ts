/**
 * 商品SKU级联选择实例类，继承至邻接矩阵类
 * @author l00465606
 */
import Adjoin from '@/lib/adjoin'

// 声明文件
import { SkuSimpleOptions, ProductSimpleOptions } from './sku'

class ShopAdjoin extends Adjoin {
  // 所有可能的规格值数组
  commoditySpecs: SkuSimpleOptions[];
  // 产品列表
  data: ProductSimpleOptions[];

  constructor (commoditySpecs: SkuSimpleOptions[], data: ProductSimpleOptions[]) {
    super(commoditySpecs.reduce((total: string[], current) => [...total, ...current.list], []))
    this.commoditySpecs = commoditySpecs
    this.data = data

    // 初始化各个产品之间邻接关系
    this.initCommodity()

    // 初始化同类顶点之间邻接关系
    this.initSimilar()
  }

  initCommodity () {
    this.data.forEach(item => {
      this.applyCommodity(item.specs)
    })
  }

  initSimilar () {
    // 获取所有可选项
    const specsOption = this.getCollection(this.vertex)
    this.commoditySpecs.forEach(item => {
      const params: string[] = []
      specsOption.forEach(value => {
        if (item.list.indexOf(value) > -1) {
          params.push(value)
        }
      })
      this.applyCommodity(params)
    })
  }

  // 购物类注册邻接点，这里把自己也算进去，即自己的邻接点包含自己，符合商品sku选择实际情况
  applyCommodity (params: string[]) {
    params.forEach(param => {
      this.setAdjoinVertexs(param, params)
    })
  }

  // 根据传入的选项筛出可选项
  querySpecsOption (params: string[]): string[] {
    let res = []
    // 判断一下有无传入参数
    if (params.some(Boolean)) {
      res = this.getUnions(params.filter(Boolean))
    } else {
      res = this.getCollection(this.vertex)
    }

    return res
  }
}

export { ShopAdjoin }
