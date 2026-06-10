package com.neusoft.nep.common;

import java.util.UUID;

/**
 * 简单ID生成器，用于生成数据库主键
 */
public class IdGenerator {

    public static String generateId() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
