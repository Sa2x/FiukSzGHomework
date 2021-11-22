package szgbizt.fiuk.backend.Controllers;

import com.sun.xml.bind.v2.schemagen.xmlschema.Any;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import szgbizt.fiuk.backend.Models.Comment;
import szgbizt.fiuk.backend.Models.Image;

import java.util.List;

@RestController(value = "/api/images/")
public class WebShopController {

    @GetMapping(value = "/",produces = "application/json")
    public ResponseEntity<List<Image>> getAllImages(){
        //TODO
        return null;
    }

    @GetMapping(value = "/{id}",produces = "application/json")
    public ResponseEntity<List<Image>> getImage(@PathVariable long id){
        //TODO
        return null;
    }

    @PostMapping(value = "/new",consumes = "application/json")
    public ResponseEntity<Any> createImage(@RequestBody Image image){
        //TODO: Megbeszélni, milyen lesz a küldött JSON formátuma, kell-e DTO
        return null;
    }

    @DeleteMapping(value="/del/{id}")
    public ResponseEntity<Any> deleteImage(@PathVariable long id){
        //TODO
        return null;
    }

    @PutMapping(value = "/edit/{id}",consumes = "application/json")
    public ResponseEntity<Any> editImage(@PathVariable long id){
        //TODO: Megoldani, hogy itt a JSON nem minden mezője lesz kitöltve.
        return null;
    }

    //------------- COMMENTS ------------

    @GetMapping(value = "/{imageId}/comments",produces = "application/json")
    public ResponseEntity<List<Comment>> getComments(@PathVariable long imageId){
        //TODO
        return null;
    }

    @PostMapping(value = "/{imageId}/comments/new",consumes = "application/json")
    public ResponseEntity<Any> createComment(@PathVariable long imageId,@RequestBody Comment comment){
        //TODO
        return null;
    }

    @DeleteMapping(value = "/{imageId}/comments/del/{commentId}")
    public ResponseEntity<Any> deleteComment(@PathVariable long imageId, @PathVariable long commentId){
        //TODO
        return null;
    }






}
