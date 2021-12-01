package szgbizt.fiuk.backend.Auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(AuthException.class)
    ResponseEntity<String> authenticationExceptionHandler(Exception e){
        return new ResponseEntity(e.getMessage(), HttpStatus.UNAUTHORIZED);
    }

}
