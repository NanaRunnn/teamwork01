package com.neusoft.nep.mapper;

import com.neusoft.nep.model.entity.AqiFeedback;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AqiFeedbackMapper {

    int insert(AqiFeedback feedback);

    AqiFeedback selectById(@Param("id") String id);

    List<AqiFeedback> selectBySupervisorId(@Param("supervisorId") String supervisorId);

    List<AqiFeedback> selectAll(@Param("status") Integer status,
                                @Param("provinceId") String provinceId,
                                @Param("cityId") String cityId);

    List<AqiFeedback> selectByGridMemberId(@Param("gridMemberId") String gridMemberId);

    int updateAssign(@Param("id") String id,
                     @Param("gridMemberId") String gridMemberId,
                     @Param("status") Integer status);

    int updateStatus(@Param("id") String id, @Param("status") Integer status);
}
