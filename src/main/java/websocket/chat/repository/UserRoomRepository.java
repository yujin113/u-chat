package websocket.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import websocket.chat.domain.Room;
import websocket.chat.domain.User;
import websocket.chat.domain.UserRoom;

import java.util.List;

public interface UserRoomRepository extends JpaRepository<UserRoom, Long> {

    int countByUserAndRoom(User user, Room room);

    @Query("select ur.user from UserRoom ur where ur.room=?1")
    List<User> getListRoomUser(Room room);

    @Query("select ur.user.userId from UserRoom ur where ur.room=?1 and ur.creator=true")
    Long findCreatorId(Room room);

    UserRoom getUserRoomByUserAndRoom(User user, Room room);

    @Query("select ur.room.roomId from UserRoom ur where ur.user=?1")
    List<Long> getMyRoomId(User user);

    @Query("select ur.room from UserRoom ur where ur.user=?1 order by ur.room.recentChat desc")
    List<Room> getMyRoom(User user);
}
