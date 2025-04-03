package com.example.controller;

import com.example.model.User;
import com.example.repository.UserRepository;

import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/usersdata")
public class UserController {
     private static final Logger logger = LoggerFactory.getLogger(UserController.class);
   
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // **Signup Endpoint**
    @PostMapping("/signup")
    @CrossOrigin(origins = "http://localhost:5173/")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user); // Directly store without hashing
    }

    @GetMapping
public List<User> getAllUsers() {
    List<User> users = userRepository.findAll();
    logger.info("Total users fetched: " + users.size());
    for (User u : users) {
        logger.info("User: " + u.getEmail());
    }
    return users;
}



    // **Login Endpoint**
    // @PostMapping("/login")
    // @CrossOrigin(origins = "http://localhost:5173/")
    // public String loginUser(@RequestBody User loginRequest) {
    //     Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

    //     if (userOptional.isPresent()) {
    //         User user = userOptional.get();

    //         // Check if the password matches
    //         if (user.getPassword().equals(loginRequest.getPassword())) {
    //               String role = user.getRole(); 
    //             return "Login successful! Welcome, " + user.getEmail();
    //         } else {
    //             return "Invalid password!";
    //         }
    //     } else {
    //         return "User not found!";
    //     }
    // }

    @PostMapping("/login")
@CrossOrigin(origins = "http://localhost:5173/")
public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
    Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

    if (userOptional.isPresent()) {
        User user = userOptional.get();

        // Check if the password matches
        if (user.getPassword().equals(loginRequest.getPassword())) {
            // Create response map
            Map<String, String> response = new HashMap<>();
            response.put("email", user.getEmail());
            response.put("role", user.getRole());

            return ResponseEntity.ok(response); // Return user email and role
        } else {
            return ResponseEntity.badRequest().body("Invalid password!");
        }
    } else {
        return ResponseEntity.badRequest().body("User not found!");
    }
}


    // Fetch User Details by Email (Using Query Parameter)
@GetMapping("/getByEmail")
public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
    logger.info("Fetching user details for email: " + email);

    Optional<User> userOptional = userRepository.findByEmail(email);

    if (userOptional.isPresent()) {
        User user = userOptional.get();
        logger.info("User found: " + user.getEmail());

        // Hide password for security reasons
        return ResponseEntity.ok(new User(user.getEmail(), user.getPassword(), user.getRole()));
    } else {
        logger.warn("User not found: " + email);
        return ResponseEntity.status(404).body("User not found");
    }
}


}




// package com.example.controller;
 
// import com.example.model.User;
// import com.example.repository.UserRepository;
// import org.springframework.web.bind.annotation.*;
 
// import java.util.List;
 
// @RestController
// @RequestMapping("/usersdata")
// public class UserController {
//     private final UserRepository userRepository;
 
//     public UserController(UserRepository userRepository) {
//         this.userRepository = userRepository;
//     }
 
//     @GetMapping
//     public List<User> getAllUsers() {
//         return userRepository.findAll();
//     }
 
//     @PostMapping
//     public User createUser(@RequestBody User user) {
//         return userRepository.save(user);
//     }
// }


// // package com.example.controller;

// // import com.example.model.User;
// // import com.example.repository.UserRepository;
// // import org.springframework.http.ResponseEntity;
// // import org.springframework.http.HttpStatus;
// // import org.springframework.web.bind.annotation.*;

// // import java.util.List;

// // @RestController
// // @RequestMapping("/api/users")
// // public class UserController {
// //     private final UserRepository userRepository;

// //     public UserController(UserRepository userRepository) {
// //         this.userRepository = userRepository;
// //     }

// //     @GetMapping
// //     public ResponseEntity<List<User>> getAllUsers() {
// //         List<User> users = userRepository.findAll();
// //         return ResponseEntity.ok(users);  // Returns HTTP 200 OK with the user list
// //     }

// //     @PostMapping("/signup")
// //     public ResponseEntity<?> createUser(@RequestBody User user) {
// //         try {
// //             System.out.println("Received Signup Request: " + user);
// //             User savedUser = userRepository.save(user);
// //             return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);  // Returns HTTP 201 Created
// //         } catch (Exception e) {
// //             e.printStackTrace();
// //             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Signup failed: " + e.getMessage());
// //         }
// //     }
// // }



