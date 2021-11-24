package szgbizt.fiuk.backend.Models;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Image {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String caffFile;

    @ManyToOne
    private User uploadedBy;

    private String createdBy;

    private Date createdAt;

    @OneToMany
    private List<Comment> comments;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
