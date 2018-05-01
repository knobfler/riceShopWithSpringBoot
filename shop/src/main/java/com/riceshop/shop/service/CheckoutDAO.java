package com.riceshop.shop.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.riceshop.shop.models.Checkout;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CheckoutDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public Checkout getCheckoutById(long id) {
        String sql = "SELECT * FROM checkout WHERE id = ?";
        Checkout checkout = jdbcTemplate.queryForObject(sql, new CheckoutMapper(), id);
        return checkout;
    }

    public long checkout(Checkout checkout) {
        String sql = "INSERT INTO checkout (imp_uid, merchant_uid, paid_amount, apply_num, buyer_email, buyer_name, buyer_tel, buyer_addr, buyer_postcode, ordered_list, ordered_number, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        int update = jdbcTemplate.update(sql,
                new Object[] { checkout.getImp_uid(), checkout.getMerchant_uid(), checkout.getPaid_amount(),
                        checkout.getApply_num(), checkout.getBuyer_email(), checkout.getBuyer_name(),
                        checkout.getBuyer_tel(), checkout.getBuyer_addr(), checkout.getBuyer_postcode(),
                        checkout.getOrdered_list(), checkout.getOrdered_number(), checkout.getCreatedAt() });
        long cnt = 0;
        if (update == 1) {
            cnt = jdbcTemplate.queryForObject("SELECT max(id) FROM checkout", Long.class);
        }
        return cnt;
    }

    public List<Checkout> getCheckoutList() {
        String sql = "SELECT * FROM CHECKOUT ORDER BY id DESC";
        return jdbcTemplate.query(sql, new CheckoutMapper());
    }

    public List<Checkout> getCheckedList() {
        String sql = "SELECT * FROM CHECKOUT WHERE checked = 1 ORDER BY id DESC";
        return jdbcTemplate.query(sql, new CheckoutMapper());
    }

    public List<Checkout> getUncheckedList() {
        String sql = "SELECT * FROM CHECKOUT WHERE checked = 0 ORDER BY id DESC";
        return jdbcTemplate.query(sql, new CheckoutMapper());

    }

    public List<Checkout> searchByUsername(String value) {
        String sql = "SELECT * FROM CHECKOUT WHERE buyer_name LIKE ?";
        return jdbcTemplate.query(sql, new Object[] { "%" + value + "%" }, new CheckoutMapper());
    }

    public List<Checkout> searchByEmail(String value) {
        String sql = "SELECT * FROM CHECKOUT WHERE buyer_email LIKE ?";
        return jdbcTemplate.query(sql, new Object[] {"%" + value + "%"}, new CheckoutMapper());
    }

    public List<Checkout> searchByAddress(String value) {
        String sql = "SELECT * FROM CHECKOUT WHERE buyer_addr LIKE ?";
        return jdbcTemplate.query(sql, new Object[] {"%" + value + "%"}, new CheckoutMapper());
    }

    public List<Checkout> searchByPhone(String value) {
        String sql = "SELECT * FROM CHECKOUT WHERE buyer_tel LIKE ?";
        return jdbcTemplate.query(sql, new Object[] {"%" + value + "%"}, new CheckoutMapper());
    }



    protected static final class CheckoutMapper implements RowMapper<Checkout> {
        public Checkout mapRow(ResultSet rs, int rowNum) throws SQLException {
            Checkout checkout = new Checkout();
            checkout.setId(rs.getLong("id"));
            checkout.setImp_uid(rs.getString("imp_uid"));
            checkout.setMerchant_uid(rs.getString("merchant_uid"));
            checkout.setPaid_amount(rs.getString("paid_amount"));
            checkout.setApply_num(rs.getString("apply_num"));
            checkout.setBuyer_email(rs.getString("buyer_email"));
            checkout.setBuyer_name(rs.getString("buyer_name"));
            checkout.setBuyer_tel(rs.getString("buyer_tel"));
            checkout.setBuyer_addr(rs.getString("buyer_addr"));
            checkout.setBuyer_postcode(rs.getString("buyer_postcode"));
            checkout.setOrdered_list(rs.getString("ordered_list"));
            checkout.setOrdered_number(rs.getString("ordered_number"));
            checkout.setChecked(rs.getBoolean("checked"));
            checkout.setCreatedAt(rs.getString("createdAt"));
            return checkout;
        }
    }
}