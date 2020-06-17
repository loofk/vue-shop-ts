/* @flow */

/**
 * 老的sku选择算法，该算法使用遍历的方法，每次都向下搜索一层并判断有无库存，
 * 优势是简单易用，不需要事先构造出一个复杂的矩阵类
 * 劣势是只能往下搜索一层，这样不能在一开始就发现有些不可点击的sku
 * 在目前数据量前提下，两种方式无性能瓶颈
 * @author l00465606
 */

// 声明文件
import { SkuSimpleOptions, ProductSimpleOptions } from './sku'

type MatchDataOptions = {
  [s: string]: ProductSimpleOptions;
}

class SkuSelect {
  skuList: SkuSimpleOptions[];
  productList: ProductSimpleOptions[];
  matchData: MatchDataOptions; // 以该产品的sku数组为键存放该产品的所有信息

  constructor (skuList: SkuSimpleOptions[], productList: ProductSimpleOptions[]) {
    this.skuList = skuList
    this.productList = productList
    this.matchData = this.productList.reduce((total: MatchDataOptions, cur) => ({ ...total, [cur.specs.toString()]: cur }), {})
  }

  // 检查对应的sku组合是否存在
  checkStore (params: string[]): boolean {
    // 路径完整时才进行判断
    if (params.every(Boolean)) {
      return !!this.matchData[params.toString()]
    }
    return true
  }

  // 根据传入的查询数组，自动遍历出所有可能路径
  querySpecsOption (params: string[]): string[] {
    let tmp: string[] = []
    const res: string[] = []
    tmp = params.map(item => item || '')
    this.skuList.forEach((ele, index) => {
      const last = tmp[index]
      ele.list.forEach(value => {
        tmp[index] = value
        this.checkStore(tmp) && res.push(value)
      })
      tmp[index] = last
    })

    return res
  }
}

export { SkuSelect }
