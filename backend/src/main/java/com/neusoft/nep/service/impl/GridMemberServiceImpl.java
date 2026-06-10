package com.neusoft.nep.service.impl;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.mapper.GridMemberMapper;
import com.neusoft.nep.model.entity.GridMember;
import com.neusoft.nep.service.GridMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GridMemberServiceImpl implements GridMemberService {

    @Autowired
    private GridMemberMapper gridMemberMapper;

    @Override
    public Result<?> login(String code, String password) {
        if (code == null || code.trim().isEmpty()) {
            return Result.error("登录编码不能为空");
        }
        if (password == null || password.trim().isEmpty()) {
            return Result.error("密码不能为空");
        }

        GridMember member = gridMemberMapper.selectByCodeAndPassword(code, password);
        if (member == null) {
            return Result.error("编码或密码错误");
        }

        Map<String, Object> data = new HashMap<>();
        data.put("id", member.getId());
        data.put("code", member.getCode());
        data.put("realName", member.getRealName());
        data.put("phone", member.getPhone());
        data.put("provinceId", member.getProvinceId());
        data.put("cityId", member.getCityId());
        data.put("role", "grid");
        return Result.success("登录成功", data);
    }

    @Override
    public Result<?> listByProvinceAndCity(String provinceId, String cityId) {
        if (provinceId == null || provinceId.trim().isEmpty()) {
            return Result.error("省份ID不能为空");
        }
        if (cityId == null || cityId.trim().isEmpty()) {
            return Result.error("城市ID不能为空");
        }

        List<GridMember> list = gridMemberMapper.selectByProvinceIdAndCityId(provinceId, cityId);
        return Result.success(list);
    }
}
