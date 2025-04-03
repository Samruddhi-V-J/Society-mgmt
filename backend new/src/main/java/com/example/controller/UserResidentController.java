// package com.example.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.example.model.ResidentDetails;
// import com.example.model.User;
// import com.example.repository.ResidentDetailsRepository;
// import com.example.repository.UserRepository;

// import java.util.HashMap;
// import java.util.Map;
// import java.util.Optional;

// @RestController
// @RequestMapping("/api/users")
// public class UserResidentController {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private ResidentDetailsRepository residentDetailsRepository;

//     @GetMapping("/user-details")
//     public ResponseEntity<?> getUserDetails(@RequestParam String email) {
//         // Pehle email se user fetch karo
//         Optional<User> user = userRepository.findByEmail(email);
//         // Optional<ResidentDetails> name = residentDetailsRepository.findByName(name);


//         if (user.isPresent()) {
//             String userEmail = user.get().getEmail(); // Agar email field available hai

//             // String userName = user.get().getName(); // User ka naam le rahe hain

//             // Phir us naam se resident details fetch karo
//             Optional<ResidentDetails> resident = residentDetailsRepository.findByEmail(userEmail);

//             if (resident.isPresent()) {
//                 Map<String, Object> response = new HashMap<>();
//                 response.put("email", user.get().getEmail());
//                 response.put("name", resident.get().getName());
//                 response.put("phone", resident.get().getPhone());
//                 response.put("societyName", resident.get().getSocietyName());
//                 response.put("flatNo", resident.get().getFlatNo());
//                 response.put("postal", resident.get().getPostal());

//                 return ResponseEntity.ok(response);
//             }
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resident not found");
//         }
//         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//     }
// }


package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import com.example.model.User;
import com.example.model.ResidentDetails;
import com.example.service.UserService;
import com.example.service.ResidentDetailsService;
import java.util.*;

@RestController
@RequestMapping("/api")
public class UserResidentController {

    @Autowired
    private UserService userService;

    @Autowired
    private ResidentDetailsService residentDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        String result = userService.registerUser(user);
        if (result.equals("Email already exists")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/add-resident")
    public ResponseEntity<?> addResident(@RequestBody ResidentDetails resident) {
        if (userService.findByEmail(resident.getEmail()).isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found. Please sign up first.");
        }
        return ResponseEntity.ok(residentDetailsService.addResident(resident));
    }

    @GetMapping("/user-details")
    public ResponseEntity<?> getUserDetails(@RequestParam String email) {
        Optional<User> user = userService.findByEmail(email);
        Optional<ResidentDetails> resident = residentDetailsService.findByEmail(email);

        if (user.isPresent() && resident.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("email", user.get().getEmail());
            response.put("role", user.get().getRole());
            response.put("name", resident.get().getName());
            response.put("phone", resident.get().getPhone());
            response.put("societyName", resident.get().getSocietyName());
            response.put("flatNo", resident.get().getFlatNo());
            response.put("postal", resident.get().getPostal());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User details not found");
    }
}
