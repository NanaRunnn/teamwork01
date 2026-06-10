package com.neusoft.nep.controller;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.service.GridProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gridProvince")
public class GridProvinceController {

    @Autowired
    private GridProvinceService gridProvinceService;

    /**
     * 查询省份列表
     * GET /api/gridProvince/listGridProvinceAll
     */
    @GetMapping("/listGridProvinceAll")
    public Result<?> listGridProvinceAll() {
        return gridProvinceService.listAll();
    }
}
