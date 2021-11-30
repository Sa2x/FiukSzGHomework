package szgbizt.fiuk.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import szgbizt.fiuk.backend.Models.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findUserByEmail(String email);
    void deleteById(Long id);
    boolean existsByEmail(String email);
    boolean existsById(Integer id);
}
