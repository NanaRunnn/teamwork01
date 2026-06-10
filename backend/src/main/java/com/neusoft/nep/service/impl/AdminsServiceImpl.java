package com.neusoft.nep.service.impl;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.mapper.AdminsMapper;
import com.neusoft.nep.model.entity.Admins;
import com.neusoft.nep.service.AdminsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminsServiceImpl implements AdminsService {

    @Autowired
    private AdminsMapper adminsMapper;

    @Override
    public Result<?> login(String code, String password) {
        if (code == null || code.trim().isEmpty()) {
            return Result.error("管理员编码不能为空");
        }
        if (password == null || password.trim().isEmpty()) {
            return Result.error("密码不能为空");
        }

        Admins admin = adminsMapper.selectByCodeAndPassword(code, password);
        if (admin == null) {
            return Result.error("编码或密码错误");
        }

        Map<String, Object> data = new HashMap<>();
        data.put("id", admin.getId());
        data.put("code", admin.getCode());
        data.put("realName", admin.getRealName());
        data.put("role", "admin");
        return Result.success("登录成功", data);
    }
}
