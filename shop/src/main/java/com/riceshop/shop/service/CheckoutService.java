package com.riceshop.shop.service;

import com.riceshop.shop.models.Checkout;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutService {
    @Autowired
    CheckoutDAO checkoutDAO;

    public Checkout getCheckoutById(long id) {
        return checkoutDAO.getCheckoutById(id);
    }

    public long checkout(Checkout checkout) {
        return checkoutDAO.checkout(checkout);
    }

}