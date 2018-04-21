package com.riceshop.shop.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import com.riceshop.shop.models.PostItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ItemDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public long writeItem(PostItem postItem) {
        String sql = "INSERT INTO item(title, markdown, options, prices) VALUES (?, ?, ?, ?)";
        int update = jdbcTemplate.update(sql, new Object[]{postItem.getTitle(), postItem.getMarkdown(), postItem.getOptions(), postItem.getPrices()});
        long cnt = 0;
        if(update == 1) {
            cnt = jdbcTemplate.queryForObject("SELECT max(id) FROM item", Long.class);
        }
        return cnt;
    }

    public PostItem getPostItemById(long id) {
        String sql = "SELECT * FROM item WHERE id = ?";
        PostItem postItem = jdbcTemplate.queryForObject(sql, new PostItemMapper(), id);
        return postItem;
    }

    public List<PostItem> getItemList() {
        String sql = "SELECT * FROM item ORDER BY id DESC";
        return jdbcTemplate.query(sql, new PostItemMapper());
    }

    protected static final class PostItemMapper implements RowMapper<PostItem> {
        public PostItem mapRow(ResultSet rs, int rowNum)
                throws SQLException {
            
            PostItem postItem = new PostItem();
            postItem.setId(rs.getLong("id"));
            postItem.setTitle(rs.getString("title"));
            postItem.setMarkdown(rs.getString("markdown"));
            postItem.setOptions(rs.getString("options"));
            postItem.setPrices(rs.getString("prices"));
            postItem.setPublishedDate(rs.getString("publishedDate"));
            return postItem;
        }
    }

}