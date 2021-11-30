package szgbizt.fiuk.backend.DTOs;

import org.springframework.web.multipart.MultipartFile;

public class CaffDTO {

   private MultipartFile file;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
