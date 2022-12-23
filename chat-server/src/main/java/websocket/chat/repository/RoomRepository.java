package websocket.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import websocket.chat.domain.Room;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("select r from Room r order by r.recentChat desc")
    List<Room> findAllOrderByRecentChat();
}
