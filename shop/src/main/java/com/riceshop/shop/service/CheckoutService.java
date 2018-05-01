package com.riceshop.shop.service;

import java.util.List;

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
    
    public List<Checkout> getCheckoutList() {
        return checkoutDAO.getCheckoutList();
    }

    public List<Checkout> getUncheckedList() {
        return checkoutDAO.getUncheckedList();
    }

    public List<Checkout> getCheckedList() {
        return checkoutDAO.getCheckedList();
    }

    public List<Checkout> searchByUsername(String value) {
        return checkoutDAO.searchByUsername(value);
    }

    public List<Checkout> searchByEmail(String value) {
        return checkoutDAO.searchByEmail(value);
    }

    public List<Checkout> searchByAddress(String value) {
        return checkoutDAO.searchByAddress(value);
    }

    public List<Checkout> searchByPhone(String value) {
        return checkoutDAO.searchByPhone(value);
    }
}