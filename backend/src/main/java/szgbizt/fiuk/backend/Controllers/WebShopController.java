package szgbizt.fiuk.backend.Controllers;

import com.sun.xml.bind.v2.schemagen.xmlschema.Any;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zeroturnaround.exec.ProcessExecutor;
import szgbizt.fiuk.backend.Auth.Auth;
import szgbizt.fiuk.backend.DTOs.CaffDTO;
import szgbizt.fiuk.backend.Models.Ciff;
import szgbizt.fiuk.backend.Models.Comment;
import szgbizt.fiuk.backend.Models.Image;
import szgbizt.fiuk.backend.Models.User;
import szgbizt.fiuk.backend.Repositories.ImageRepository;
import szgbizt.fiuk.backend.Repositories.UserRepository;

import javax.imageio.ImageIO;
import javax.transaction.Transactional;
import java.awt.image.BufferedImage;
import java.io.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeoutException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/images")
public class WebShopController {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    UserRepository userRepository;

    @Transactional
    @GetMapping(value = "/")
    public ResponseEntity<List<Image>> getAllImages(@Auth User user) {
        List<Image> images = imageRepository.findAll();
        images.forEach(image ->
                image.setPreviewUrl("http://localhost:8080/api/images/" + Long.toString(image.getId(), 10) + "/preview"));
        return ResponseEntity.ok(images);
    }

    @Transactional
    @GetMapping(value = "/{id}")
    public ResponseEntity<Image> getImage(@PathVariable long id, @Auth User user) {
        Image image = imageRepository.findById(id).get();
        image.setPreviewUrl("http://localhost:8080/api/images/" + Long.toString(image.getId(), 10) + "/preview");
        return ResponseEntity.ok(image);
    }

