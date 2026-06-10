-- ==========================================
-- 东软环保公众监督系统 数据库初始化脚本
-- ==========================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS nep DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE nep;

-- ==========================================
-- 1. 省份表
-- ==========================================
DROP TABLE IF EXISTS grid_province;
CREATE TABLE grid_province (
    id VARCHAR(32) PRIMARY KEY COMMENT '省份ID',
    name VARCHAR(50) NOT NULL COMMENT '省份名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='网格省份';

INSERT INTO grid_province (id, name) VALUES
('P001', '北京市'),
('P002', '天津市'),
('P003', '河北省'),
('P004', '山西省'),
('P005', '辽宁省'),
('P006', '上海市'),
('P007', '江苏省'),
('P008', '浙江省'),
('P009', '广东省'),
('P010', '四川省');

-- ==========================================
-- 2. 城市表
-- ==========================================
DROP TABLE IF EXISTS grid_city;
CREATE TABLE grid_city (
    id VARCHAR(32) PRIMARY KEY COMMENT '城市ID',
    province_id VARCHAR(32) NOT NULL COMMENT '所属省份ID',
    name VARCHAR(50) NOT NULL COMMENT '城市/区名称',
    CONSTRAINT fk_city_province FOREIGN KEY (province_id) REFERENCES grid_province(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='网格城市';

INSERT INTO grid_city (id, province_id, name) VALUES
('C001', 'P001', '朝阳区'),
('C002', 'P001', '海淀区'),
('C003', 'P001', '丰台区'),
('C004', 'P001', '东城区'),
('C005', 'P002', '和平区'),
('C006', 'P002', '河西区'),
('C007', 'P003', '石家庄市'),
('C008', 'P003', '唐山市'),
('C009', 'P004', '太原市'),
('C010', 'P004', '大同市'),
('C011', 'P005', '沈阳市'),
('C012', 'P005', '大连市'),
('C013', 'P006', '浦东新区'),
('C014', 'P006', '静安区'),
('C015', 'P007', '南京市'),
('C016', 'P007', '苏州市'),
('C017', 'P008', '杭州市'),
('C018', 'P008', '宁波市'),
('C019', 'P009', '广州市'),
('C020', 'P009', '深圳市'),
('C021', 'P010', '成都市'),
('C022', 'P010', '绵阳市');

-- ==========================================
-- 3. 公众监督员表
-- ==========================================
DROP TABLE IF EXISTS supervisor;
CREATE TABLE supervisor (
    id VARCHAR(32) PRIMARY KEY COMMENT '监督员ID',
    phone VARCHAR(20) NOT NULL UNIQUE COMMENT '手机号',
    password VARCHAR(64) NOT NULL COMMENT '登录密码',
    real_name VARCHAR(50) NOT NULL COMMENT '真实姓名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='公众监督员';

INSERT INTO supervisor (id, phone, password, real_name) VALUES
('S001', '13800138000', '123456', '张三'),
('S002', '13900139000', '123456', '李静'),
('S003', '13700137000', '123456', '王伟');

-- ==========================================
-- 4. 网格员表
-- ==========================================
DROP TABLE IF EXISTS grid_member;
CREATE TABLE grid_member (
    id VARCHAR(32) PRIMARY KEY COMMENT '网格员ID',
    code VARCHAR(20) NOT NULL UNIQUE COMMENT '登录编码',
    password VARCHAR(64) NOT NULL COMMENT '登录密码',
    real_name VARCHAR(50) NOT NULL COMMENT '真实姓名',
    phone VARCHAR(20) COMMENT '手机号',
    province_id VARCHAR(32) COMMENT '所属省份ID',
    city_id VARCHAR(32) COMMENT '所属城市ID',
    work_status INT DEFAULT 1 COMMENT '工作状态(1:空闲 0:忙碌)',
    CONSTRAINT fk_member_province FOREIGN KEY (province_id) REFERENCES grid_province(id),
    CONSTRAINT fk_member_city FOREIGN KEY (city_id) REFERENCES grid_city(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='网格员';

INSERT INTO grid_member (id, code, password, real_name, phone, province_id, city_id, work_status) VALUES
('G001', 'GM001', '123456', '李四', '13600136000', 'P001', 'C001', 1),
('G002', 'GM002', '123456', '王宁', '13500135000', 'P001', 'C002', 1),
('G003', 'GM003', '123456', '赵敏', '13400134000', 'P003', 'C007', 1),
('G004', 'GM004', '123456', '陈强', '13300133000', 'P005', 'C011', 1),
('G005', 'GM005', '123456', '刘洋', '13200132000', 'P007', 'C015', 1);

-- ==========================================
-- 5. 系统管理员表
-- ==========================================
DROP TABLE IF EXISTS admins;
CREATE TABLE admins (
    id VARCHAR(32) PRIMARY KEY COMMENT '管理员ID',
    code VARCHAR(20) NOT NULL UNIQUE COMMENT '管理员编码',
    password VARCHAR(64) NOT NULL COMMENT '登录密码',
    real_name VARCHAR(50) COMMENT '真实姓名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统管理员';

INSERT INTO admins (id, code, password, real_name) VALUES
('A001', 'admin', '123456', '系统管理员');

-- ==========================================
-- 6. 空气质量反馈表
-- ==========================================
DROP TABLE IF EXISTS aqi_feedback;
CREATE TABLE aqi_feedback (
    id VARCHAR(32) PRIMARY KEY COMMENT '反馈ID',
    supervisor_id VARCHAR(32) NOT NULL COMMENT '监督员ID',
    grid_member_id VARCHAR(32) COMMENT '指派的网格员ID',
    province_id VARCHAR(32) COMMENT '省份ID',
    city_id VARCHAR(32) COMMENT '城市ID',
    estimated_aqi INT COMMENT '预估AQI(0-500)',
    description TEXT COMMENT '反馈描述',
    status INT DEFAULT 0 COMMENT '状态(0:未处理 1:已指派 2:已确认)',
    create_time DATETIME COMMENT '创建时间',
    CONSTRAINT fk_feedback_supervisor FOREIGN KEY (supervisor_id) REFERENCES supervisor(id),
    CONSTRAINT fk_feedback_member FOREIGN KEY (grid_member_id) REFERENCES grid_member(id),
    CONSTRAINT fk_feedback_province FOREIGN KEY (province_id) REFERENCES grid_province(id),
    CONSTRAINT fk_feedback_city FOREIGN KEY (city_id) REFERENCES grid_city(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AQI反馈';

INSERT INTO aqi_feedback (id, supervisor_id, grid_member_id, province_id, city_id, estimated_aqi, description, status, create_time) VALUES
('F001', 'S001', 'G001', 'P001', 'C001', 86, '附近有明显异味，空气质量较差', 2, '2026-05-01 10:00:00'),
('F002', 'S002', 'G002', 'P001', 'C002', 120, '工地扬尘严重，建议检测', 2, '2026-05-02 14:30:00'),
('F003', 'S003', 'G003', 'P003', 'C007', 55, '近期雾霾较重，能见度低', 2, '2026-05-03 09:15:00'),
('F004', 'S001', NULL, 'P005', 'C011', 150, '工厂排放刺鼻气体', 0, '2026-05-10 16:45:00'),
('F005', 'S002', 'G001', 'P001', 'C001', 35, '今日空气质量良好', 1, '2026-05-11 08:30:00'),
('F006', 'S003', NULL, 'P007', 'C015', 200, '有大量焚烧秸秆，浓烟滚滚', 0, '2026-05-12 11:00:00');

-- ==========================================
-- 7. AQI检测确认/统计表
-- ==========================================
DROP TABLE IF EXISTS statistics;
CREATE TABLE statistics (
    id VARCHAR(32) PRIMARY KEY COMMENT '统计记录ID',
    feedback_id VARCHAR(32) NOT NULL COMMENT '反馈ID',
    grid_member_id VARCHAR(32) NOT NULL COMMENT '网格员ID',
    so2 DOUBLE COMMENT 'SO2浓度(μg/m³)',
    co DOUBLE COMMENT 'CO浓度(mg/m³)',
    pm25 DOUBLE COMMENT 'PM2.5浓度(μg/m³)',
    aqi INT COMMENT '实测AQI(0-500)',
    confirm_time DATETIME COMMENT '确认时间',
    CONSTRAINT fk_stat_feedback FOREIGN KEY (feedback_id) REFERENCES aqi_feedback(id),
    CONSTRAINT fk_stat_member FOREIGN KEY (grid_member_id) REFERENCES grid_member(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AQI检测确认';

INSERT INTO statistics (id, feedback_id, grid_member_id, so2, co, pm25, aqi, confirm_time) VALUES
('T001', 'F001', 'G001', 20.5, 0.8, 68.2, 95, '2026-05-01 15:00:00'),
('T002', 'F002', 'G002', 35.2, 1.2, 108.5, 135, '2026-05-02 18:00:00'),
('T003', 'F003', 'G003', 15.3, 0.5, 42.1, 62, '2026-05-03 14:20:00');
