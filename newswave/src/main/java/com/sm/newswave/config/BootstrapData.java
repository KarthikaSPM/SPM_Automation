package com.sm.newswave.config;

import com.sm.newswave.model.User;
import com.sm.newswave.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class BootstrapData implements CommandLineRunner {

    @Autowired
    UserService userService;

    @Override
    public void run(String... args) throws Exception {
        //addUser("useradmin2", "user2@admin.com", "adminPassword@123");
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
}
