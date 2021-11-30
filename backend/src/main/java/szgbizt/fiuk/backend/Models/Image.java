package szgbizt.fiuk.backend.Models;

import javax.persistence.*;
import java.io.ByteArrayInputStream;
import java.util.Date;
import java.util.List;

@Entity
public class Image {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @OneToMany
    private List<Ciff> ciffList;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(User uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<Ciff> getCiffList() {
        return ciffList;
    }

    public void setCiffList(List<Ciff> ciffList) {
        this.ciffList = ciffList;
    }
}
