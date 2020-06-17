/* eslint-disable @typescript-eslint/camelcase */
import { post } from '@/util'

// 声明文件
import * as goods from '@/types/api/goods'

class Goods {
  /**
   * 获取首页运营数据（焦点图、广告图、首页推荐产品、门店配置）
   * @param null
   * @returns {Promise}
   */
  index () {
    return post<goods.GetIndexInfoResponse>('ebuy_index/getIndexInfo')
  }

  /**
   * 获取商品虚拟分类
   * @param null
   * @returns {Promise}
   */
  getCategories () {
    return post<goods.CategoriesResponse>('ebuy_index/categories')
  }

  /**
   * 根据分类ID获取分类下的商品数据
   * @param cateID 分类项ID
   * @returns {Promise}
   */
  getCategoryGoods (cateID: number) {
    return post<goods.GetCategoryGoodsResponse>('ebuy_index/getCategoryGoods', { cate_id: cateID })
  }
}

export default new Goods()
