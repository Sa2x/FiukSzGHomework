package szgbizt.fiuk.backend.Controllers;

import org.hibernate.mapping.Any;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import szgbizt.fiuk.backend.DTOs.RegisterDTO;
import szgbizt.fiuk.backend.Models.User;

import java.util.List;

@RestController(value = "/user")
public class UserController {

    @PostMapping(value = "/login",consumes = "application/json")
    public ResponseEntity<Any> userLogin(@RequestBody User user){
        //TODO
        return null;
    }

    @PostMapping(value = "/logout",consumes = "application/json")
    public ResponseEntity<Any> logoutUser(@RequestBody User user){
        //TODO
        return null;
    }


    @PostMapping(value = "/register",consumes = "application/json")
    public ResponseEntity<Any> userRegister(@RequestBody RegisterDTO registerDTO){
        //TODO
        return null;
    }

    @GetMapping(value ="/")
    public ResponseEntity<List<User>> getAllUser(){
        //TODO
        return null;
    }

    @PutMapping(value = "/edit/{id}",consumes = "application/json")
    public ResponseEntity<Any> editUser(@PathVariable long id, @RequestBody User user){
        //TODO
        return null;
    }

    @DeleteMapping(value = "/del/{id}")
    public ResponseEntity<Any> deleteUser(@PathVariable long id){
        //TODO
        return null;
    }







}
