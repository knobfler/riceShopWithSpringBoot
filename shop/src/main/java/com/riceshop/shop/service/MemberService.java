package com.riceshop.shop.service;

import com.riceshop.shop.models.Member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    @Autowired
    MemberDAO memberDAO;

    public long signup(Member member) {
        return memberDAO.signup(member);
    }

    public Boolean getUserByUserID(String userID) {
        return memberDAO.getUserByUserID(userID);
    }
    public Member getUserById(long id) {
        return memberDAO.getUserById(id);
    }

    public String getHashedPassword(String userID) {
        return memberDAO.getHashedPassword(userID);
    }
}