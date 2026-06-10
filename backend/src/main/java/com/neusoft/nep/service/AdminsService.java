package com.neusoft.nep.service;

import com.neusoft.nep.common.Result;

public interface AdminsService {

    Result<?> login(String code, String password);
}
