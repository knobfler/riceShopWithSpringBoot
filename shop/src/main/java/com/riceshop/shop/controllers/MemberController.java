package com.riceshop.shop.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpSession;

import com.riceshop.shop.models.Member;
import com.riceshop.shop.models.SignupError;
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

        String userID_regex = "^[a-zA-Z]{1}[a-zA-Z0-9_]{4,11}$";
        String userEmail_regex = "^[_a-zA-Z0-9-\\.]+@[\\.a-zA-Z0-9-]+\\.[a-zA-Z]+$";
        String userName_regex = ".*[ㄱ-ㅎㅏ-ㅣ가-힣]+.*";


        Pattern VALID_USERID_REGEX = Pattern.compile(userID_regex, Pattern.CASE_INSENSITIVE);
        Pattern VALID_USEREMAIL_REGEX = Pattern.compile(userEmail_regex, Pattern.CASE_INSENSITIVE);
        Pattern VALID_USERNAME_REGEX = Pattern.compile(userName_regex, Pattern.CASE_INSENSITIVE);

        Matcher matcher_userID = VALID_USERID_REGEX.matcher(userID);
        Matcher matcher_userEmail = VALID_USEREMAIL_REGEX.matcher(userEmail);
        Matcher matcher_userName = VALID_USERNAME_REGEX.matcher(userName);


        if (!matcher_userID.find()) {
            SignupError signupError = new SignupError();
            signupError.setErrorCode(100);
            signupError.setErrorLog("부적절한 아이디입니다");
            return new ResponseEntity<>(signupError, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (userPassword.length() < 4 || !(userPassword instanceof String)) {
            SignupError signupError = new SignupError();
            signupError.setErrorCode(400);
            signupError.setErrorLog("패스워드는 4자이상으로 해주세요.");
            return new ResponseEntity<>(signupError, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        
        if (!matcher_userEmail.find()) {
            SignupError signupError = new SignupError();
            signupError.setErrorCode(300);
            signupError.setErrorLog("부적절한 이메일입니다.");
            return new ResponseEntity<>(signupError, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!matcher_userName.find()) {
            SignupError signupError = new SignupError();
            signupError.setErrorCode(200);
            signupError.setErrorLog("부적절한 이름입니다.");
            return new ResponseEntity<>(signupError, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(memberService.getUserByUserID(userID)) {
            SignupError signupError = new SignupError();
            signupError.setErrorCode(200);
            signupError.setErrorLog("이미 가입된 아이디입니다.");
            return new ResponseEntity<>(signupError, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        
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