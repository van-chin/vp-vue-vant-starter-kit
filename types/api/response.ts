/**
 * 统一 API 响应类型
 * 服务端 (server/) 与客户端 (src/) 共享
 */

/** 统一 API 响应结构 */
export interface ApiResponse<T = unknown> {
  /** 业务状态码，0 表示成功 */
  code: number | string;
  /** 响应消息 */
  message: string;
  /** 响应数据 */
  data: T;
}

/** 分页响应结构 */
export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  /** 总条数 */
  total: number;
  /** 当前页码 */
  page: number;
  /** 每页条数 */
  pageSize: number;
}

/** 业务错误码 */
export const BizCode = {
  /** 业务错误 */
  ERROR: '1000400',
  /** 未授权 */
  UNAUTHORIZED: '***',
} as const;
