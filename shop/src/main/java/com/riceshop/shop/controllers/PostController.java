package com.riceshop.shop.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.riceshop.shop.models.PostItem;
import com.riceshop.shop.service.ItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;;

@RequestMapping("/api/post")
@Controller
public class PostController {

    @Autowired
    ItemService itemService;

    @RequestMapping(value="/", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> post(PostItem postItem, @RequestBody Map<String, String> body) {
        String title = body.get("title");
        String markdown = body.get("markdown");
        String option = body.get("option");
        String price = body.get("price");

        String publishedDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());

        try {
            postItem.setTitle(title);
            postItem.setMarkdown(markdown);
            postItem.setOptions(option);
            postItem.setPrices(price);
            postItem.setPublishedDate(publishedDate);
            postItem = itemService.getPostItemById(itemService.writeItem(postItem));
            return new ResponseEntity<>(postItem, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getItemById(@PathVariable Long id){
        try {
            PostItem postItem = itemService.getPostItemById(id);
            if(postItem == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(postItem, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value="/", method=RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getItemList() {
        List<PostItem> itemList;

        try {
            itemList = itemService.getItemList();
            return new ResponseEntity<>(itemList, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
