/**
 * API 相关类型定义
 */

/**
 * 获取用户签名响应
 */
export interface GetUserSigResponse {
  /** 过期时间 */
  expire: number;
  /** 用户登录 Tencent Cloud Chat 的密码 */
  userSig: string;
}

/**
 * 登录响应
 */
export interface LoginResponse {
  /** 登录凭证 */
  accessToken: string;
  /** 刷新凭证 */
  refreshToken: string;
  /** 过期时间 */
  expiresTime: string;
  /** 用户名 */
  user: string;
}

/**
 * 登录请求参数
 */
export interface LoginParams {
  username: string;
  password: string;
}

/**
 * 阿里云 OSS STS 临时凭证响应
 */
export interface STSResponse {
  accessKeyId: string;
  accessKeySecret: string;
  securityToken: string;
  bucketName: string;
  endpoint: string;
  expiration: string;
}

/**
 * 获取用户签名请求参数
 */
export interface UserSigParams {
  userId: string;
}
