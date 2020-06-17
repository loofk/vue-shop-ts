/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [deleteInvoiceByRecordId↗](http://127.0.0.1:3000/project/11/interface/api/214) 的 **请求类型**
 *
 * @分类 [发票↗](http://127.0.0.1:3000/project/11/interface/api/cat_27)
 * @请求头 `POST /member_invoice/delete`
 * @更新时间 `2020-06-12 11:15:12`
 */
export interface DeleteRequest {
  record_id: number
}

/**
 * 接口 [deleteInvoiceByRecordId↗](http://127.0.0.1:3000/project/11/interface/api/214) 的 **返回类型**
 *
 * @分类 [发票↗](http://127.0.0.1:3000/project/11/interface/api/cat_27)
 * @请求头 `POST /member_invoice/delete`
 * @更新时间 `2020-06-12 11:15:12`
 */
export interface DeleteResponse {}

/**
 * 接口 [getInvoiceInfoByRecordId↗](http://127.0.0.1:3000/project/11/interface/api/204) 的 **请求类型**
 *
 * @分类 [发票↗](http://127.0.0.1:3000/project/11/interface/api/cat_27)
 * @请求头 `POST /member_invoice/getInvoice`
 * @更新时间 `2020-06-12 11:13:08`
 */
export interface GetInvoiceRequest {
  record_id: number
}

/**
 * 接口 [getInvoiceInfoByRecordId↗](http://127.0.0.1:3000/project/11/interface/api/204) 的 **返回类型**
 *
 * @分类 [发票↗](http://127.0.0.1:3000/project/11/interface/api/cat_27)
 * @请求头 `POST /member_invoice/getInvoice`
 * @更新时间 `2020-06-12 11:13:08`
 */
export interface GetInvoiceResponse {
  record_id?: string
  tax_company?: string
  tax_code?: string
  tax_company_addr?: string
  tax_company_tel?: string
  ship_bank?: string
  ship_bank_no?: string
}

/**
 * 接口 [getInvoiceList↗](http://127.0.0.1:3000/project/11/interface/api/199) 的 **请求类型**
 *
 * @分类 [发票↗](http://127.0.0.1:3000/project/11/interface/api/cat_27)
 * @请求头 `POST /member_invoice/index`
 * @更新时间 `2020-06-12 11:12:01`
 */
export interface IndexRequest {}

/**
 * 接口 [getInvoiceList↗](http://127.0.0.1:3000/project/11/interface/api/199) 的 **返回类型**
 *
 * @分类 [发票↗](http://127.0.0.1:3000/project/11/interface/api/cat_27)
 * @请求头 `POST /member_invoice/index`
 * @更新时间 `2020-06-12 11:12:01`
 */
export type IndexResponse = {
  record_id: string
  tax_company: string
  tax_code: string
  tax_company_addr: string
  tax_company_tel: string
  ship_bank: string
  ship_bank_no: string
}[]

/**
 * 接口 [saveInvoice↗](http://127.0.0.1:3000/project/11/interface/api/209) 的 **请求类型**
 *
 * @分类 [发票↗](http://127.0.0.1:3000/project/11/interface/api/cat_27)
 * @请求头 `POST /member_invoice/save`
 * @更新时间 `2020-06-12 11:14:28`
 */
export interface SaveRequest {
  ship_bank?: string
  ship_bank_no?: string
  tax_code?: string
  tax_company?: string
  tax_company_addr?: string
  tax_company_tel?: string
}

/**
 * 接口 [saveInvoice↗](http://127.0.0.1:3000/project/11/interface/api/209) 的 **返回类型**
 *
 * @分类 [发票↗](http://127.0.0.1:3000/project/11/interface/api/cat_27)
 * @请求头 `POST /member_invoice/save`
 * @更新时间 `2020-06-12 11:14:28`
 */
export interface SaveResponse {
  record_id?: number
}

/* prettier-ignore-end */
