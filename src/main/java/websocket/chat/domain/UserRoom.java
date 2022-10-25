package websocket.chat.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserRoom {
    @EmbeddedId
    private UserRoomId userRoomId;

    private boolean creator;

    public static UserRoom createUserRoom(User user, Room room, boolean creator) {
        UserRoom userRoom = new UserRoom();
        userRoom.userRoomId = new UserRoomId(user.getUserId(), room.getRoomId());
        userRoom.creator = creator;
        return userRoom;
    }
}
