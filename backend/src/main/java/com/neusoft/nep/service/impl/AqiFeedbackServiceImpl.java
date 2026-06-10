package com.neusoft.nep.service.impl;

import com.neusoft.nep.common.IdGenerator;
import com.neusoft.nep.common.Result;
import com.neusoft.nep.mapper.AqiFeedbackMapper;
import com.neusoft.nep.mapper.GridMemberMapper;
import com.neusoft.nep.mapper.SupervisorMapper;
import com.neusoft.nep.model.entity.AqiFeedback;
import com.neusoft.nep.model.entity.GridMember;
import com.neusoft.nep.model.entity.Supervisor;
import com.neusoft.nep.service.AqiFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AqiFeedbackServiceImpl implements AqiFeedbackService {

    @Autowired
    private AqiFeedbackMapper aqiFeedbackMapper;

    @Autowired
    private SupervisorMapper supervisorMapper;

    @Autowired
    private GridMemberMapper gridMemberMapper;

    @Override
    @Transactional
    public Result<?> save(AqiFeedback feedback) {
        // 参数校验
        if (feedback.getSupervisorId() == null || feedback.getSupervisorId().trim().isEmpty()) {
            return Result.error("监督员ID不能为空");
        }
        if (feedback.getProvinceId() == null || feedback.getProvinceId().trim().isEmpty()) {
            return Result.error("省份不能为空");
        }
        if (feedback.getCityId() == null || feedback.getCityId().trim().isEmpty()) {
            return Result.error("城市不能为空");
        }
        if (feedback.getEstimatedAqi() == null) {
            return Result.error("预估AQI不能为空");
        }
        if (feedback.getEstimatedAqi() < 0 || feedback.getEstimatedAqi() > 500) {
            return Result.error("预估AQI范围应在0-500之间");
        }
        if (feedback.getDescription() == null || feedback.getDescription().trim().isEmpty()) {
            return Result.error("反馈描述不能为空");
        }

        // 验证监督员是否存在
        Supervisor supervisor = supervisorMapper.selectById(feedback.getSupervisorId());
        if (supervisor == null) {
            return Result.error("监督员不存在");
        }

        // 保存反馈
        feedback.setId(IdGenerator.generateId());
        feedback.setStatus(0);
        feedback.setCreateTime(new Date());
        aqiFeedbackMapper.insert(feedback);

        Map<String, Object> data = new HashMap<>();
        data.put("id", feedback.getId());
        data.put("status", 0);
        return Result.success("反馈提交成功", data);
    }

    @Override
    public Result<?> listBySupervisorId(String supervisorId) {
        List<AqiFeedback> list = aqiFeedbackMapper.selectBySupervisorId(supervisorId);
        return Result.success(list);
    }

    @Override
    public Result<?> listByGridMemberId(String gridMemberId) {
        List<AqiFeedback> list = aqiFeedbackMapper.selectByGridMemberId(gridMemberId);
        return Result.success(list);
    }

    @Override
    public Result<?> listAll(Integer status, String provinceId, String cityId) {
        List<AqiFeedback> list = aqiFeedbackMapper.selectAll(status, provinceId, cityId);
        return Result.success(list);
    }

    @Override
    @Transactional
    public Result<?> assign(String feedbackId, String gridMemberId, Integer status) {
        if (feedbackId == null || feedbackId.trim().isEmpty()) {
            return Result.error("反馈ID不能为空");
        }
        if (gridMemberId == null || gridMemberId.trim().isEmpty()) {
            return Result.error("网格员ID不能为空");
        }

        // 验证反馈是否存在
        AqiFeedback feedback = aqiFeedbackMapper.selectById(feedbackId);
        if (feedback == null) {
            return Result.error("反馈记录不存在");
        }

        // 验证网格员是否存在
        GridMember gridMember = gridMemberMapper.selectById(gridMemberId);
        if (gridMember == null) {
            return Result.error("网格员不存在");
        }

        // 指派
        aqiFeedbackMapper.updateAssign(feedbackId, gridMemberId, 1);
        return Result.success("指派成功", null);
    }
}
