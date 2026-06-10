package com.neusoft.nep.controller;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.model.entity.AqiFeedback;
import com.neusoft.nep.service.AqiFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/aqiFeedback")
public class AqiFeedbackController {

    @Autowired
    private AqiFeedbackService aqiFeedbackService;

    /**
     * 保存空气质量反馈
     * POST /api/aqiFeedback/saveAqiFeedback
     */
    @PostMapping("/saveAqiFeedback")
    public Result<?> saveAqiFeedback(@RequestBody AqiFeedback feedback) {
        return aqiFeedbackService.save(feedback);
    }

    /**
     * 查询公众监督员历史反馈
     * GET /api/aqiFeedback/listAqiFeedbackBySupervisorId?supervisorId=S001
     */
    @GetMapping("/listAqiFeedbackBySupervisorId")
    public Result<?> listAqiFeedbackBySupervisorId(@RequestParam String supervisorId) {
        return aqiFeedbackService.listBySupervisorId(supervisorId);
    }

    /**
     * 查询全部反馈（系统管理员端）
     * GET /api/aqiFeedback/listAqiFeedbackAll?status=0&provinceId=P001&cityId=C001
     */
    @GetMapping("/listAqiFeedbackAll")
    public Result<?> listAqiFeedbackAll(@RequestParam(required = false) Integer status,
                                         @RequestParam(required = false) String provinceId,
                                         @RequestParam(required = false) String cityId) {
        return aqiFeedbackService.listAll(status, provinceId, cityId);
    }

    /**
     * 指派网格员
     * POST /api/aqiFeedback/updateAqiFeedbackAssign
     */
    @PostMapping("/updateAqiFeedbackAssign")
    public Result<?> updateAqiFeedbackAssign(@RequestBody Map<String, Object> params) {
        String feedbackId = (String) params.get("feedbackId");
        String gridMemberId = (String) params.get("gridMemberId");
        Integer status = params.get("status") != null ? (Integer) params.get("status") : 1;
        return aqiFeedbackService.assign(feedbackId, gridMemberId, status);
    }

    /**
     * 查询网格员任务列表
     * GET /api/aqiFeedback/listAqiFeedbackByGridMemberId?gridMemberId=G001
     */
    @GetMapping("/listAqiFeedbackByGridMemberId")
    public Result<?> listAqiFeedbackByGridMemberId(@RequestParam String gridMemberId) {
        return aqiFeedbackService.listByGridMemberId(gridMemberId);
    }
}
