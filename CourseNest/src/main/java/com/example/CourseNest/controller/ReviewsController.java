package com.example.CourseNest.controller;

import com.example.CourseNest.model.Reviews;
import com.example.CourseNest.service.ReviewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/reviews")
public class ReviewsController {

    @Autowired
    private ReviewsService reviewsService;

    @GetMapping("/{id}")
    public Reviews findReviewById(@PathVariable Integer id){
        return reviewsService.findReviewById(id);
    }

    @PostMapping("/add/{userId}/{courseId}")
    public void addReview(@PathVariable Integer userId,@PathVariable Integer courseId, @RequestBody Reviews review){
        reviewsService.addReview(userId,courseId,review);
    }

    @PutMapping("/edit/{reviewId}")
    public void editReview(@PathVariable Integer reviewId,@RequestBody Reviews review){
        reviewsService.editReview(reviewId,review);
    }

    @DeleteMapping("/delete/{reviewId}")
    public void deleteReview(@PathVariable Integer reviewId){
        reviewsService.deleteReview(reviewId);
    }
}
