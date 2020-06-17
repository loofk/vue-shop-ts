/* eslint-disable @typescript-eslint/camelcase */
import { post } from '@/util'

// 声明文件
import * as order from '@/types/api/order'

class Order {
  /**
   * 创建订单
   * @param Object
   * @returns {Promise}
   */
  createOrder (createOrderData: order.CreateOrderRequest) {
    return post<order.CreateOrderResponse>('ebuy_order/createOrder', createOrderData)
  }

  /**
   * 订单列表
   */
  orderList (page: number) {
    return post<order.MyOrderListResponse>('ebuy_order/myOrderList', { page })
  }

  /**
   * 订单详情
   */
  orderDetail (orderId: string) {
    return post<order.OrderDetailResponse>('ebuy_order/orderDetail', { order_id: orderId })
  }

  /**
   * 取消订单
   */
  cancelOrder (orderId: string) {
    return post<order.CancelOrderResponse>('ebuy_order/cancelOrder', { order_id: orderId })
  }

  /**
   * 修改订单发票信息
   */
  editOrderInvoice (data: order.EditOrderInvoiceRequest) {
    return post<order.EditOrderInvoiceResponse>('ebuy_order/editOrderInvoice', data)
  }

  /**
   * 获取订单开票状态
   */
  getOrderInvoiceStatus (orderId: string) {
    return post<order.GetOrderInvoiceStatusResponse>('ebuy_order/getOrderInvoiceStatus', { order_id: orderId })
  }

  /**
   * 获取订单结算页物流通知
   */
  getOrderDeliveryNews () {
    return post<order.GetOrderDeliveryNewsResponse>('ebuy_order/getOrderDeliveryNews')
  }
}

export default new Order()
