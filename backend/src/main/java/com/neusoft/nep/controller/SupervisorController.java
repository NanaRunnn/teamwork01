package com.neusoft.nep.controller;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.model.entity.Supervisor;
import com.neusoft.nep.service.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/supervisor")
public class SupervisorController {

    @Autowired
    private SupervisorService supervisorService;

    /**
     * 公众监督员注册
     * POST /api/supervisor/saveSupervisor
     */
    @PostMapping("/saveSupervisor")
    public Result<?> saveSupervisor(@RequestBody Supervisor supervisor) {
        return supervisorService.register(supervisor);
    }

    /**
     * 公众监督员登录
     * POST /api/supervisor/login
     */
    @PostMapping("/login")
    public Result<?> login(@RequestBody Supervisor supervisor) {
        return supervisorService.login(supervisor.getPhone(), supervisor.getPassword());
    }

    /**
     * 根据ID查询公众监督员
     * GET /api/supervisor/getSupervisorById?id=S001
     */
    @GetMapping("/getSupervisorById")
    public Result<?> getSupervisorById(@RequestParam String id) {
        return supervisorService.getById(id);
    }
}
