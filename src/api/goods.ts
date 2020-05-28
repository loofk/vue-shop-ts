import { post } from '@/util/request/index'

class Goods {
  /**
   * 获取首页运营数据（焦点图、广告图、首页推荐产品、门店配置）
   * @param null
   * @returns {Promise}
   */
  index (): Promise<any> {
    return post('ebuy_index/getIndexInfo')
  }
}

export default new Goods()
