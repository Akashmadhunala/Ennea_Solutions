package com.example.CourseNest.service;

import com.example.CourseNest.model.Courses;
import com.example.CourseNest.model.Users;
import com.example.CourseNest.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.CourseNest.repository.CoursesRepository;

import java.util.List;

@Service
public class CoursesService {

    @Autowired
    private CoursesRepository coursesRepository;

    @Autowired
    private UsersRepository usersRepository;


    public List<Courses> findAllCourses() {
        return coursesRepository.findAll();
    }

    public List<Courses> findCourses(String query) {
        return coursesRepository.searchCourse(query);
    }

    public List<Courses> findCategories(String query) {
        return coursesRepository.searchCategory(query);
    }

    public Courses findById(Integer id) {
        return coursesRepository.findById(id).orElseThrow(()->new RuntimeException("No course with the given ID : "+id));
    }

    public void addCourse(Courses course) {
        course.setEnrolledStudents(0);
        course.setRating(5);
        coursesRepository.save(course);
    }

    public void editCourse(Integer courseId,Courses courseDetails) {
        Courses courses=coursesRepository.findById(courseId)
                .orElseThrow(()->new RuntimeException("No course with id"));
        courses.setTitle(courseDetails.getTitle());
        courses.setDescription((courseDetails.getDescription()));
        courses.setTutor(courseDetails.getTutor());
        courses.setLanguage(courseDetails.getLanguage());
        courses.setCourseObjectives(courseDetails.getCourseObjectives());
        courses.setTopicsCovered(courseDetails.getTopicsCovered());
        courses.setPrice(courseDetails.getPrice());
        courses.setImage(courseDetails.getImage());
        coursesRepository.save(courses);
    }

    public void deleteCourse(Integer courseId) {
        Courses courses=coursesRepository.findById(courseId).orElseThrow(()->new RuntimeException("Error"));
        courses.getUsersEnrolled().forEach((users)->{
            users.getCoursesEnrolled().remove(courses);
            users.getWishlist().remove(courses);
            users.getCart().remove(courses);
        });
        coursesRepository.deleteById(courseId);
    }

    public List<Users> usersEnrolled(Integer courseId) {
        Courses courses=coursesRepository.findById(courseId)
                .orElseThrow(()->new RuntimeException("No course with the given ID : "+courseId));
        return courses.getUsersEnrolled();
    }
}
