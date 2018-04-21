package com.riceshop.shop.models;

import java.util.Date;

public class Member implements Cloneable {
    private long id;
    private String userID;
    private String userPassword;
    private String userEmail;
    private String userName;
    private String createdAt;

    /**
     * @param id the id to set
     */
    public void setId(long id) {
        this.id = id;
    }
    /**
     * @return the id
     */
    public long getId() {
        return id;
    }

    /**
     * @param userID the userID to set
     */
    public void setUserID(String userID) {
        this.userID = userID;
    }
    /**
     * @return the userID
     */
    public String getUserID() {
        return userID;
    }

    /**
     * @param userPassword the userPassword to set
     */
    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
    /**
     * @return the userPassword
     */
    public String getUserPassword() {
        return userPassword;
    }

    /**
     * @param userEmail the userEmail to set
     */
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    /**
     * @return the userEmail
     */
    public String getUserEmail() {
        return userEmail;
    }


    /**
     * @param userName the userName to set
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }
    /**
     * @return the userName
     */
    public String getUserName() {
        return userName;
    }

  
    /**
     * @param createdAt the createdAt to set
     */
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
    /**
     * @return the createdAt
     */
    public String getCreatedAt() {
        return createdAt;
    }
    

}