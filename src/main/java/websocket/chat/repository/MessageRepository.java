package websocket.chat.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import websocket.chat.domain.Message;
import websocket.chat.domain.Room;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("select m.messageId from Message m where m.room = ?1 order by m.createdAt desc")
    List<Long> findChatKey(Room room, Pageable pageable);

    @Query("select m from Message m where m.room=?1 and m.messageId > ?2")
    List<Message> findAllByRoom(Room room, Long chatKey);
}
