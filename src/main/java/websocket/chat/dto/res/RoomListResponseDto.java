package websocket.chat.dto.res;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import websocket.chat.domain.Room;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class RoomListResponseDto {
    List<RoomList> rooms;

    private RoomListResponseDto(List<RoomList> rooms) {
        this.rooms = rooms;
    }

    public static RoomListResponseDto of(List<RoomList> rooms) {
        return new RoomListResponseDto(rooms);
    }

    @Getter
    public static class RoomList {
        Long roomId;
        String name;

        String recentChat;

        @JsonFormat(pattern = "MM/dd HH:mm", timezone = "Asia/Seoul")
        LocalDateTime recentDate;

        public RoomList(Room room, String recentChat) {
            this.roomId = room.getRoomId();
            this.name = room.getName();
            this.recentChat = recentChat;
            this.recentDate = room.getRecentChat();
        }
    }
}
