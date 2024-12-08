package com.example.CourseNest.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "review")
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private double rating;
    @Column(columnDefinition = "TEXT")
    private String comment;

    private String reviewerName;
    private String reviewerEmail;

    @ManyToOne
    @JoinColumn(name = "courses_id", nullable = false)
    @JsonIgnore //JsonIgnore is used to ignore the logical property used in serialization and deserialization.
    private Courses course;

    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    @JsonIgnore
    private Users users;
}

