package com.neusoft.nep.service.impl;

import com.neusoft.nep.common.IdGenerator;
import com.neusoft.nep.common.Result;
import com.neusoft.nep.mapper.AqiFeedbackMapper;
import com.neusoft.nep.mapper.GridMemberMapper;
import com.neusoft.nep.mapper.StatisticsMapper;
import com.neusoft.nep.model.entity.AqiFeedback;
import com.neusoft.nep.model.entity.GridMember;
import com.neusoft.nep.model.entity.Statistics;
import com.neusoft.nep.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatisticsServiceImpl implements StatisticsService {

    @Autowired
    private StatisticsMapper statisticsMapper;

    @Autowired
    private AqiFeedbackMapper aqiFeedbackMapper;

    @Autowired
    private GridMemberMapper gridMemberMapper;

    @Override
    @Transactional
    public Result<?> save(Statistics statistics) {
        // 参数校验
        if (statistics.getFeedbackId() == null || statistics.getFeedbackId().trim().isEmpty()) {
            return Result.error("反馈ID不能为空");
        }
        if (statistics.getGridMemberId() == null || statistics.getGridMemberId().trim().isEmpty()) {
            return Result.error("网格员ID不能为空");
        }
        if (statistics.getSo2() == null || statistics.getCo() == null ||
            statistics.getPm25() == null || statistics.getAqi() == null) {
            return Result.error("检测数据不完整");
        }

        // 验证反馈是否存在
        AqiFeedback feedback = aqiFeedbackMapper.selectById(statistics.getFeedbackId());
        if (feedback == null) {
            return Result.error("反馈记录不存在");
        }

        // 验证网格员
        GridMember member = gridMemberMapper.selectById(statistics.getGridMemberId());
        if (member == null) {
            return Result.error("网格员不存在");
        }

        // 保存检测数据
        statistics.setId(IdGenerator.generateId());
        if (statistics.getConfirmTime() == null) {
            statistics.setConfirmTime(new Date());
        }
        statisticsMapper.insert(statistics);

        // 更新反馈状态为"已确认"(2)
        aqiFeedbackMapper.updateStatus(statistics.getFeedbackId(), 2);

        Map<String, Object> data = new HashMap<>();
        data.put("id", statistics.getId());
        return Result.success("检测数据提交成功", data);
    }

    @Override
    public Result<?> listAll() {
        List<Statistics> list = statisticsMapper.selectAll();
        return Result.success(list);
    }

    @Override
    public Result<?> provinceItemTotal() {
        List<Map<String, Object>> list = statisticsMapper.selectProvinceItemTotal();
        return Result.success(list);
    }

    @Override
    public Result<?> aqiDistribute() {
        List<Map<String, Object>> list = statisticsMapper.selectAqiDistribute();
        return Result.success(list);
    }
}
