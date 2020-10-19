package com.wwy.pojo;

public class Company {
    private Integer id;
    private String company_name;
    private String company_phone;
    private String company_fax;
    private String company_post_number;
    private String company_web;
    private String company_bank;
    private String company_bankNumber;
    private Integer status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public String getCompany_phone() {
        return company_phone;
    }

    public void setCompany_phone(String company_phone) {
        this.company_phone = company_phone;
    }

    public String getCompany_fax() {
        return company_fax;
    }

    public void setCompany_fax(String company_fax) {
        this.company_fax = company_fax;
    }

    public String getCompany_post_number() {
        return company_post_number;
    }

    public void setCompany_post_number(String company_post_number) {
        this.company_post_number = company_post_number;
    }

    public String getCompany_web() {
        return company_web;
    }

    public void setCompany_web(String company_web) {
        this.company_web = company_web;
    }

    public String getCompany_bank() {
        return company_bank;
    }

    public void setCompany_bank(String company_bank) {
        this.company_bank = company_bank;
    }

    public String getCompany_bankNumber() {
        return company_bankNumber;
    }

    public void setCompany_bankNumber(String company_bankNumber) {
        this.company_bankNumber = company_bankNumber;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Company(Integer id, String company_name, String company_phone, String company_fax, String company_post_number, String company_web, String company_bank, String company_bankNumber, Integer status) {
        this.id = id;
        this.company_name = company_name;
        this.company_phone = company_phone;
        this.company_fax = company_fax;
        this.company_post_number = company_post_number;
        this.company_web = company_web;
        this.company_bank = company_bank;
        this.company_bankNumber = company_bankNumber;
        this.status = status;
    }

    public Company() {
    }
}
