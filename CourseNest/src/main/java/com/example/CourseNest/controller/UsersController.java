package com.example.CourseNest.controller;

import com.example.CourseNest.model.Courses;
import com.example.CourseNest.model.Users;
import com.example.CourseNest.repository.UsersRepository;
import com.example.CourseNest.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @GetMapping("/all")
    public List<Users> allUsers(){
        return usersService.allUsers();
    }

    @PostMapping("/register")
    public Users addUser(@RequestBody Users users){
        usersService.addUser(users);
        return users;
    }

    @PostMapping("/login")
    public String login(@RequestBody Users users){
        return usersService.verify(users);
    }

    @GetMapping("/profile/{id}")
    public Users userById(@PathVariable Integer id){
        return usersService.userById(id);
    }

    @GetMapping("/profile/username/{username}")
    public Users userByUsername(@PathVariable String username){
        return usersService.userByUsername(username);
    }

    @PostMapping("/addToWishlist/{userId}/{courseId}")
    public void addWishlist(@PathVariable Integer userId,@PathVariable Integer courseId){
        usersService.addWishlist(userId,courseId);
    }

    @GetMapping("/wishlist/{userId}")
    public List<Courses> allWishlist(@PathVariable Integer userId){
        return usersService.allWishlist(userId);
    }

    @DeleteMapping("/wishlist/{userId}/{courseId}")
    public void deleteWishlist(@PathVariable Integer userId, @PathVariable Integer courseId){
        usersService.removeWishlist(userId,courseId);
    }

    @PostMapping("/addToCart/{userId}/{courseId}")
    public void addCart(@PathVariable Integer userId,@PathVariable Integer courseId){
        usersService.addCart(userId,courseId);
    }

    @GetMapping("/cart/{userId}")
    public List<Courses> allCart(@PathVariable Integer userId){
        return usersService.allCart(userId);
    }

    @DeleteMapping("/cart/{userId}/{courseId}")
    public void deleteCart(@PathVariable Integer userId, @PathVariable Integer courseId){
        usersService.removeCart(userId,courseId);
    }

    @PostMapping("/courses_enrolled/{userId}/{courseId}")
    public void addEnrolled(@PathVariable Integer userId,@PathVariable Integer courseId){
        usersService.addEnrolled(userId,courseId);
    }

    @GetMapping("/courses_enrolled/{userId}")
    public List<Courses> enrolled(@PathVariable Integer userId){
        return usersService.allEnrolled(userId);
    }

    @DeleteMapping("/courses_enrolled/{userId}/{courseId}")
    public void deleteEnrolled(@PathVariable Integer userId, @PathVariable Integer courseId){
        usersService.removeEnrolled(userId,courseId);
    }

    @PutMapping("/update/{userId}")
    public void updateUser(@PathVariable Integer userId,@RequestBody Users updateDetails){
        usersService.updateProfile(userId,updateDetails);
    }

    @DeleteMapping("/delete/{userId}")
    public void deleteUser(@PathVariable Integer userId){
        usersService.deleteProfile(userId);
    }


}


