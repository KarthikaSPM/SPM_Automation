package com.sm.newswave.controller;

import com.sm.newswave.model.BlogPost;
import com.sm.newswave.service.BlogService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/blog")
public class BlogController {

    @Autowired
    BlogService blogService;

    @GetMapping
    public String getBlog(@RequestParam(defaultValue = "0") int page, HttpServletRequest request, Model model) {
        model.addAttribute("postPage", blogService.blogPostPageRequest(page, 12));
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("title", "Blog");
        model.addAttribute("content", "blog/index");
        return "layout";
    }

    @GetMapping("/{path}")
    public String getPost(@PathVariable("path") String path, HttpServletRequest request, Model model) {
        BlogPost blogPost = blogService.findBlogPostByBlogUrl(path);
        model.addAttribute("post", blogPost);
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("title", blogPost.getTitle());
        model.addAttribute("content", "blog/" + path);
        return "layout";
    }
}
