import { post } from '@/util'

// 声明文件
import * as cart from '@/types/api/cart'

class Cart {
  /**
   * 获取购物车列表
   * @param null
   * @returns {Promise}
   */
  getItems () {
    return post<cart.GetItemsResponse>('cart/getItems')
  }

  /**
   * 获取购物车商品总数
   * @param null
   * @returns {Promise}
   */
  getCartCount () {
    return post<cart.GetCountResponse>('cart/getCount')
  }

  /**
   * 加入商品到购物车列表
   * @param {Object} data
   * @returns {Promise}
   */
  addItem (cartData: cart.AddItemRequest) {
    return post<cart.AddItemResponse>('cart/addItem', cartData)
  }

  /**
   * 购物车删除商品
   * @param {String}
   * @returns {Promise}
   */
  deleteItem (ident: string) {
    return post<cart.DeleteItemResponse>('cart/deleteItem', { ident })
  }

  /**
   * 购物车修改商品数量
   * @param {Object} {obj_ident: num}
   * @returns {Promise}
   */
  updateItemNum (data: { [s: string]: number }) {
    return post<cart.BatchUpdateItemNumResponse>('cart/batchUpdateItemNum', { items: data })
  }

  /**
   * 购物车商品全选
   * @param {Number}
   * @returns {Promise}
   */
  setAllSelected (selected: number) {
    return post<cart.SetAllSelectedResponse>('cart/setAllSelected', { selected })
  }

  /**
   * 购物车单个商品选中/取消
   * @param {String, Number}
   * @returns {Promise}
   */
  setItemSelected (ident: string, selected: number) {
    return post<cart.SetItemSelectedResponse>('cart/setItemSelected', { ident, selected })
  }

  /**
   * 通过购物车下单成功后删除购物车中选中商品
   * @param {String, Number}
   * @returns {Promise}
   */
  deleteSelectedItems () {
    return post<cart.DeleteAllSelectedResponse>('cart/deleteAllSelected')
  }
}

export default new Cart()
