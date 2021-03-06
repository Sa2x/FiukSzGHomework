package szgbizt.fiuk.backend.Models;

import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue
    private long id;

    private String email;

    //Use passwordEncoder!
    private String password;

    private boolean admin;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
