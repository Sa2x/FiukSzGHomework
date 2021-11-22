package szgbizt.fiuk.backend.Models;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    private String name;

    private String caffFile;

    @ManyToOne
    private User uploadedBy;

    private String createdBy;

    private Date createdAt;

    @OneToMany
    private List<Comment> comments;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
