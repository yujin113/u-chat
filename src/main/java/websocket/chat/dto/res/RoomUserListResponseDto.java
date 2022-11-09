package websocket.chat.dto.res;

import lombok.Getter;

import java.util.List;

@Getter
public class RoomUserListResponseDto {
    int count;
    Long creatorId;
    List<String> users;

    private RoomUserListResponseDto(int count, Long creatorId, List<String> users) {
        this.count = count;
        this.creatorId = creatorId;
        this.users = users;
    }

    public static RoomUserListResponseDto of(int count, Long creatorId, List<String> users) {
        return new RoomUserListResponseDto(count, creatorId, users);
    }
}
