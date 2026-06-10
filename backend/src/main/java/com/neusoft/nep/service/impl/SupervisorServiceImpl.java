package com.neusoft.nep.service.impl;

import com.neusoft.nep.common.IdGenerator;
import com.neusoft.nep.common.Result;
import com.neusoft.nep.mapper.SupervisorMapper;
import com.neusoft.nep.model.entity.Supervisor;
import com.neusoft.nep.service.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SupervisorServiceImpl implements SupervisorService {

    @Autowired
    private SupervisorMapper supervisorMapper;

    @Override
    public Result<?> register(Supervisor supervisor) {
        // 验证必填字段
        if (supervisor.getPhone() == null || supervisor.getPhone().trim().isEmpty()) {
            return Result.error("手机号码不能为空");
        }
        if (supervisor.getPassword() == null || supervisor.getPassword().trim().isEmpty()) {
            return Result.error("密码不能为空");
        }
        if (supervisor.getRealName() == null || supervisor.getRealName().trim().isEmpty()) {
            return Result.error("真实姓名不能为空");
        }

        // 检查手机号是否已注册
        Supervisor existing = supervisorMapper.selectByPhone(supervisor.getPhone());
        if (existing != null) {
            return Result.error("该手机号已注册");
        }

        // 生成ID并保存
        supervisor.setId(IdGenerator.generateId());
        supervisorMapper.insert(supervisor);

        // 返回结果（不含密码）
        Map<String, Object> data = new HashMap<>();
        data.put("id", supervisor.getId());
        data.put("phone", supervisor.getPhone());
        data.put("realName", supervisor.getRealName());
        return Result.success("注册成功", data);
    }

    @Override
    public Result<?> login(String phone, String password) {
        if (phone == null || phone.trim().isEmpty()) {
            return Result.error("手机号码不能为空");
        }
        if (password == null || password.trim().isEmpty()) {
            return Result.error("密码不能为空");
        }

        Supervisor supervisor = supervisorMapper.selectByPhoneAndPassword(phone, password);
        if (supervisor == null) {
            return Result.error("手机号或密码错误");
        }

        Map<String, Object> data = new HashMap<>();
        data.put("id", supervisor.getId());
        data.put("phone", supervisor.getPhone());
        data.put("realName", supervisor.getRealName());
        data.put("role", "supervisor");
        return Result.success("登录成功", data);
    }

    @Override
    public Result<?> getById(String id) {
        Supervisor supervisor = supervisorMapper.selectById(id);
        if (supervisor == null) {
            return Result.error("监督员不存在");
        }

        Map<String, Object> data = new HashMap<>();
        data.put("id", supervisor.getId());
        data.put("phone", supervisor.getPhone());
        data.put("realName", supervisor.getRealName());
        return Result.success(data);
    }
}
