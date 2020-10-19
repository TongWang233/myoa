package com.wwy.mapper;



import com.wwy.pojo.User;

import java.util.List;

public interface UserMapper {

    //根据id查询用户信息
    public List<User> findUserById(int id) throws Exception;

    public void show() ;
}
