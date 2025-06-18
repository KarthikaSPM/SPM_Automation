package com.sm.newswave.controller;

import com.sm.newswave.model.Contact;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("contact")
public class ContactController {
    @GetMapping
    public String getContact(HttpServletRequest request, Model model) {
        model.addAttribute("contactForm", new Contact());
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("title", "Contact");
        model.addAttribute("content", "contact/index");
        return "layout/index";
    }
}
