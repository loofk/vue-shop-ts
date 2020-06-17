/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [addAddr↗](http://127.0.0.1:3000/project/11/interface/api/89) 的 **请求类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/createNewAddr`
 * @更新时间 `2020-06-12 09:55:59`
 */
export interface CreateNewAddrRequest {
  addr: string
  city: string
  district: string
  mobile: string
  name: string
  province: string
}

/**
 * 接口 [addAddr↗](http://127.0.0.1:3000/project/11/interface/api/89) 的 **返回类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/createNewAddr`
 * @更新时间 `2020-06-12 09:55:59`
 */
export interface CreateNewAddrResponse {
  province?: string
  city?: string
  district?: string
  addr?: string
  name?: string
  mobile?: string
  district_id?: string
  default?: boolean
  area?: string
  addr_id?: string
}

/**
 * 接口 [addrDefault↗](http://127.0.0.1:3000/project/11/interface/api/74) 的 **请求类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/getDefaultAddr`
 * @更新时间 `2020-06-12 09:12:07`
 */
export interface GetDefaultAddrRequest {
  addr_id: string
}

/**
 * 接口 [addrDefault↗](http://127.0.0.1:3000/project/11/interface/api/74) 的 **返回类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/getDefaultAddr`
 * @更新时间 `2020-06-12 09:12:07`
 */
export interface GetDefaultAddrResponse {
  addr_id?: string
  member_id?: string
  name?: string
  lastname?: string
  firstname?: string
  area?: string
  addr?: string
  zip?: string
  tel?: string
  mobile?: string
  day?: string
  time?: string
  def_addr?: string
  region_package?: string
  district_id?: string
  province?: string
  city?: string
  district?: string
  area_id?: string
  area_name?: string
}

/**
 * 接口 [addrDetail↗](http://127.0.0.1:3000/project/11/interface/api/84) 的 **请求类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/getDetail`
 * @更新时间 `2020-06-12 09:50:21`
 */
export interface GetDetailRequest {
  addr_id: string
}

/**
 * 接口 [addrDetail↗](http://127.0.0.1:3000/project/11/interface/api/84) 的 **返回类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/getDetail`
 * @更新时间 `2020-06-12 09:50:21`
 */
export interface GetDetailResponse {
  addr_id?: string
  member_id?: string
  name?: string
  lastname?: string
  firstname?: string
  area?: string
  addr?: string
  zip?: string
  tel?: string
  mobile?: string
  day?: string
  time?: string
  def_addr?: string
  region_package?: string
  district_id?: string
  province?: string
  city?: string
  district?: string
  area_id?: string
  area_name?: string
  original_mobile?: string
}

/**
 * 接口 [addrList↗](http://127.0.0.1:3000/project/11/interface/api/79) 的 **请求类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/index`
 * @更新时间 `2020-06-12 09:47:31`
 */
export interface IndexRequest {}

/**
 * 接口 [addrList↗](http://127.0.0.1:3000/project/11/interface/api/79) 的 **返回类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/index`
 * @更新时间 `2020-06-12 09:47:31`
 */
export type IndexResponse = {
  addr_id?: string
  member_id?: string
  name?: string
  lastname?: string
  firstname?: string
  area?: string
  addr?: string
  zip?: string
  tel?: string
  mobile?: string
  day?: string
  time?: string
  def_addr?: string
  region_package?: string
  district_id?: string
  province?: string
  city?: string
  district?: string
  area_id?: string
  area_name?: string
}[]

/**
 * 接口 [delAddr↗](http://127.0.0.1:3000/project/11/interface/api/64) 的 **请求类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/delete`
 * @更新时间 `2020-06-11 20:53:07`
 */
export interface DeleteRequest {
  addr_id: string
}

/**
 * 接口 [delAddr↗](http://127.0.0.1:3000/project/11/interface/api/64) 的 **返回类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/delete`
 * @更新时间 `2020-06-11 20:53:07`
 */
export interface DeleteResponse {}

/**
 * 接口 [editAddr↗](http://127.0.0.1:3000/project/11/interface/api/94) 的 **请求类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/save`
 * @更新时间 `2020-06-12 09:59:09`
 */
export interface SaveRequest {
  addr_id: string
  addr: string
  area_name: string
  default: string
  district_id: string
  mobile: string
  name: string
}

/**
 * 接口 [editAddr↗](http://127.0.0.1:3000/project/11/interface/api/94) 的 **返回类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/save`
 * @更新时间 `2020-06-12 09:59:09`
 */
export interface SaveResponse {
  addr_id?: number
}

/**
 * 接口 [getDistrictID↗](http://127.0.0.1:3000/project/11/interface/api/99) 的 **请求类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/getDistrictID`
 * @更新时间 `2020-06-12 10:02:42`
 */
export interface GetDistrictIdRequest {
  province: string
  city: string
  district: string
  addr: string
}

/**
 * 接口 [getDistrictID↗](http://127.0.0.1:3000/project/11/interface/api/99) 的 **返回类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /member_addr/getDistrictID`
 * @更新时间 `2020-06-12 10:02:42`
 */
export interface GetDistrictIdResponse {
  area?: string
  city?: string
  addr?: string
  province_id?: string
  city_id?: string
  district_id?: string
  area_id?: string
}

/**
 * 接口 [getRegions↗](http://127.0.0.1:3000/project/11/interface/api/69) 的 **请求类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /regions`
 * @更新时间 `2020-06-11 21:05:23`
 */
export interface RegionsRequest {}

/**
 * 接口 [getRegions↗](http://127.0.0.1:3000/project/11/interface/api/69) 的 **返回类型**
 *
 * @分类 [地址↗](http://127.0.0.1:3000/project/11/interface/api/cat_19)
 * @请求头 `POST /regions`
 * @更新时间 `2020-06-11 21:05:23`
 */
export interface RegionsResponse {}

/* prettier-ignore-end */
