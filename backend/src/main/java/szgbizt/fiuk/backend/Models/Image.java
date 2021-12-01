package szgbizt.fiuk.backend.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import java.io.ByteArrayInputStream;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Entity
//@JsonIgnoreProperties(value = {"ciffList"})
public class Image {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @OneToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    @Cascade(value = org.hibernate.annotations.CascadeType.ALL)
    private List<Ciff> ciffList;

    @ManyToOne
    @Cascade(value= org.hibernate.annotations.CascadeType.MERGE)
    private User uploadedBy;

    private String createdBy;

    private Date createdAt;

    @OneToMany
    @Cascade(value = org.hibernate.annotations.CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Comment> comments = Collections.emptyList();

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
