package com.example.CourseNest.controller;

import com.example.CourseNest.model.Users;
import com.example.CourseNest.service.CoursesService;
import com.example.CourseNest.model.Courses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/courses")
public class CoursesController {

    @Autowired
    private CoursesService coursesService;

    @GetMapping("/{id}")
    public Courses courseById(@PathVariable Integer id){
        return coursesService.findById(id);
    }

    @GetMapping("/all")
    public List<Courses> allCourses(){
        return coursesService.findAllCourses();
    }

    @GetMapping("/search/{query}")
    public List<Courses> search(@PathVariable String query){
        return coursesService.findCourses(query);
    }


    @GetMapping("/categories/{query}")
    public List<Courses> categories(@PathVariable String query){
        return coursesService.findCategories(query);
    }

    @PostMapping("/add")
    public void addCourse(@RequestBody Courses course){
        coursesService.addCourse(course);
    }

    @PutMapping("/update/{courseId}")
    public void editCourse(@PathVariable Integer courseId,@RequestBody Courses courseDetails){
        coursesService.editCourse(courseId,courseDetails);
    }

    @DeleteMapping("/delete/{courseId}")
    public void deleteCourse(@PathVariable Integer courseId){
        coursesService.deleteCourse(courseId);
    }

    @GetMapping("/usersEnrolled/{courseId}")
    public List<Users> usersEnrolled(@PathVariable Integer courseId){
        return coursesService.usersEnrolled(courseId);
    }

}
