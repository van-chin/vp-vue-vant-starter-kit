import { defineHandler } from 'nitro';
import type { ApiResponse, TabItem } from '#types';

export default defineHandler(async (): Promise<ApiResponse<TabItem[]>> => {
  const tabItems: TabItem[] = [
    { key: '100', label: '用户管理', customIcon: 'ant-design:user-outlined' },
    { key: '2352', label: '历史技能等级', customIcon: 'ant-design:file-text-outlined' },
    { key: '101', label: '角色管理', customIcon: 'ant-design:team-outlined' },
    { key: '102', label: '菜单管理', customIcon: 'ant-design:appstore-outlined' },
    { key: '103', label: '组织架构', customIcon: 'ant-design:clock-circle-outlined' },
    { key: '104', label: '岗位管理', customIcon: 'ant-design:table-outlined' },
    { key: '2242', label: '字典管理', customIcon: 'ant-design:credit-card-outlined' },
    { key: '2346', label: '机手库', customIcon: 'ant-design:bar-chart-outlined' },
    { key: '2168', label: '考勤统计', customIcon: 'ant-design:property-safety-outlined' },
    { key: '2169', label: '考勤规则', customIcon: 'ant-design:book-outlined' },
    { key: '2217', label: '打卡记录', customIcon: 'ant-design:car-outlined' },
    { key: '2341', label: '考勤流程', customIcon: 'ant-design:database-outlined' },
    { key: '1187', label: '流程表单', customIcon: 'ant-design:clock-circle-outlined' },
    { key: '1209', label: '用户分组', customIcon: 'ant-design:area-chart-outlined' },
    { key: '1193', label: '流程模型', customIcon: 'ant-design:heat-map-outlined' },
    { key: '2294', label: '客户管理', customIcon: 'ant-design:pie-chart-outlined' },
    { key: '2295', label: '合同管理', customIcon: 'ant-design:android-outlined' },
    { key: '2296', label: '公共文件', customIcon: 'ant-design:slack-outlined' },
    { key: '2297', label: '流程文件', customIcon: 'ant-design:kubernetes-outlined' },
  ];

  return {
    code: 0,
    message: 'success!',
    data: tabItems,
  };
});
