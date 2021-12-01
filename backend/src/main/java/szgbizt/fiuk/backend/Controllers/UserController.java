package szgbizt.fiuk.backend.Controllers;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.hibernate.mapping.Any;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import szgbizt.fiuk.backend.Auth.Auth;
import szgbizt.fiuk.backend.DTOs.RegisterDTO;
import szgbizt.fiuk.backend.DTOs.TokenDTO;
import szgbizt.fiuk.backend.Models.User;
import szgbizt.fiuk.backend.Repositories.UserRepository;

import java.util.*;

//TODO: Átnézni a kódot, illetve megnézni a visszatérési értékeket, jó-e azok a válaszok, amik most vannak beállítva
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    //MUKSZIK
    @PostMapping(value = "/login",consumes = "application/json")
    public ResponseEntity<TokenDTO> userLogin(@RequestBody User user){
        assert user != null;
        Optional<User> foundUser = userRepository.findUserByEmail(user.getEmail());
        if(foundUser.isPresent()){
            if(passwordEncoder.matches(user.getPassword(),foundUser.get().getPassword())){
                Map<String,Object> claims = new HashMap<>();
                claims.put("user_id",foundUser.get().getId());
                claims.put("user_email",foundUser.get().getEmail());
                claims.put("user_password",foundUser.get().getPassword());
                claims.put("user_admin",foundUser.get().isAdmin());
                String jwt = Jwts.builder()
                      .addClaims(claims)
                        .setIssuer("backend")
                        .setExpiration(new Date(System.currentTimeMillis() + 60 * 24 * 1000))
                        .signWith(SignatureAlgorithm.HS512, "secret")
                        .compact();
                return ResponseEntity.ok(new TokenDTO(jwt));
            }
        }else{
            return new ResponseEntity("Wrong password!",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("Wrong email!",HttpStatus.BAD_REQUEST);
    }

    //MUKSZIK
    @PostMapping(value = "/register",consumes = "application/json")
    public ResponseEntity<Any> userRegister(@RequestBody RegisterDTO registerDTO){
        assert registerDTO != null;
        if (userRepository.existsByEmail(registerDTO.getEmail())){
            return new ResponseEntity("Username already in use!",HttpStatus.BAD_REQUEST);
        }
        if(registerDTO.getConfirmedPassword().equals(registerDTO.getPassword())){
            User user = new User();
            user.setAdmin(false);
            user.setEmail(registerDTO.getEmail());
            user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
            userRepository.save(user);

        }else{
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/me")
    public ResponseEntity<User> getUser(@Auth User user){
        Optional<User> foundUser = userRepository.findUserByEmail(user.getEmail());
        if(foundUser.isPresent()){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    //MUKSZIK
    @GetMapping(value ="/")
    public ResponseEntity<List<User>> getAllUser(@Auth User user){
        return ResponseEntity.ok(userRepository.findAll());
    }

    //MUKSZIK
    @PutMapping(value = "/edit/{id}",consumes = "application/json")
    public ResponseEntity<User> editUser(@PathVariable long id, @RequestBody User editableUser, @Auth User user){
        //Egyszerűbb ha simán JSON-ban megadjuk az ID fieldet is, de most csinálom az eredeti módon
        if(!user.isAdmin()){
            return new ResponseEntity("You are not an admin!",HttpStatus.UNAUTHORIZED);
        }
        editableUser.setId(id);
        userRepository.findById(id).ifPresent(foundUser -> userRepository.save(editableUser));
        return ResponseEntity.ok(userRepository.findById(id).get());
    }
    //MUKSZIK
    @DeleteMapping(value = "/del/{id}")
    public ResponseEntity<Any> deleteUser(@PathVariable long id,@Auth User user){
        if(!user.isAdmin()){
            return new ResponseEntity("You are not an admin!",HttpStatus.UNAUTHORIZED);
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
