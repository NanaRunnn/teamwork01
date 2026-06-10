package com.neusoft.nep.model.entity;

import java.util.Date;

public class AqiFeedback {

    private String id;
    private String supervisorId;
    private String gridMemberId;
    private String provinceId;
    private String cityId;
    private Integer estimatedAqi;
    private String description;
    private Integer status;  // 0:未处理 1:已指派 2:已确认
    private Date createTime;

    // 联表查询附加字段
    private String supervisorRealName;
    private String supervisorPhone;
    private String gridMemberName;
    private String provinceName;
    private String cityName;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSupervisorId() { return supervisorId; }
    public void setSupervisorId(String supervisorId) { this.supervisorId = supervisorId; }
    public String getGridMemberId() { return gridMemberId; }
    public void setGridMemberId(String gridMemberId) { this.gridMemberId = gridMemberId; }
    public String getProvinceId() { return provinceId; }
    public void setProvinceId(String provinceId) { this.provinceId = provinceId; }
    public String getCityId() { return cityId; }
    public void setCityId(String cityId) { this.cityId = cityId; }
    public Integer getEstimatedAqi() { return estimatedAqi; }
    public void setEstimatedAqi(Integer estimatedAqi) { this.estimatedAqi = estimatedAqi; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }
    public Date getCreateTime() { return createTime; }
    public void setCreateTime(Date createTime) { this.createTime = createTime; }
    public String getSupervisorRealName() { return supervisorRealName; }
    public void setSupervisorRealName(String supervisorRealName) { this.supervisorRealName = supervisorRealName; }
    public String getSupervisorPhone() { return supervisorPhone; }
    public void setSupervisorPhone(String supervisorPhone) { this.supervisorPhone = supervisorPhone; }
    public String getGridMemberName() { return gridMemberName; }
    public void setGridMemberName(String gridMemberName) { this.gridMemberName = gridMemberName; }
    public String getProvinceName() { return provinceName; }
    public void setProvinceName(String provinceName) { this.provinceName = provinceName; }
    public String getCityName() { return cityName; }
    public void setCityName(String cityName) { this.cityName = cityName; }
}
