package com.wwy.pojo;

import java.util.Date;

public class User {

    private Integer id;
    private String user_name;
    private String user_sex;
    private String user_password;
    private Integer user_department;
    private Integer user_role;
    private Date create_date;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_sex() {
        return user_sex;
    }

    public void setUser_sex(String user_sex) {
        this.user_sex = user_sex;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    public Integer getUser_department() {
        return user_department;
    }

    public void setUser_department(Integer user_department) {
        this.user_department = user_department;
    }

    public Integer getUser_role() {
        return user_role;
    }

    public void setUser_role(Integer user_role) {
        this.user_role = user_role;
    }

    public Date getCreate_date() {
        return create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
    }

    public User(Integer id, String user_name, String user_sex, String user_password, Integer user_department, Integer user_role, Date create_date) {
        this.id = id;
        this.user_name = user_name;
        this.user_sex = user_sex;
        this.user_password = user_password;
        this.user_department = user_department;
        this.user_role = user_role;
        this.create_date = create_date;
    }

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", user_name='" + user_name + '\'' +
                ", user_sex='" + user_sex + '\'' +
                ", user_password='" + user_password + '\'' +
                ", user_department=" + user_department +
                ", user_role=" + user_role +
                ", create_date=" + create_date +
                '}';
    }
}
