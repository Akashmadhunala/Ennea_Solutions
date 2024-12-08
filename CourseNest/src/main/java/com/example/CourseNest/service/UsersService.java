package com.example.CourseNest.service;

import com.example.CourseNest.Exception.AlreadyInWishlist;
import com.example.CourseNest.Exception.CourseLimitException;
import com.example.CourseNest.model.Courses;
import com.example.CourseNest.model.Users;
import com.example.CourseNest.repository.CoursesRepository;
import com.example.CourseNest.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private CoursesRepository coursesRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

    public List<Users> allUsers() {
        return usersRepository.findAll();
    }

    public void addUser(Users users) {
        users.setPassword(encoder.encode(users.getPassword()));
        usersRepository.save(users);
    }


    public String verify(Users users) {
        Authentication authentication=authManager.authenticate(new UsernamePasswordAuthenticationToken(users.getUsername(),users.getPassword()));
        if(authentication.isAuthenticated()) {
            return jwtService.generateToken(users.getUsername());
        }
        return "Fail";
    }

    public void addWishlist(Integer userId,Integer courseId) {
        Courses courses=coursesRepository.findById(courseId)
                .orElseThrow(()->new RuntimeException("No course with id"));
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        if(users.getWishlist().contains(courses)){
            throw new AlreadyInWishlist("Already in wishlist");
        }
        users.getWishlist().add(courses);
        usersRepository.save(users);
    }

    public List<Courses> allWishlist(Integer userId) {
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        return users.getWishlist();
    }

    public void removeWishlist(Integer userId, Integer courseId) {
        Courses courses=coursesRepository.findById(courseId)
                .orElseThrow(()->new RuntimeException("No course with id"));
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        users.getWishlist().remove(courses);
        usersRepository.save(users);
    }

    public List<Courses> allCart(Integer userId) {
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        return users.getCart();
    }

    public void removeCart(Integer userId, Integer courseId) {
        Courses courses=coursesRepository.findById(courseId)
                .orElseThrow(()->new RuntimeException("No course with id"));
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        users.getCart().remove(courses);
        usersRepository.save(users);
    }

    public void addCart(Integer userId,Integer courseId) {
        Courses courses=coursesRepository.findById(courseId)
                .orElseThrow(()->new RuntimeException("No course with id"));
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        if(users.getCart().contains(courses)){
            throw new AlreadyInWishlist("Already in Cart");
        }
        users.getCart().add(courses);
        usersRepository.save(users);
    }

    public List<Courses> allEnrolled(Integer userId) {
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        return users.getCoursesEnrolled();
    }


    public void addEnrolled(Integer userId,Integer courseId) {
        Courses courses=coursesRepository.findById(courseId)
                .orElseThrow(()->new RuntimeException("No course with id"));
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        if(users.getCoursesEnrolled().contains(courses)){
            throw new AlreadyInWishlist("Already Enrolled in Course");
        }
        if(users.getCoursesEnrolled().size()>=5){
            throw new CourseLimitException("Course Enrollment limit exceeded");
        }
        courses.setEnrolledStudents(courses.getEnrolledStudents()+1);
        users.getCoursesEnrolled().add(courses);
        courses.getUsersEnrolled().add(users);
        coursesRepository.save(courses);
        usersRepository.save(users);
    }

    public void removeEnrolled(Integer userId, Integer courseId) {
        Courses courses=coursesRepository.findById(courseId)
                .orElseThrow(()->new RuntimeException("No course with id"));
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        users.getCoursesEnrolled().remove(courses);
        courses.getUsersEnrolled().remove(users);
        coursesRepository.save(courses);
        usersRepository.save(users);
    }

    public void updateProfile(Integer userId,Users updateDetails) {
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        users.setFirstName(updateDetails.getFirstName());
        users.setLastName(updateDetails.getLastName());
        users.setUsername(updateDetails.getUsername());
        users.setPassword(encoder.encode(updateDetails.getPassword()));
        users.setEmail(updateDetails.getEmail());
        users.setPhone(updateDetails.getPhone());
        users.setAboutYourself(updateDetails.getAboutYourself());
        users.setLinkedIn(updateDetails.getLinkedIn());
        users.setInstagram(updateDetails.getInstagram());
        users.setTwitter(updateDetails.getTwitter());
        users.setImage(updateDetails.getImage());

        usersRepository.save(users);
    }

    public void deleteProfile(Integer userId) {
        Users users=usersRepository.findById(userId).orElseThrow(()->new RuntimeException("Error"));
        users.getCoursesEnrolled().forEach((cor)->{
            cor.getUsersEnrolled().remove(users);
        });
        usersRepository.deleteById(userId);
    }

    public Users userById(Integer id) {
        return usersRepository.findById(id).orElseThrow(()->new RuntimeException("No profile with the given ID : "+id));
    }

    public Users userByUsername(String username) {
        return usersRepository.findByUsername(username);
    }
}
