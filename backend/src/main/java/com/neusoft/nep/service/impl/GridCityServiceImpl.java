package com.neusoft.nep.service.impl;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.mapper.GridCityMapper;
import com.neusoft.nep.model.entity.GridCity;
import com.neusoft.nep.service.GridCityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GridCityServiceImpl implements GridCityService {

    @Autowired
    private GridCityMapper gridCityMapper;

    @Override
    public Result<?> listByProvinceId(String provinceId) {
        if (provinceId == null || provinceId.trim().isEmpty()) {
            return Result.error("省份ID不能为空");
        }
        List<GridCity> list = gridCityMapper.selectByProvinceId(provinceId);
        return Result.success(list);
    }
}
