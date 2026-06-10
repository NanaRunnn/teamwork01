package com.neusoft.nep.service;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.model.entity.AqiFeedback;

public interface AqiFeedbackService {

    Result<?> save(AqiFeedback feedback);

    Result<?> listBySupervisorId(String supervisorId);

    Result<?> listByGridMemberId(String gridMemberId);

    Result<?> listAll(Integer status, String provinceId, String cityId);

    Result<?> assign(String feedbackId, String gridMemberId, Integer status);
}
