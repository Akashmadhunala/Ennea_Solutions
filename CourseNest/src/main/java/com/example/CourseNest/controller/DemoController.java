package com.example.CourseNest.controller;

import com.example.CourseNest.model.Courses;
import com.example.CourseNest.model.Users;
import com.example.CourseNest.repository.CoursesRepository;
import com.example.CourseNest.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class DemoController {

    @Autowired
    private CoursesRepository coursesRepository;

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/users/add")
    public void addUser(@RequestBody Users user){
        user.getCoursesEnrolled().forEach(course -> {
            Courses existingCourse = coursesRepository.findById(course.getId())
                    .orElseThrow(() -> new RuntimeException("Course not found with ID: " + course.getId()));
            existingCourse.getUsersEnrolled().add(user);
        });
        usersRepository.save(user);

    }


}
