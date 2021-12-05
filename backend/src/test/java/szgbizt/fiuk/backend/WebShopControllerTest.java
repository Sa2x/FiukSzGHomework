package szgbizt.fiuk.backend;

import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import szgbizt.fiuk.backend.Controllers.WebShopController;
import szgbizt.fiuk.backend.Models.Image;
import szgbizt.fiuk.backend.Models.User;
import szgbizt.fiuk.backend.Repositories.ImageRepository;
import szgbizt.fiuk.backend.Repositories.UserRepository;

import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class WebShopControllerTest {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    WebShopController webShopController;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        imageRepository.deleteAll();
    }

    @Test
    void getAllImages() {
        User user = createDefaultUser();
        User adminUser = createAdminUser();
        createDefaultImage(user, "image1");
        createDefaultImage(user, "image2");

        ResponseEntity<List<Image>> allImages = webShopController.getAllImages(adminUser);

        assertEquals(Objects.requireNonNull(allImages.getBody()).size(), 2);
    }


    @Test
    void getImage() {
        User adminUser = createAdminUser();
        User defaultUser = createDefaultUser();
        Image image = createDefaultImage(defaultUser, "image");
        Long id = imageRepository.findAll().get(0).getId();

        ResponseEntity<Image> imageResponseEntity = webShopController.getImage(id, adminUser);

        assertEquals(imageResponseEntity.getBody().getName(), "image");
    }

    @Test
    void getImagePreview() {
        // TODO
    }

    @Test
    void getImagePreviewNoImage() {
        User adminUser = createAdminUser();

        ResponseEntity<byte[]> imagePreview = webShopController.getImagePreview(1, adminUser);

        assertEquals(imagePreview.getStatusCode(), HttpStatus.BAD_REQUEST);
    }

    @Test
    void createImage() {
        // TODO: finish the body, and create tests for the two catchable exceptions
    }

    @Test
    void deleteImage() {
        User adminUser = createAdminUser();
        User defaultUser = createDefaultUser();
        createDefaultImage(defaultUser, "image");
        Long id = imageRepository.findAll().get(0).getId();

        webShopController.deleteImage(id, adminUser);

        assertFalse(imageRepository.findById(id).isPresent());
    }

    @Test
    void deleteImageNotAdmin() {
        User defaultUser = createDefaultUser();
        createDefaultImage(defaultUser, "image");
        Long id = imageRepository.findAll().get(0).getId();

        ResponseEntity<String> stringResponseEntity = webShopController.deleteImage(id, defaultUser);

        assertEquals(stringResponseEntity.getBody(), "Only an admin can delete images!");
    }

    @Test
    void editImage() {
        User defaultUser = createDefaultUser();
        createDefaultImage(defaultUser, "image");
        User adminUser = createAdminUser();
        Image editedImage = new Image();
        editedImage.setName("edited image");
        editedImage.setUploadedBy(defaultUser);
        Long id = imageRepository.findAll().get(0).getId();

        ResponseEntity<Image> imageResponseEntity = webShopController.editImage(id, editedImage, adminUser);

        assertEquals(Objects.requireNonNull(imageResponseEntity.getBody()).getName(), "edited image");
    }

    @Test
    void editImageNotAdmin() {
        User defaultUser = createDefaultUser();
        createDefaultImage(defaultUser, "image");
        Image editedImage = new Image();
        editedImage.setName("edited image");
        editedImage.setUploadedBy(defaultUser);
        Long id = imageRepository.findAll().get(0).getId();

        ResponseEntity<Image> imageResponseEntity = webShopController.editImage(id, editedImage, defaultUser);

        assertEquals(imageResponseEntity.getStatusCode(), HttpStatus.BAD_REQUEST);
    }

    @Test
    void getComments() {

    }





    private Image createDefaultImage(User user, String imageName) {
        Image image = new Image();
        image.setName(imageName);
        image.setUploadedBy(user);
        imageRepository.save(image);
        return image;
    }

    private User createDefaultUser() {
        User user = new User();
        user.setAdmin(false);
        user.setEmail("test@email.com");
        user.setPassword("password");
        userRepository.save(user);
        return user;
    }

    private User createAdminUser() {
        User user = new User();
        user.setAdmin(true);
        user.setEmail("admin@email.com");
        user.setPassword("password");
        userRepository.save(user);
        return user;
    }

}
