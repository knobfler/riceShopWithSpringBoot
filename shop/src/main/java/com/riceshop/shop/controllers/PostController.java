package com.riceshop.shop.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

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
    public ResponseEntity<?> post(PostItem postItem, @RequestBody Map<String, String> body, HttpSession session) {
        if(!(Boolean)session.getAttribute("adminLogged")) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
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

    @RequestMapping(value="/more/{lastId}", method=RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getMoreItemList(@PathVariable Long lastId) {
        List<PostItem> postItems;
        try {
            // long id = itemService.getLastId();
            // System.out.println("id: " + id);
            postItems = itemService.getItemListByScrolling(lastId);
            return new ResponseEntity<>(postItems, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value="/initial", method=RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getOnlySix() {
        List<PostItem> postItems;

        try {
            postItems = itemService.getItemListOnlySix();
            return new ResponseEntity<>(postItems, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteItem(@PathVariable Long id, HttpSession session) {
        try {
            if((Boolean) session.getAttribute("adminLogged")) {
                boolean isSuccess = itemService.delete(id);
                if(isSuccess) {
                    return new ResponseEntity<>("success: true", HttpStatus.NO_CONTENT);
                }
                return new ResponseEntity<>("success: false", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>("success: false", HttpStatus.UNAUTHORIZED);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("success: false", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value="/{id}", method=RequestMethod.PATCH)
    @ResponseBody
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody Map<String, String> body, HttpSession session, PostItem postItem) {
        String title = body.get("title");
        String markdown = body.get("markdown");
        String options = body.get("option");
        String prices = body.get("price");
        String publishedDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());

        try {
            if((Boolean) session.getAttribute("adminLogged")) {
                postItem.setTitle(title);
                postItem.setMarkdown(markdown);
                postItem.setOptions(options);
                postItem.setPrices(prices);
                postItem.setPublishedDate(publishedDate);
                itemService.update(postItem);

                return new ResponseEntity<>(postItem, HttpStatus.OK);
            }
            return new ResponseEntity<>("success: false", HttpStatus.UNAUTHORIZED);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("success: false", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
