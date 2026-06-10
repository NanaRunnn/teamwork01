package com.neusoft.nep.service;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.model.entity.Statistics;

public interface StatisticsService {

    Result<?> save(Statistics statistics);

    Result<?> listAll();

    Result<?> provinceItemTotal();

    Result<?> aqiDistribute();
}
