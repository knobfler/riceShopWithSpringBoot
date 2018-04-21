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
}