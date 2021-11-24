package szgbizt.fiuk.backend.Controllers;

import org.hibernate.mapping.Any;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import szgbizt.fiuk.backend.DTOs.RegisterDTO;
import szgbizt.fiuk.backend.Models.User;
import szgbizt.fiuk.backend.Repositories.UserRepository;

import java.util.List;
import java.util.Optional;

//TODO: Átnézni a kódot, illetve megnézni a visszatérési értékeket, jó-e azok a válaszok, amik most vannak beállítva
@RestController(value = "/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @PostMapping(value = "/login",consumes = "application/json")
    public ResponseEntity<Any> userLogin(@RequestBody User user){
        //TODO: OAUTH2-től függően máshogy kell implementálni
      return null;
    }

    @PostMapping(value = "/logout",consumes = "application/json")
    public ResponseEntity<Any> logoutUser(@RequestBody User user){
        //TODO: OAUTH2-től függően máshogy kell implementálni
        return null;
    }


    @PostMapping(value = "/register",consumes = "application/json")
    public ResponseEntity<Any> userRegister(@RequestBody RegisterDTO registerDTO){
        //TODO
        if(registerDTO.getConfirmedPassword().equals(registerDTO.getPassword())){
            User user = new User();
            user.setAdmin(false);
            user.setEmail(registerDTO.getEmail());
            //TODO: Valszeg nem itt kéne encodeolni, hanem még mielőtt átküldjük a neten, de azért ide írtam egy ilyet
            user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
            userRepository.save(user);

        }else{
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping(value ="/")
    public ResponseEntity<List<User>> getAllUser(){
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping(value = "/edit/{id}",consumes = "application/json")
    public ResponseEntity<Any> editUser(@PathVariable long id, @RequestBody User user){
        //Egyszerűbb ha simán JSON-ban megadjuk az ID fieldet is, de most csinálom az eredeti módon
        assert user != null;
        user.setId(id);
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/del/{id}")
    public ResponseEntity<Any> deleteUser(@PathVariable long id){
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }








}
