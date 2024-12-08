package com.example.CourseNest.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String aboutYourself;
    private String linkedIn;
    private String instagram;
    private String twitter;
    private String image;

    @Enumerated(EnumType.STRING) // This annotation specifies that the enum should be stored as a String in the database.
    private Role role;

    @ManyToMany(mappedBy = "usersEnrolled")
    @JsonIgnore
    private List<Courses> coursesEnrolled;

    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reviews> userReviews;

    @ManyToMany
    @JoinTable(name = "user_wishlist", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
    private List<Courses> wishlist;

    @ManyToMany
    @JoinTable(name = "user_cart", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
    private List<Courses> cart;



}
