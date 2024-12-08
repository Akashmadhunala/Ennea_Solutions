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
public class Courses {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;
    private double rating;
    private String tutor;
    private String language;

    @ElementCollection
    @CollectionTable(name = "course_objectives", joinColumns = @JoinColumn(name = "courses_id"))
    @Column(name = "objective",columnDefinition = "TEXT")
    private List<String> courseObjectives;

    @ElementCollection
    @CollectionTable(name = "topics_covered", joinColumns = @JoinColumn(name = "courses_id"))
    @Column(name = "topics",columnDefinition = "TEXT")
    private List<String> topicsCovered;

    private int enrolledStudents;
    private int price;
    private String image;


    @ManyToMany
    @JoinTable(
            name = "courses_users",joinColumns = @JoinColumn(name = "courses_id"),
            inverseJoinColumns = @JoinColumn(name = "users_id")
    )
    @JsonIgnore
    private List<Users> usersEnrolled;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reviews> courseReviews;


}
