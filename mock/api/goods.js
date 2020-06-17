/* eslint-disable @typescript-eslint/camelcase */
const { mock, Random } = require('mockjs')

function categories () {
  return mock({
    code: 0,
    'data|20': [
      {
        'id|+1': 1,
        'name|1': ['手机', '电脑', '平板', '智能手表', '零食', '衣服']
      }
    ],
    msg: ''
  })
}

function categoryGoods () {
  return mock({
    code: 0,
    data: {
      'goods|12': [
        {
          brief: Random.paragraph(10),
          gbn: Random.cname(),
          'goods_id|+1': 400,
          'has_store|1': [0, 1],
          'image|1': ['http://127.0.0.1:91/public/images/26/15/53/1c22bf6c10581d2f5ae301bd6ae90b3f1a2c94dd.png', 'http://127.0.0.1:91/public/images/0d/fa/c2/e00454cc387b54719aba029386d512fc3e70b023.png'],
          'is_egou|1': [0, 1],
          price: Random.natural(800, 9000),
          product_id: Random.natural(8000, 9000)
        }
      ],
      state: []
    },
    msg: ''
  })
}

// api数组，每个对象包括api的相对路径和mock数据函数
module.exports = [
  {
    apiName: '/ebuy_index/categories',
    data: categories
  },
  {
    apiName: '/ebuy_index/getCategoryGoods',
    data: categoryGoods
  }
]
