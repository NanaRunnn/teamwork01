package com.neusoft.nep.model.entity;

import java.util.Date;

public class Statistics {

    private String id;
    private String feedbackId;
    private String gridMemberId;
    private Double so2;
    private Double co;
    private Double pm25;
    private Integer aqi;
    private Date confirmTime;

    // 联表查询附加字段
    private String gridMemberName;
    private String provinceName;
    private String cityName;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getFeedbackId() { return feedbackId; }
    public void setFeedbackId(String feedbackId) { this.feedbackId = feedbackId; }
    public String getGridMemberId() { return gridMemberId; }
    public void setGridMemberId(String gridMemberId) { this.gridMemberId = gridMemberId; }
    public Double getSo2() { return so2; }
    public void setSo2(Double so2) { this.so2 = so2; }
    public Double getCo() { return co; }
    public void setCo(Double co) { this.co = co; }
    public Double getPm25() { return pm25; }
    public void setPm25(Double pm25) { this.pm25 = pm25; }
    public Integer getAqi() { return aqi; }
    public void setAqi(Integer aqi) { this.aqi = aqi; }
    public Date getConfirmTime() { return confirmTime; }
    public void setConfirmTime(Date confirmTime) { this.confirmTime = confirmTime; }
    public String getGridMemberName() { return gridMemberName; }
    public void setGridMemberName(String gridMemberName) { this.gridMemberName = gridMemberName; }
    public String getProvinceName() { return provinceName; }
    public void setProvinceName(String provinceName) { this.provinceName = provinceName; }
    public String getCityName() { return cityName; }
    public void setCityName(String cityName) { this.cityName = cityName; }
}
