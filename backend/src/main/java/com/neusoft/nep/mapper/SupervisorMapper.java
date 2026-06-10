package com.neusoft.nep.mapper;

import com.neusoft.nep.model.entity.Supervisor;
import org.apache.ibatis.annotations.Param;

public interface SupervisorMapper {

    int insert(Supervisor supervisor);

    Supervisor selectById(@Param("id") String id);

    Supervisor selectByPhone(@Param("phone") String phone);

    Supervisor selectByPhoneAndPassword(@Param("phone") String phone, @Param("password") String password);
}
