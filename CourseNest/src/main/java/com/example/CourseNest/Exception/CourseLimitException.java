package com.example.CourseNest.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class CourseLimitException extends RuntimeException {
    public CourseLimitException(String message) {
        super(message);
    }
}
