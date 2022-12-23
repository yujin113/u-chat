package websocket.chat.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Room {

    @Id
    @Column(name = "room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private String name;

    @CreatedDate
    private LocalDateTime createdAt;

    @CreatedDate
    private LocalDateTime recentChat;

    public static Room createRoom(String name) {
        Room room = new Room();
        room.name = name;
        return room;
    }

    public void updateRecentChat(LocalDateTime recentChat) {
        this.recentChat = recentChat;
    }
}
