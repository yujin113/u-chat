package websocket.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import websocket.chat.domain.UserRoom;
import websocket.chat.domain.UserRoomId;

public interface UserRoomRepository extends JpaRepository<UserRoom, UserRoomId> {
}
