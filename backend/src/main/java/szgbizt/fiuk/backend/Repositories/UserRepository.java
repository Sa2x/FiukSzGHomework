package szgbizt.fiuk.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import szgbizt.fiuk.backend.Models.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
}
