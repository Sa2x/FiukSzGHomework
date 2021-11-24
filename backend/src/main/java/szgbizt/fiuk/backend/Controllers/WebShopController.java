package szgbizt.fiuk.backend.Controllers;

import com.sun.xml.bind.v2.schemagen.xmlschema.Any;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import szgbizt.fiuk.backend.Models.Comment;
import szgbizt.fiuk.backend.Models.Image;
import szgbizt.fiuk.backend.Repositories.ImageRepository;

import java.util.List;
import java.util.Optional;

@RestController(value = "/api/images/")
public class WebShopController {

    @Autowired
    ImageRepository imageRepository;

    @GetMapping(value = "/",produces = "application/json")
    public ResponseEntity<List<Image>> getAllImages(){
        return ResponseEntity.ok(imageRepository.findAll());
    }

    @GetMapping(value = "/{id}",produces = "application/json")
    public ResponseEntity<Image> getImage(@PathVariable long id){
        return ResponseEntity.ok(imageRepository.findById(id).get());
    }

    @PostMapping(value = "/new",consumes = "application/json")
    public ResponseEntity<Any> createImage(@RequestBody Image image){
        //TODO: Megbeszélni, milyen lesz a küldött JSON formátuma, kell-e DTO
        //Ha máshogy érkezik az adat akkor a transzformáció megoldása!!
        imageRepository.save(image);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value="/del/{id}")
    public ResponseEntity<Any> deleteImage(@PathVariable long id){
        imageRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/edit/{id}",consumes = "application/json")
    public ResponseEntity<Any> editImage(@PathVariable long id,@RequestBody Image image){
        //TODO: Megoldani, hogy itt a JSON nem minden mezője lesz kitöltve.
        assert image != null;
        image.setId(id);
        imageRepository.save(image);
        return ResponseEntity.ok().build();
    }

    //------------- COMMENTS ------------

    @GetMapping(value = "/{imageId}/comments",produces = "application/json")
    public ResponseEntity<List<Comment>> getComments(@PathVariable long imageId){
        //TODO
        return null;
    }

    @PostMapping(value = "/{imageId}/comments/new",consumes = "application/json")
    public ResponseEntity<Any> createComment(@PathVariable long imageId,@RequestBody Comment comment){
        //TODO: Befejezni
        Optional<Image> image = imageRepository.findById(imageId);
        if(image.isPresent()){
            image.get().getComments().add(comment);
        }
        return null;
    }

    @DeleteMapping(value = "/{imageId}/comments/del/{commentId}")
    public ResponseEntity<Any> deleteComment(@PathVariable long imageId, @PathVariable long commentId){
        //TODO
        return null;
    }






}
