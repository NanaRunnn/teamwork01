package com.neusoft.nep.mapper;

import com.neusoft.nep.model.entity.GridMember;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GridMemberMapper {

    GridMember selectByCodeAndPassword(@Param("code") String code, @Param("password") String password);

    List<GridMember> selectByProvinceIdAndCityId(@Param("provinceId") String provinceId, @Param("cityId") String cityId);

    GridMember selectById(@Param("id") String id);
}
