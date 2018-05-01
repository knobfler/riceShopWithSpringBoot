package com.riceshop.shop.service;

import java.util.List;

import com.riceshop.shop.models.PostItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {
    @Autowired
    ItemDAO itemDAO;

    public long writeItem(PostItem postItem) {
        return itemDAO.writeItem(postItem);
    }

    public PostItem getPostItemById(long id) {
        return itemDAO.getPostItemById(id);
    }

    public List<PostItem> getItemList() {
        return itemDAO.getItemList();
    }

    public boolean delete(long id) {
        return itemDAO.delete(id);
    }

    public void update(PostItem postItem) {
        itemDAO.update(postItem);
    }

    public List<PostItem> getItemListByScrolling(long lastId) {
        return itemDAO.getItemListByScrolling(lastId);
    }

    public long getLastId() {
        return itemDAO.getLastId();
    }

    public List<PostItem> getItemListOnlySix() {
        return itemDAO.getItemListOnlySix();
    }
}