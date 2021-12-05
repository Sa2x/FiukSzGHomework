package szgbizt.fiuk.backend.DTOs;

import javax.persistence.Entity;


//Ilyen alakban jön a JSON a Frontendtől regisztrációnál, ebből kell csinálni a Profile-t
public class RegisterDTO {

    private String email;

    private String password;

    private String confirmedPassword;

    public String getConfirmedPassword() {
        return confirmedPassword;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setConfirmedPassword(String confirmedPassword) {
        this.confirmedPassword = confirmedPassword;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
