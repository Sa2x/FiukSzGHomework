package szgbizt.fiuk.backend;

import org.hibernate.mapping.Any;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import szgbizt.fiuk.backend.Controllers.UserController;
import szgbizt.fiuk.backend.DTOs.RegisterDTO;
import szgbizt.fiuk.backend.DTOs.TokenDTO;
import szgbizt.fiuk.backend.Models.User;
import szgbizt.fiuk.backend.Repositories.UserRepository;

import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
public class UserControllerTest {

    private final String email = "test@fiuk.com";
    private final String password = "password";

    @Autowired
    private UserController userController;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() throws Exception {
        userRepository.deleteAll();
    }

    @Test
    void userLoginSuccessful() {
        User user = initBasicUser();
        userRepository.save(user);

        ResponseEntity<TokenDTO> tokenDTOResponseEntity = userController.userLogin(user);

        assertTrue(tokenDTOResponseEntity.getStatusCode().is2xxSuccessful());
    }

    @Test
    void userLoginWrongPassword() {
        User user1 = initBasicUser();
        userRepository.save(user1);
        User user2 = new User();
        user2.setEmail(email);
        user2.setPassword("wrong_password");
        user2.setAdmin(false);

        ResponseEntity<TokenDTO> tokenDTOResponseEntity = userController.userLogin(user2);

        assertEquals(Objects.requireNonNull(tokenDTOResponseEntity.getBody()).getToken(), "Wrong Password!");
    }

    @Test
    void userLoginWrongEmail() {
        User user1 = initBasicUser();
        userRepository.save(user1);
        User user2 = new User();
        user2.setEmail("wrong@fiuk.com");
        user2.setPassword(password);
        user2.setAdmin(false);

        ResponseEntity<TokenDTO> tokenDTOResponseEntity = userController.userLogin(user2);

        assertEquals(Objects.requireNonNull(tokenDTOResponseEntity.getBody()).getToken(), "Wrong email!");
    }

    @Test
    void userRegister(){
        RegisterDTO registerDTO = new RegisterDTO();
        registerDTO.setEmail(email);
        registerDTO.setPassword(password);
        registerDTO.setConfirmedPassword(password);

        ResponseEntity<Any> anyResponseEntity = userController.userRegister(registerDTO);

        assertTrue(userRepository.findUserByEmail(email).isPresent());
    }

    @Test
    void userRegisterAlreadyExists() {
        RegisterDTO registerDTO = new RegisterDTO();
        registerDTO.setEmail(email);
        registerDTO.setPassword(password);
        registerDTO.setConfirmedPassword(password);

        User user = initBasicUser();
        userRepository.save(user);

        ResponseEntity<Any> anyResponseEntity = userController.userRegister(registerDTO);

        assertEquals(anyResponseEntity.getStatusCode(), HttpStatus.BAD_REQUEST);
    }

    @Test
    void userRegisterWrongPasswordConfirmation() {
        RegisterDTO registerDTO = new RegisterDTO();

        registerDTO.setEmail(email);
        registerDTO.setPassword(password);
        registerDTO.setConfirmedPassword("paxxword");

        ResponseEntity<Any> anyResponseEntity = userController.userRegister(registerDTO);

        assertEquals(anyResponseEntity.getStatusCode(), HttpStatus.BAD_REQUEST);
    }

    @Test
    void getUser() {
        User user = initBasicUser();
        userRepository.save(user);

        ResponseEntity<User> userResponseEntity = userController.getUser(user);

        assertEquals(Objects.requireNonNull(userResponseEntity.getBody()).getEmail(), user.getEmail());
    }

    @Test
    void getUserNotFound() {
        User user = initBasicUser();

        ResponseEntity<User> userResponseEntity = userController.getUser(user);

        assertEquals(userResponseEntity.getStatusCode(), HttpStatus.NOT_FOUND);
    }

    @Test
    void getAllUsersMultiple() {
        User user1 = initBasicUser();
        User user2 = new User();
        user2.setEmail("2@email.com");
        user2.setPassword("pw");
        user2.setAdmin(true);
        userRepository.save(user1);
        userRepository.save(user2);

        ResponseEntity<List<User>> allUsers = userController.getAllUser(user2);

        assertEquals(2, Objects.requireNonNull(allUsers.getBody()).size());
    }

    @Test
    void getAllUsersOne() {
        User user2 = new User();
        user2.setEmail("2@email.com");
        user2.setPassword("pw");
        user2.setAdmin(true);
        userRepository.save(user2);

        ResponseEntity<List<User>> allUsers = userController.getAllUser(user2);

        assertEquals(1, Objects.requireNonNull(allUsers.getBody()).size());
    }

    @Test
    void editUser() {
        User userToEdit = initBasicUser();
        User admin = new User();
        admin.setAdmin(true);
        admin.setEmail("admin@fiuk.com");
        admin.setPassword("pw");
        userRepository.save(userToEdit);
        userRepository.save(admin);
        long id = userRepository.findUserByEmail(email).get().getId();
        userToEdit.setEmail("another@email.com");

        ResponseEntity<User> userResponseEntity = userController.editUser(id, userToEdit, admin);

        assertEquals(Objects.requireNonNull(userResponseEntity.getBody()).getEmail(),"another@email.com" );
    }

    @Test
    void editUserNonAdmin() {
        User userToEdit = initBasicUser();
        User nonAdmin = new User();
        nonAdmin.setAdmin(false);
        nonAdmin.setEmail("nonAdmin@fiuk.com");
        nonAdmin.setPassword("pw");
        userRepository.save(userToEdit);
        userRepository.save(nonAdmin);
        long id = userRepository.findUserByEmail(email).get().getId();
        userToEdit.setEmail("another@email.com");

        ResponseEntity<User> userResponseEntity = userController.editUser(id, userToEdit, nonAdmin);

        assertEquals(userResponseEntity.getStatusCode(), HttpStatus.UNAUTHORIZED);
    }

    @Test
    void deleteUser() {
        User userToDelete = initBasicUser();
        User admin = new User();
        admin.setAdmin(true);
        admin.setEmail("admin@fiuk.com");
        admin.setPassword("pw");
        userRepository.save(userToDelete);
        userRepository.save(admin);
        long id = userRepository.findUserByEmail(email).get().getId();

        ResponseEntity<Any> anyResponseEntity = userController.deleteUser(id, admin);

        assertFalse(userRepository.findUserByEmail(email).isPresent());
    }

    @Test
    void deleteUserNonAdmin() {
        User userToDelete = initBasicUser();
        User nonDdmin = new User();
        nonDdmin.setAdmin(false);
        nonDdmin.setEmail("nonAdmin@fiuk.com");
        nonDdmin.setPassword("pw");
        userRepository.save(userToDelete);
        userRepository.save(nonDdmin);
        long id = userRepository.findUserByEmail(email).get().getId();

        ResponseEntity<Any> anyResponseEntity = userController.deleteUser(id, nonDdmin);

        assertTrue(userRepository.findUserByEmail(email).isPresent());
    }


    private User initBasicUser() {
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setAdmin(false);
        return user;
    }

}
