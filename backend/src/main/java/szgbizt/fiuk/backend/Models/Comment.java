package szgbizt.fiuk.backend.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.Date;

@Entity
public class Comment {
    @Id
    @Column(name = "id", nullable = false)
    private long id;

    private String comment;

    @OneToOne
    private Profile createdBy;

    private Date createdAt;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
