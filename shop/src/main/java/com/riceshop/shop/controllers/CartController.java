package com.riceshop.shop.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.riceshop.shop.models.Cart;
import com.riceshop.shop.models.CartError;
import com.riceshop.shop.models.CartLog;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;;

@RequestMapping("/api/cart")
@Controller
public class CartController {
    @RequestMapping(value="/", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addCart(@RequestBody Map<String, String> body, HttpServletRequest request,
            HttpSession session) {
        System.out.println("test: test");
        Map<String, String[]> cartMap = (Map<String, String[]>) session.getAttribute("cartSessionId");

        String id = body.get("id").toString();
        String title = body.get("title");
        String amount = body.get("amount");
        String thumbnailImage = body.get("thumbnailImage");
        String totalPrice = body.get("totalPrice");

        try {
            if (amount.equals("0") || Integer.parseInt(amount) <= 0) {
                CartError cartError = new CartError();
                cartError.setErrorCode(100);
                cartError.setErrorLog("수량이 제대로 선택되지 않았습니다.");
                return new ResponseEntity<>(cartError, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            CartError cartError = new CartError();
            cartError.setErrorCode(100);
            cartError.setErrorLog("수량이 제대로 선택되지 않았습니다.");
            return new ResponseEntity<>(cartError, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (cartMap == null) {
            cartMap = new HashMap<String, String[]>();
        }

        if (cartMap.get(id) != null) {
            int beforeAmount = Integer.parseInt(cartMap.get(id)[2]);
            int updatedAmount = Integer.parseInt(amount);
            int amountResult = beforeAmount + updatedAmount;
            String[] updatedCartDetailArray = { id, title, amount, thumbnailImage, totalPrice };
            cartMap.put(id, updatedCartDetailArray);
            session.setAttribute("cartSessionId", cartMap);

            CartLog cartLog = new CartLog();
            cartLog.setCartLog("이미 장바구니에 담겨있어서 수량을 조정하였습니다.");

            // cartMap.forEach((k,v)->for(int i = 0;i<4;i+);
            Iterator<String> keys = cartMap.keySet().iterator();
            while (keys.hasNext()) {
                String key = keys.next();
                String[] eachCartSession = cartMap.get(key);
                for (int i = 0; i < 4; i++) {
                    System.out.println(eachCartSession[i]);
                }
            }

            // System.out.println(cartMap.get("1")[0]);
            // System.out.println(cartMap.get("1")[1]);
            // System.out.println(cartMap.get("1")[2]);
            // System.out.println(cartMap.get("1")[3]);

            return new ResponseEntity<>(cartLog, HttpStatus.OK);
        } else {
            String[] cartDetailArray = { id, title, amount, thumbnailImage, totalPrice };
            cartMap.put(id, cartDetailArray);
            session.setAttribute("cartSessionId", cartMap);

            Iterator<String> keys = cartMap.keySet().iterator();
            while (keys.hasNext()) {
                String key = keys.next();
                String[] eachCartSession = cartMap.get(key);
                for (int i = 0; i < 4; i++) {
                    System.out.println(eachCartSession[i]);
                }
            }

            CartLog cartLog = new CartLog();
            cartLog.setCartLog("장바구니에 담겼습니다.");
            return new ResponseEntity<>(cartLog, HttpStatus.OK);
        }


    }   

    @RequestMapping(value="/", method=RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getCartList(HttpSession session) {
        Map<String, String[]> cartMap = (Map<String, String[]>) session.getAttribute("cartSessionId");

        Iterator<String> keys = cartMap.keySet().iterator();
        // ArrayList<String[]> responseBody = new ArrayList<>();
        ArrayList<Cart> cartList = new ArrayList<>();

        while (keys.hasNext()) {
            String key = keys.next();
            String[] eachCartSession = cartMap.get(key);
            // for (int i = 0; i < 4; i++) {
            //     System.out.println(eachCartSession[i]);
                
            // }
            // responseBody.add(eachCartSession);
            Cart cart = new Cart();
            cart.setId(Integer.parseInt(eachCartSession[0]));
            cart.setTitle(eachCartSession[1]);
            cart.setAmount(Integer.parseInt(eachCartSession[2]));
            cart.setThumbnailImage(eachCartSession[3]);
            cart.setTotalPrice(Integer.parseInt(eachCartSession[4]));
            cartList.add(cart);
        }

        return new ResponseEntity<>(cartList, HttpStatus.OK);

    }   

    @RequestMapping(value="/", method=RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> removeCartList(HttpSession session) {

        session.setAttribute("cartSession1", null);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> removeCartById(@PathVariable int id, HttpServletRequest request, HttpSession session) {
        Map<String, String[]> cartMap = (Map<String, String[]>) session.getAttribute("cartSessionId");
        cartMap.remove(id + "");

        Iterator<String> keys = cartMap.keySet().iterator();
        // ArrayList<String[]> responseBody = new ArrayList<>();
        ArrayList<Cart> cartList = new ArrayList<>();
        while (keys.hasNext()) {
            String key = keys.next();
            String[] eachCartSession = cartMap.get(key);
            // for (int i = 0; i < 4; i++) {
            //     System.out.println(eachCartSession[i]);
                
            // }
            // responseBody.add(eachCartSession);
            Cart cart = new Cart();
            cart.setId(Integer.parseInt(eachCartSession[0]));
            cart.setTitle(eachCartSession[1]);
            cart.setAmount(Integer.parseInt(eachCartSession[2]));
            cart.setThumbnailImage(eachCartSession[3]);
            cart.setTotalPrice(Integer.parseInt(eachCartSession[4]));
            cartList.add(cart);
        }

        return new ResponseEntity<>(cartList, HttpStatus.OK);

    }
}