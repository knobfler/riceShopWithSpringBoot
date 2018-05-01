package com.riceshop.shop.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    public List<PostItem> getItemListOnlySix() {
        String sql = "SELECT * FROM item ORDER BY id DESC LIMIT 6";
        return jdbcTemplate.query(sql, new PostItemMapper());
    }

    public List<PostItem> getItemList() {
        String sql = "SELECT * FROM item ORDER BY id DESC LIMIT 8";
        return jdbcTemplate.query(sql, new PostItemMapper());
    }

    public long getLastId() {
        String sql = "SELECT MAX(id) FROM item";
        // int lastId = jdbcTemplate.queryForInt(sql);
        
        long cnt = jdbcTemplate.queryForObject(sql, Long.class);
        return cnt;
    }

    public List<PostItem> getItemListByScrolling(long lastId) {
        List<PostItem> postItems = new ArrayList<PostItem>();
        String sql = "SELECT * FROM item WHERE id < ? ORDER BY id DESC LIMIT 6";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, lastId);
        for(Map<String, Object> row: rows) {
            PostItem postItem = new PostItem();
            postItem.setId((int)row.get("id"));
            postItem.setTitle((String)row.get("title"));
            postItem.setMarkdown((String)row.get("markdown"));
            postItem.setOptions((String)row.get("options"));
            postItem.setPrices((String)row.get("prices"));
            postItem.setPublishedDate((String)row.get("publishedDate"));
            postItems.add(postItem);
        }
        return postItems;
    }

    public boolean delete(long id) {
        String sql = "DELETE FROM item WHERE id = ?";
        int update = jdbcTemplate.update(sql, id);
        return update == 1;
    }

    public void update(PostItem postItem) {
        String sql = "UPDATE item SET title = ?, markdown = ?, options = ?, prices = ?, publishedDate = ? WHERE id = ?";
        jdbcTemplate.update(sql, new Object[]{postItem.getTitle(), postItem.getMarkdown(), postItem.getOptions(), postItem.getPrices(), postItem.getPublishedDate(), postItem.getId()});

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