package szgbizt.fiuk.backend.Models;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Comment {
    @Id
    @Column(name = "id", nullable = false)
    private long id;

    private String comment;

    @ManyToOne
    private User createdBy;

    private Date createdAt;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
