# 东软环保公众监督系统前端

基于 `Vue3 + Vite + Element Plus + Vue Router + ECharts` 的四端基础版前端项目。

## 功能范围

- 公众监督员端：注册、登录、提交空气质量反馈、查看历史反馈。
- 系统管理员端：登录、查看反馈、指派网格员、查看统计数据。
- 网格员端：登录、查看任务、查看任务详情、提交 AQI 检测确认数据。
- 决策者端：查看空气质量统计可视化大屏。

当前项目使用 localStorage mock 数据完成前端演示闭环，暂未接真实后端。

## 运行方式

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
```

## 默认账号

| 角色 | 账号 | 密码 |
| --- | --- | --- |
| 公众监督员 | `13800138000` | `123456` |
| 系统管理员 | `admin` | `123456` |
| 网格员 | `GM001` - `GM009` | `123456` |

## 演示流程

1. 公众监督员登录或注册。
2. 进入 `/supervisor/feedback` 提交空气质量反馈。
3. 管理员登录后进入 `/admin/feedbacks` 查看反馈。
4. 管理员进入 `/admin/assign/:id` 指派网格员。
5. 网格员登录后进入 `/grid/tasks` 查看任务。
6. 网格员进入 `/grid/confirm/:id` 提交 SO2、CO、PM2.5、AQI 检测数据。
7. 管理员可在 `/admin/statistics` 查看确认记录。
8. 决策者可在 `/decision/dashboard` 查看 ECharts 数据大屏。

## 说明

- 当前接口文件位于 `src/api`，现阶段返回 mock 数据。
- 省份、网格区域已通过 `gridProvince`、`gridCity` 接口层动态加载，后端联调时替换接口实现即可。
- mock 数据位于 `src/mock`，通过 localStorage 持久化。
- `src/api/request.js` 已预留 Axios 配置，供后续后端联调使用。
