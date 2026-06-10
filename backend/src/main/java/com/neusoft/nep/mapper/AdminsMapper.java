package com.neusoft.nep.mapper;

import com.neusoft.nep.model.entity.Admins;
import org.apache.ibatis.annotations.Param;

public interface AdminsMapper {

    Admins selectByCodeAndPassword(@Param("code") String code, @Param("password") String password);
}
