package websocket.chat.dto.res;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import websocket.chat.domain.Room;

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

        public RoomList(Room room) {
            this.roomId = room.getRoomId();
            this.name = room.getName();
        }
    }
}
