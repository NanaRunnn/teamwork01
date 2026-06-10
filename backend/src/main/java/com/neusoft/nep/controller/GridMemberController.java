package com.neusoft.nep.controller;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.model.entity.GridMember;
import com.neusoft.nep.service.GridMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gridMember")
public class GridMemberController {

    @Autowired
    private GridMemberService gridMemberService;

    /**
     * 网格员登录
     * POST /api/gridMember/login
     */
    @PostMapping("/login")
    public Result<?> login(@RequestBody GridMember member) {
        return gridMemberService.login(member.getCode(), member.getPassword());
    }

    /**
     * 根据省市查询可用网格员
     * GET /api/gridMember/listGridMemberByProvinceId?provinceId=P001&cityId=C001
     */
    @GetMapping("/listGridMemberByProvinceId")
    public Result<?> listGridMemberByProvinceId(@RequestParam String provinceId,
                                                  @RequestParam String cityId) {
        return gridMemberService.listByProvinceAndCity(provinceId, cityId);
    }
}
