package com.sm.newswave.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity @Data
public class BlogComment {

    @Id
    @SequenceGenerator(name="blog_comment_seq_gen", sequenceName = "blog_comment_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "blog_comment_seq_gen")
    @Setter(AccessLevel.NONE)
    private Long id;

    private String authorName;

    private String content;

    private LocalDateTime date;

    @ManyToOne
    private BlogPost post;

    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL)
    private List<BlogComment> replies;

    @ManyToOne
    private BlogComment parentComment;

}
