package com.riceshop.shop.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.riceshop.shop.models.ImageItem;
import com.riceshop.shop.service.MemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;;

@RequestMapping("/api/uploads")
@Controller
public class UploadController {
    @Autowired
    MemberService memberService;

    private final String uploadPath = "/riceshop/upload/";

    @RequestMapping(value = "/image", method = RequestMethod.GET)
    public void image(HttpServletRequest request, HttpServletResponse response) {
        String saveName = request.getQueryString();
        if (saveName == null) {
            return;
        }
        File f = new File(uploadPath + saveName);
        InputStream is = null;

        try {
            is = new FileInputStream(f);
            OutputStream oos = response.getOutputStream();
            byte[] buf = new byte[8192];
            int c = 0;
            while ((c = is.read(buf, 0, buf.length)) > 0) {
                oos.write(buf, 0, c);
                oos.flush();
            }
            oos.close();
            is.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value="/editor/image", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> editorUploadImage(ImageItem imageItem ,@RequestParam("file") MultipartFile file) {
        String saveName = String.valueOf(new Date().getTime());

        OutputStream fos = null;

        try {
            fos = new FileOutputStream(uploadPath + File.separator + saveName + ".jpg");
            fos.write(file.getBytes());
            imageItem.setImageName(saveName + ".jpg");
            return new ResponseEntity<>(imageItem, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (fos != null) {
                    fos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }   
}