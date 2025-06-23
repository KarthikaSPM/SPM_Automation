package com.sm.newswave.config;

import com.sm.newswave.model.Author;
import com.sm.newswave.model.BlogPost;
import com.sm.newswave.model.User;
import com.sm.newswave.repository.AuthorRepository;
import com.sm.newswave.repository.BlogPostRepository;
import com.sm.newswave.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class BootstrapData implements CommandLineRunner {

    @Autowired
    UserService userService;

    @Autowired
    BlogPostRepository blogPostRepository;

    @Autowired
    AuthorRepository authorRepository;

    @Override
    public void run(String... args) throws Exception {
        //addUser("useradmin2", "user2@admin.com", "adminPassword@123");
        //addBlogPost("firstBlog", "<h1>Hello World!</h1>");
        //addAuthor();
    }

    private void addUser(String username, String email, String password) {
        User user = new User();
        user.setName("NA");
        user.setPhone("000-000-0000");
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        userService.registerUser(user);
    }

    private void addBlogPost(String title, String content) {
        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(title);
        blogPost.setContent(content);
        blogPost.setBlogUrl("first");
        blogPostRepository.save(blogPost);
    }

    private void addAuthor() {
        Author author = new Author();
        author.setName("Rev. Dr. Sarah Johnson");
        author.setCredentials("Board Certified Chaplain, MDiv, BCC");
        author.setBio("With over 15 years of experience in hospital and hospice chaplaincy, Dr. Johnson brings deep spiritual care expertise to the digital space.");
        author.setAvatarUrl("https://via.placeholder.com/150?text=SJ");
        authorRepository.save(author);
    }
}
