package com.riceshop.shop.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.riceshop.shop.models.Member;
import com.riceshop.shop.service.MemberService;
import com.riceshop.shop.utils.AES256Util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;;

@Controller
@RequestMapping("/api/member")
public class MemberController {


    @Autowired
    MemberService memberService;

    @RequestMapping(value="/", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> register(Member member, @RequestBody Map<String, String> body) {
        String userID = body.get("userID");
        String userPassword = body.get("userPassword");
        String userEmail = body.get("userEmail");
        String userName = body.get("userName");

        String publishedDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());

        
        try {
            AES256Util util = new AES256Util("myHashKey123456#@#$0098877^^^^");
            userPassword = util.encrypt(userPassword);
            
            member.setUserID(userID);
            member.setUserPassword(userPassword);
            member.setUserEmail(userEmail);
            member.setUserName(userName);
            member.setCreatedAt(publishedDate);
            member = memberService.getUserById(memberService.signup(member));
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        
    }

    @RequestMapping(value="/login", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> memberLogin(@RequestBody Map<String, String> body, HttpSession session) {
        String userID = body.get("userID");
        String userPassword = body.get("userPassword");

        try {
            Boolean exisiting = memberService.getUserByUserID(userID);
            if (!exisiting) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            String hashedPassword = memberService.getHashedPassword(userID);
            AES256Util util = new AES256Util("myHashKey123456#@#$0098877^^^^");
            String decrypted = util.decrypt(hashedPassword);

            if (decrypted.equals(userPassword)) {
                session.setAttribute("memberLogged", true);
                return new ResponseEntity<>(true, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value="/check", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> memberCheck(HttpSession session) {
        if (session.getAttribute("memberLogged") != null) { 
            if((Boolean) session.getAttribute("memberLogged")) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value="/logout", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> memberLogout(HttpSession session) {
        session.setAttribute("memberLogged", null);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}