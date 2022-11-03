package websocket.chat.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userRoomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    private boolean creator;

    private Long chatKey;

    public static UserRoom createUserRoom(User user, Room room, boolean creator, Long chatKey) {
        UserRoom userRoom = new UserRoom();
        userRoom.user = user;
        userRoom.room = room;
        userRoom.creator = creator;
        userRoom.chatKey = chatKey;
        return userRoom;
    }
}
