package com.neusoft.nep.service;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.model.entity.Supervisor;

public interface SupervisorService {

    Result<?> register(Supervisor supervisor);

    Result<?> login(String phone, String password);

    Result<?> getById(String id);
}
