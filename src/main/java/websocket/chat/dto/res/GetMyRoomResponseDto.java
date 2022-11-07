package websocket.chat.dto.res;

import lombok.Getter;

import java.util.List;

import static websocket.chat.dto.res.RoomListResponseDto.*;

@Getter
public class GetMyRoomResponseDto {
    List<RoomList> rooms;

    private GetMyRoomResponseDto(List<RoomList> rooms) {
        this.rooms = rooms;
    }

    public static GetMyRoomResponseDto of(List<RoomList> rooms) {
        return new GetMyRoomResponseDto(rooms);
    }
}
