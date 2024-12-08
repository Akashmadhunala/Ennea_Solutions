package com.example.CourseNest.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class AlreadyInWishlist extends RuntimeException {
    public AlreadyInWishlist(String message) {
        super(message);
    }
}

