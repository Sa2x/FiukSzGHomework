package szgbizt.fiuk.backend.Models;

import jdk.jfr.Enabled;

import javax.persistence.*;
import java.awt.image.BufferedImage;
import java.io.Serializable;
import java.util.List;

@Entity
public class Ciff  {

    @Id
    @GeneratedValue
    private Long id;

    private byte[] img;
    private String caption;

    @ElementCollection
    private List<String> tags;

    public Ciff() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ciff(byte[] _img, String _caption, List<String> _tags){
        img = _img;
        caption = _caption;
        tags = _tags;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public byte[] getImg() {
        return img;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }
}
