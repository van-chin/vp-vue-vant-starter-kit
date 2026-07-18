import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

/**
 * Day.js 插件配置
 *
 * 按需加载：仅保留常用插件，减少包体积。
 * 如需更多插件，参考 https://day.js.org/docs/en/plugin/plugin
 * 并在此处添加 extend() 调用。
 */
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(updateLocale);

/** 设置默认语言 */
dayjs.locale('zh-cn');

/** 设置全局默认时区（可选） */
// dayjs.tz.setDefault('Asia/Shanghai')

/** 自定义相对时间显示 */
dayjs.updateLocale('zh-cn', {
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '几秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年',
  },
});

/** 导出 dayjs 实例 */
export default dayjs;

/** 常用格式化预设 */
export const DATE_FORMATS = {
  /** 年-月-日 */
  DATE: 'YYYY-MM-DD',
  /** 时:分:秒 */
  TIME: 'HH:mm:ss',
  /** 年-月-日 时:分:秒 */
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  /** 年/月/日 */
  DATE_SLASH: 'YYYY/MM/DD',
  /** 年月日 */
  DATE_CN: 'YYYY年MM月DD日',
  /** 月-日 */
  MONTH_DAY: 'MM-DD',
  /** 年-月 */
  YEAR_MONTH: 'YYYY-MM',
  /** 时:分 */
  HOUR_MINUTE: 'HH:mm',
} as const;

/** 格式化日期 */
export const formatDate = (
  date?: dayjs.ConfigType,
  format: string = DATE_FORMATS.DATETIME,
): string => {
  return dayjs(date).format(format);
};

/** 获取相对时间 */
export const getRelativeTime = (date?: dayjs.ConfigType): string => {
  return dayjs(date).fromNow();
};

/** 获取时间间隔描述 */
export const getTimeDuration = (start?: dayjs.ConfigType, end?: dayjs.ConfigType): string => {
  return dayjs.duration(dayjs(end).diff(dayjs(start))).humanize();
};
