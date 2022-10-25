package websocket.chat.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserRoomId implements Serializable {
    private Long userId;

    private Long roomId;

    public UserRoomId(Long userId, Long roomId) {
        this.userId = userId;
        this.roomId = roomId;
    }
}
