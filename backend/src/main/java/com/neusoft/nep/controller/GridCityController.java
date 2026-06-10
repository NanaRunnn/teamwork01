package com.neusoft.nep.controller;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.service.GridCityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gridCity")
public class GridCityController {

    @Autowired
    private GridCityService gridCityService;

    /**
     * 根据省份查询城市列表
     * GET /api/gridCity/listGridCityByProvinceId?provinceId=P001
     */
    @GetMapping("/listGridCityByProvinceId")
    public Result<?> listGridCityByProvinceId(@RequestParam String provinceId) {
        return gridCityService.listByProvinceId(provinceId);
    }
}
