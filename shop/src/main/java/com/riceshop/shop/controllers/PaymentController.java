package com.riceshop.shop.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import com.riceshop.shop.models.Checkout;
import com.riceshop.shop.service.CheckoutService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("/api/payment")
@Controller
public class PaymentController {

    @Autowired
    CheckoutService checkoutService;

    @RequestMapping(value="/complete", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> checkout(@RequestParam Map<String, String> body, Checkout checkout) {
        String imp_uid = body.get("imp_uid").toString();
        String merchant_uid = body.get("merchant_uid").toString();
        String paid_amount = body.get("paid_amount").toString();
        String apply_num = body.get("apply_num").toString();
        String buyer_email = body.get("buyer_email").toString();
        String buyer_name = body.get("buyer_name").toString();
        String buyer_tel = body.get("buyer_tel").toString();
        String buyer_addr = body.get("buyer_addr").toString();
        String buyer_postcode = body.get("buyer_postcode").toString();

        String createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());

        checkout.setImp_uid(imp_uid);
        checkout.setMerchant_uid(merchant_uid);
        checkout.setPaid_amount(paid_amount);
        checkout.setApply_num(apply_num);
        checkout.setBuyer_email(buyer_email);
        checkout.setBuyer_name(buyer_name);
        checkout.setBuyer_tel(buyer_tel);
        checkout.setBuyer_addr(buyer_addr);
        checkout.setBuyer_postcode(buyer_postcode);
        checkout.setCreatedAt(createdAt);

        try {
            checkout = checkoutService.getCheckoutById(checkoutService.checkout(checkout));
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}