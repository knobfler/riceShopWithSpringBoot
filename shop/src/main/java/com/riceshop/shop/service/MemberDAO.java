package com.riceshop.shop.service;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.riceshop.shop.models.Member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class MemberDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public long signup(Member member) {
        String sql = "INSERT INTO member (userID, userName, userEmail, userPassword) VALUES (?, ?, ?, ?)";
        int update = jdbcTemplate.update(sql, new Object[]{member.getUserID(), member.getUserName(), member.getUserEmail(), member.getUserPassword()});
        long cnt = 0;
        if(update == 1) {
            cnt = jdbcTemplate.queryForObject("SELECT max(id) FROM member", Long.class);
        }
        return cnt;
    }

    public Member getUserById(long id){
        String sql = "SELECT * FROM member WHERE id = ?";
        Member member = jdbcTemplate.queryForObject(sql, new MemberMapper(), id);
        return member;
    }

    public Boolean getUserByUserID(String userID) {
        long cnt = 0;
        cnt = jdbcTemplate.queryForObject("SELECT count(*) FROM member WHERE userID = ?", Long.class, userID);
        if(cnt == 1) {
            return true;
        } 
        return false;
    }

    public String getHashedPassword(String userID) {
        String sql = "SELECT * FROM member WHERE userID = ?";
        Member member = jdbcTemplate.queryForObject(sql, new MemberMapper(), userID);
        return member.getUserPassword();

    }



    protected static final class MemberMapper implements RowMapper<Member> {
        public Member mapRow(ResultSet rs, int rowNum)
            throws SQLException {
                Member member = new Member();
                member.setId(rs.getLong("id"));
                member.setUserID(rs.getString("userID"));
                member.setUserName(rs.getString("userName"));
                member.setUserEmail(rs.getString("userEmail"));
                member.setUserPassword(rs.getString("userPassword"));
                member.setCreatedAt(rs.getString("createdAt"));
                return member;
            }
    }
    
}