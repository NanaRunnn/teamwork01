package com.neusoft.nep.service;

import com.neusoft.nep.common.Result;

public interface GridMemberService {

    Result<?> login(String code, String password);

    Result<?> listByProvinceAndCity(String provinceId, String cityId);
}
