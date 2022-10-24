package websocket.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import websocket.chat.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
}
