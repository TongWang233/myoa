package com.wwy.mapper;



import com.wwy.pojo.User;

import java.util.List;

public interface UserMapper {

    //����id��ѯ�û���Ϣ
    public List<User> findUserById(int id) throws Exception;

    public void show() ;
}
