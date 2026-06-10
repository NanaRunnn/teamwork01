package com.neusoft.nep.controller;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.model.entity.Admins;
import com.neusoft.nep.service.AdminsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admins")
public class AdminsController {

    @Autowired
    private AdminsService adminsService;

    /**
     * 管理员登录
     * POST /api/admins/getAdminsByCode
     */
    @PostMapping("/getAdminsByCode")
    public Result<?> getAdminsByCode(@RequestBody Admins admin) {
        return adminsService.login(admin.getCode(), admin.getPassword());
    }
}
