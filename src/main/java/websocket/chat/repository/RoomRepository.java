package websocket.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import websocket.chat.domain.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
