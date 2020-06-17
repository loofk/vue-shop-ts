/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [cancelOrder↗](http://127.0.0.1:3000/project/11/interface/api/234) 的 **请求类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/cancelOrder`
 * @更新时间 `2020-06-12 11:20:41`
 */
export interface CancelOrderRequest {
  order_id: string
}

/**
 * 接口 [cancelOrder↗](http://127.0.0.1:3000/project/11/interface/api/234) 的 **返回类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/cancelOrder`
 * @更新时间 `2020-06-12 11:20:41`
 */
export interface CancelOrderResponse {}

/**
 * 接口 [createOrder↗](http://127.0.0.1:3000/project/11/interface/api/219) 的 **请求类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/createOrder`
 * @更新时间 `2020-06-12 11:18:12`
 */
export interface CreateOrderRequest {
  addr_id?: string
  code?: string[]
  is_ins?: boolean
  is_invoice?: number
  is_shipped?: boolean
  productIds?: {}
  record_id?: number
  tax_text?: string
  tax_type?: string
}

/**
 * 接口 [createOrder↗](http://127.0.0.1:3000/project/11/interface/api/219) 的 **返回类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/createOrder`
 * @更新时间 `2020-06-12 11:18:12`
 */
export interface CreateOrderResponse {}

/**
 * 接口 [delivery↗](http://127.0.0.1:3000/project/11/interface/api/269) 的 **请求类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/delivery`
 * @更新时间 `2020-06-12 11:34:07`
 */
export interface DeliveryRequest {
  order_id: string
  logi_no: string
}

/**
 * 接口 [delivery↗](http://127.0.0.1:3000/project/11/interface/api/269) 的 **返回类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/delivery`
 * @更新时间 `2020-06-12 11:34:07`
 */
export interface DeliveryResponse {
  logi_name?: string
  logi_no?: string
  flow?: {
    desc?: string
    date?: string
    time?: string
  }[]
}

/**
 * 接口 [editOrderInvoice↗](http://127.0.0.1:3000/project/11/interface/api/239) 的 **请求类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/editOrderInvoice`
 * @更新时间 `2020-06-12 11:22:07`
 */
export interface EditOrderInvoiceRequest {
  ship_bank?: string
  ship_bank_no?: string
  tax_code?: string
  tax_company?: string
  tax_company_addr?: string
  tax_company_tel?: string
  tax_type?: string
}

/**
 * 接口 [editOrderInvoice↗](http://127.0.0.1:3000/project/11/interface/api/239) 的 **返回类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/editOrderInvoice`
 * @更新时间 `2020-06-12 11:22:07`
 */
export interface EditOrderInvoiceResponse {}

/**
 * 接口 [getOrderDeliveryNews↗](http://127.0.0.1:3000/project/11/interface/api/249) 的 **请求类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/getOrderDeliveryNews`
 * @更新时间 `2020-06-12 11:24:58`
 */
export interface GetOrderDeliveryNewsRequest {}

/**
 * 接口 [getOrderDeliveryNews↗](http://127.0.0.1:3000/project/11/interface/api/249) 的 **返回类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/getOrderDeliveryNews`
 * @更新时间 `2020-06-12 11:24:58`
 */
export type GetOrderDeliveryNewsResponse = string

/**
 * 接口 [getOrderInvoiceStatus↗](http://127.0.0.1:3000/project/11/interface/api/244) 的 **请求类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/getOrderInvoiceStatus`
 * @更新时间 `2020-06-12 11:23:47`
 */
export interface GetOrderInvoiceStatusRequest {
  order_id: string
}

/**
 * 接口 [getOrderInvoiceStatus↗](http://127.0.0.1:3000/project/11/interface/api/244) 的 **返回类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/getOrderInvoiceStatus`
 * @更新时间 `2020-06-12 11:23:47`
 */
export interface GetOrderInvoiceStatusResponse {
  invoice_status: number
}

/**
 * 接口 [orderDetail↗](http://127.0.0.1:3000/project/11/interface/api/229) 的 **请求类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/orderDetail`
 * @更新时间 `2020-06-12 11:20:05`
 */
export interface OrderDetailRequest {
  order_id: string
}

/**
 * 接口 [orderDetail↗](http://127.0.0.1:3000/project/11/interface/api/229) 的 **返回类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/orderDetail`
 * @更新时间 `2020-06-12 11:20:05`
 */
export interface OrderDetailResponse {
  order_id?: string
  member_id?: string
  cost_item?: string
  final_amount?: string
  ship_name?: string
  ship_mobile?: string
  ship_addr?: string
  payment?: string
  pay_status?: string
  ship_status?: string
  received_status?: string
  createtime?: string
  status?: string
  cancel?: number
  order_status?: number
  invoice?: {
    tax_type?: string
    tax_title?: string
    tax_code?: string
    tax_addr?: string
    tax_tel?: string
    tax_bank?: string
    tax_account?: string
    invoice_status?: string
  }
  is_ins?: string
  is_shipped?: string
  logi_no?: string
  canceltime?: number
  order_items?: {
    goods_id?: string
    product_id?: string
    name?: string
    image_id?: string
    price?: string
    num?: string
    amount?: string
    brief?: string
    product_attr?: {
      [s: string]: {
        label?: string
        value?: string
      }
    }
    product_attr_str?: string
  }[]
}

/**
 * 接口 [orderList↗](http://127.0.0.1:3000/project/11/interface/api/224) 的 **请求类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/myOrderList`
 * @更新时间 `2020-06-12 11:19:16`
 */
export interface MyOrderListRequest {
  page: number
}

/**
 * 接口 [orderList↗](http://127.0.0.1:3000/project/11/interface/api/224) 的 **返回类型**
 *
 * @分类 [订单↗](http://127.0.0.1:3000/project/11/interface/api/cat_42)
 * @请求头 `POST /ebuy_order/myOrderList`
 * @更新时间 `2020-06-12 11:19:16`
 */
export type MyOrderListResponse = {
  order_id: string
  member_id: string
  cost_item: string
  createtime: string
  pay_status: string
  ship_status: string
  received_status: string
  canceltime: number
  cancel: number
  order_items: {
    goods_id: string
    product_id: string
    name: string
    image_id: string
    price: string
    num: string
    amount: string
    brief: string
    product_attr: {
      [s: string]: {
        label?: string
        value?: string
      }
    }
    product_attr_str: string
  }[]
  order_status: number
  logi_no: string
}[]

/* prettier-ignore-end */
