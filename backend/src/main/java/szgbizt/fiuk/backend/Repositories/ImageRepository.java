package szgbizt.fiuk.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import szgbizt.fiuk.backend.Models.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    void deleteById(Long id);

}
