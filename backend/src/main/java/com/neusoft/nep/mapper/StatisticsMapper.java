package com.neusoft.nep.mapper;

import com.neusoft.nep.model.entity.Statistics;

import java.util.List;
import java.util.Map;

public interface StatisticsMapper {

    int insert(Statistics statistics);

    List<Statistics> selectAll();

    List<Map<String, Object>> selectProvinceItemTotal();

    List<Map<String, Object>> selectAqiDistribute();

    Statistics selectById(@Param("id") String id);
}
