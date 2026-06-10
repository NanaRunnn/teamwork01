package com.neusoft.nep.service.impl;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.mapper.GridProvinceMapper;
import com.neusoft.nep.model.entity.GridProvince;
import com.neusoft.nep.service.GridProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GridProvinceServiceImpl implements GridProvinceService {

    @Autowired
    private GridProvinceMapper gridProvinceMapper;

    @Override
    public Result<?> listAll() {
        List<GridProvince> list = gridProvinceMapper.selectAll();
        return Result.success(list);
    }
}
