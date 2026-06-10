package com.neusoft.nep.controller;

import com.neusoft.nep.common.Result;
import com.neusoft.nep.model.entity.Statistics;
import com.neusoft.nep.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    /**
     * 保存网格员AQI检测确认信息
     * POST /api/statistics/saveStatistics
     */
    @PostMapping("/saveStatistics")
    public Result<?> saveStatistics(@RequestBody Statistics statistics) {
        return statisticsService.save(statistics);
    }

    /**
     * 查询AQI确认信息列表（系统管理员端）
     * GET /api/statistics/listStatisticsAll
     */
    @GetMapping("/listStatisticsAll")
    public Result<?> listStatisticsAll() {
        return statisticsService.listAll();
    }

    /**
     * 查询省份维度统计数据（决策者端）
     * GET /api/statistics/listProvinceItemTotalStatis
     */
    @GetMapping("/listProvinceItemTotalStatis")
    public Result<?> listProvinceItemTotalStatis() {
        return statisticsService.provinceItemTotal();
    }

    /**
     * 查询AQI指数分布统计数据（决策者端）
     * GET /api/statistics/listAqiDistributeStatis
     */
    @GetMapping("/listAqiDistributeStatis")
    public Result<?> listAqiDistributeStatis() {
        return statisticsService.aqiDistribute();
    }
}
