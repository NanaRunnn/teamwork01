package com.neusoft.nep.service;

import com.neusoft.nep.common.Result;

public interface GridCityService {

    Result<?> listByProvinceId(String provinceId);
}
