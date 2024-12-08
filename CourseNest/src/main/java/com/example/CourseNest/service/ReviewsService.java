package com.example.CourseNest.service;

import com.example.CourseNest.model.Courses;
import com.example.CourseNest.model.Reviews;
import com.example.CourseNest.model.Users;
import com.example.CourseNest.repository.CoursesRepository;
import com.example.CourseNest.repository.ReviewsRepository;
import com.example.CourseNest.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class ReviewsService {

    @Autowired
    private ReviewsRepository reviewsRepository;
    @Autowired
    private CoursesRepository coursesRepository;
    @Autowired
    private UsersRepository usersRepository;


    public void addReview(Integer userId,Integer courseId, Reviews review) {
        Courses courses=coursesRepository.findById(courseId)
                .orElseThrow(()->new RuntimeException("No course with given id"));
        Users users=usersRepository.findById(userId).orElseThrow(()->new RuntimeException("No user with given id"));;
        review.setCourse(courses);
        review.setUsers(users);
        review.setReviewerName(users.getUsername());
        review.setReviewerEmail(users.getEmail());
        courses.getCourseReviews().add(review);
        users.getUserReviews().add(review);
        courses.setRating(
                BigDecimal.valueOf((courses.getRating() + review.getRating()) / (courses.getCourseReviews().size()+1))
                        .setScale(2, RoundingMode.HALF_UP)
                        .doubleValue()
        );
        reviewsRepository.save(review);
    }

    public void editReview(Integer reviewId, Reviews review) {
        Reviews reviews=reviewsRepository.findById(reviewId)
                .orElseThrow(()->new RuntimeException("No Review with given id"));
        reviews.setComment(review.getComment());
        reviews.setRating(review.getRating());

        reviewsRepository.save(reviews);
    }

    public void deleteReview(Integer reviewId) {
        reviewsRepository.deleteById(reviewId);
    }

    public Reviews findReviewById(Integer id) {
        return reviewsRepository.findById(id).orElseThrow(()->new RuntimeException("Error in id"));
    }
}
