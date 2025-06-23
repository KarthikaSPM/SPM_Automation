package com.sm.newswave.service;

import com.sm.newswave.model.BlogPost;
import com.sm.newswave.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class BlogService {

    @Autowired
    BlogPostRepository blogPostRepository;

    public Page<BlogPost> blogPostPageRequest(int page, int pageSize) {
        return blogPostRepository.findAll(
                PageRequest.of( page, pageSize,
                        Sort.by(Sort.Direction.DESC, "publishedDate")));
    }

    public BlogPost findBlogPostById(Long id) {
        return blogPostRepository.findById(id).orElseThrow();
    }

    public BlogPost findBlogPostByBlogUrl(String url) {
        return blogPostRepository.findBlogPostByBlogUrl(url);
    }

}
