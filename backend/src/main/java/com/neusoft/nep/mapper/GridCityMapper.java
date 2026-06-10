package com.neusoft.nep.mapper;

import com.neusoft.nep.model.entity.GridCity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GridCityMapper {

    List<GridCity> selectByProvinceId(@Param("provinceId") String provinceId);
}