    @GetMapping(value = "/{id}/preview")
    public ResponseEntity<byte[]> getImagePreview(@PathVariable long id) {
        try {
            Optional<Image> image = imageRepository.findById(id);
            if (image.isPresent()) {
                byte[] imageBytes = image.get().getCiffList().get(0).getImg();
                String header = "attachment; filename=" + String.valueOf(System.currentTimeMillis()) + ".jpg";
                return ResponseEntity.ok().contentType(MediaType.parseMediaType(MediaType.IMAGE_JPEG_VALUE))
                        .header(HttpHeaders.CONTENT_DISPOSITION, header) //TODO
                        .body(imageBytes);
            }
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity("Something went wrong in the preview!", HttpStatus.BAD_REQUEST);
    }

    @Transactional
    @PostMapping(value = "/new", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Image> createImage(@Auth User user, @ModelAttribute CaffDTO caff) {
        String output = "";
        try {
            File file = new File("file.caff");
            FileOutputStream fileWriter = new FileOutputStream(file);
            fileWriter.write(caff.getFile().getBytes());
            output = new ProcessExecutor().command("./caffparser", "file.caff").readOutput(true).execute().outputString();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        /*
        CAFF OUTPUT:
            Creator: Creator_name
            Creation year: creation_year
            Creation month: creation_month
            Creation day: creation_day
            Creaton hour: creation_hour
            Creation minute: creation_minute
            There are num_of_animations in this caff
            Duration: duration
            Width: width
            Height: height
            Caption: caption
            Tags: list_of_tags
            pixels

         */
        Scanner scanner = new Scanner(output);
        String creatorName = scanner.nextLine().split(":")[1];
        int creationYear = Integer.parseInt(scanner.nextLine().split(":")[1]);
        int creationMonth = Integer.parseInt(scanner.nextLine().split(":")[1]);
        int creationDay = Integer.parseInt(scanner.nextLine().split(":")[1]);
        int creationHour = Integer.parseInt(scanner.nextLine().split(":")[1]);
        int creationMinute = Integer.parseInt(scanner.nextLine().split(":")[1]);
        int numberOfAnimations = Integer.parseInt(scanner.nextLine().split(":")[1]);
        List<Ciff> ciffs = new ArrayList<>();
        for (int i = 0; i < numberOfAnimations; i++) {
            ciffs.add(ciffParser(scanner));
        }
        scanner.close();

        Optional<User> foundUser = userRepository.findUserByEmail(user.getEmail());

        Image image = new Image();
        image.setName(caff.getName());
        image.setCiffList(ciffs);
        image.setCreatedBy(creatorName);
        if (foundUser.isPresent()) {
            image.setUploadedBy(foundUser.get()); // EZ PROBL??M??S MERT SZAR
        }
        image.setComments(null);
        LocalDateTime localDate = LocalDateTime.of(creationYear, creationMonth, creationDay, creationHour, creationMinute);
        image.setCreatedAt(Timestamp.valueOf(localDate));

        //imageRepository.save(image);
        return ResponseEntity.ok(imageRepository.save(image));
    }

    private Ciff ciffParser(Scanner scanner) {
        int duration = Integer.parseInt(scanner.nextLine().split(":")[1].trim());
        //WIDTH ??S HEIGHT DOLGOT N??ZD ??T M??G
        int width = Integer.parseInt(scanner.nextLine().split(":")[1].trim());
        int height = Integer.parseInt(scanner.nextLine().split(":")[1].trim());

        BufferedImage img = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        String caption = scanner.nextLine().split(":")[1];
        List<String> tags = List.of(scanner.nextLine().split(":")[1].split(" "));
        //TODO: Tageket tov??bb bontani, mert most egyben vannak elt??rolva, hi??nyzik m??g egy split h??v??s, ahol a regex egy whitespace
        for (int rowCounter = 0; rowCounter < height; rowCounter++) {
            String row = scanner.nextLine();
            String[] pixels = row.split(";");
            for (int columnCounter = 0; columnCounter < width; columnCounter++) {
                String[] pixel = pixels[columnCounter].split(",");
                int r = Integer.parseInt(pixel[0].replace("(", "")); // trim the ( from the beggining
                int g = Integer.parseInt(pixel[1].trim());
                int b = Integer.parseInt(pixel[2].replace(")", ""));
                int p = (r << 16) | (g << 8) | b;
                img.setRGB(columnCounter, rowCounter, p);
            }
        }
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        boolean foundWriter = false;
        try {
            foundWriter = ImageIO.write(img, "jpg", baos);
        } catch (IOException e) {
            e.printStackTrace();
        }
        assert foundWriter;
        byte[] bytes = baos.toByteArray();


        return new Ciff(bytes, caption, tags);

    }


    @DeleteMapping(value = "/del/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable long id, @Auth User user) {
        if (!user.isAdmin()) {
            return new ResponseEntity("Only an admin can delete images!", HttpStatus.BAD_REQUEST);
        }
        imageRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/edit/{id}", consumes = "application/json")
    public ResponseEntity<Image> editImage(@PathVariable long id, @RequestBody Image image, @Auth User user) {
        if (!user.isAdmin()) {
            return new ResponseEntity("Only an admin can edit images!", HttpStatus.BAD_REQUEST);
        }
        image.setId(id);
        Image foundImage = imageRepository.findById(id).orElse(null);
        copyNonNullProperties(image, foundImage);
        imageRepository.save(foundImage);
        return ResponseEntity.ok(imageRepository.findById(id).get());
    }

    public static void copyNonNullProperties(Object src, Object target) {
        BeanUtils.copyProperties(src, target, getNullPropertyNames(src));
    }

    public static String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<String>();
        for (java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    //------------- COMMENTS ------------

    @GetMapping(value = "/{imageId}/comments", produces = "application/json")
    public ResponseEntity<List<Comment>> getComments(@PathVariable long imageId, @Auth User user) {
        //TODO
        Optional<Image> image = imageRepository.findById(imageId);
        if (image.isPresent()) {
            return new ResponseEntity(image.get().getComments(), HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping(value = "/{imageId}/comments/new", consumes = "application/json")
    public ResponseEntity<String> createComment(@PathVariable long imageId, @RequestBody String comment, @Auth User user) {
        //TODO: Befejezni
        Optional<Image> image = imageRepository.findById(imageId);
        Optional<User> foundUser = userRepository.findUserByEmail(user.getEmail());
        if (image.isPresent()) {
            Comment realComment = new Comment();
            realComment.setComment(comment);
            if (foundUser.isPresent()) {
                realComment.setCreatedBy(foundUser.get());
            }
            realComment.setCreatedAt(Calendar.getInstance().getTime());
            image.get().getComments().add(realComment);
            imageRepository.save(image.get());
            return ResponseEntity.ok("Successfully uploaded comment");
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping(value = "/{imageId}/comments/del/{commentId}")
    public ResponseEntity<Any> deleteComment(@PathVariable long imageId, @PathVariable long commentId, @Auth User user) {
        if (!user.isAdmin()) {
            return new ResponseEntity("You are not an admin!", HttpStatus.BAD_REQUEST);
        }
        Optional<Image> image = imageRepository.findById(imageId);
        if (image.isPresent()) {
            image.get().getComments().removeIf(comment -> comment.getId() == commentId);
            imageRepository.save(image.get());
        }
        return ResponseEntity.ok().build();
    }


}