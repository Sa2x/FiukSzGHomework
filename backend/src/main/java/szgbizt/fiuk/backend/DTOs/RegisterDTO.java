package szgbizt.fiuk.backend.DTOs;

import javax.persistence.Entity;


//Ilyen alakban jön a JSON a Frontendtől regisztrációnál, ebből kell csinálni a Profile-t
public class RegisterDTO {

    String email;

    String password;

    String confirmedPassword;

    public String getConfirmedPassword() {
        return confirmedPassword;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
