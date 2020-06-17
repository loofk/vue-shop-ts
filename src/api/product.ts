/* eslint-disable @typescript-eslint/camelcase */
import { post } from '@/util'

// 声明文件
import * as product from '@/types/api/product'

class Product {
  /**
   * 根据product_id获取商品的sku信息和产品列表
   * @param {String} productId
   */
  goodsSku (productId: string) {
    return post<product.GetGoodsInfoResponse>('ebuy_index/getGoodsInfo', { product_id: productId })
  }

  /**
   * 根据product_id获取规格参数和图文详情
   * @param product_id
   * @returns {Promise}
   */
  picSpecific (productId: string) {
    return post<product.GetPicSpecificResponse>('ebuy_index/getPicSpecific', { product_id: productId })
  }

  /**
   * 根据product_id获取规格参数
   * @param product_id
   * @returns {Promise}
   */
  specific (productId: string) {
    return post('ebuy_index/getSpecific', { product_id: productId })
  }

  /**
   * 根据product_id获取图文详情
   * @param product_id
   * @returns {Promise}
   */
  picDetail (productId: string) {
    return post('ebuy_index/getPicDetail', { product_id: productId })
  }

  /**
   * 根据product_id获取小程序码
   * @param product_id
   * @returns {Promise}
   */
  getMpCode (productId: string) {
    return post<product.GetMpCodeResponse>('goods/getMpCode', { product_id: productId })
  }
}

export default new Product()
