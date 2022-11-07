package websocket.chat.dto.res;

import lombok.Getter;

import java.util.List;

@Getter
public class RoomUserListResponseDto {
    int count;
    List<String> users;

    private RoomUserListResponseDto(int count, List<String> users) {
        this.count = count;
        this.users = users;
    }

    public static RoomUserListResponseDto of(int count, List<String> users) {
        return new RoomUserListResponseDto(count, users);
    }
}
