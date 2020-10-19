package com.wwy.test;


import com.wwy.mapper.UserMapper;
import com.wwy.pojo.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.InputStream;
import java.util.List;

public class MybatisTest {

    @Test
    public void testFindUserById() throws Exception {
        try {
            // 1、实例化mybatis运行环境
            String resource = "config/SqlMapConfig.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

            // 2、�?�过mybatis的bean工厂获取接口实例 //SqlSession是觉得不错连接connection，进行数据库连接
            SqlSession session = sqlSessionFactory.openSession(); // 使用反射机制实例化数据操作接�?
            UserMapper userMapper = session.getMapper( UserMapper.class);

            List<User> list  = userMapper.findUserById(1);
            for(User user:list) {
                System.out.println(user);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    }
