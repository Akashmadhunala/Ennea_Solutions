package com.example.CourseNest.repository;

import com.example.CourseNest.model.Courses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursesRepository extends JpaRepository<Courses,Integer> {

    @Query("SELECT c FROM Courses c JOIN c.topicsCovered t WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(t) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Courses> searchCourse(String query);

    @Query("SELECT c FROM Courses c JOIN c.topicsCovered t WHERE LOWER(t) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Courses> searchCategory(String query);
}
