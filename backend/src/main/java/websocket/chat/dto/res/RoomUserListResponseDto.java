package websocket.chat.dto.res;

import lombok.Getter;

import java.util.List;

@Getter
public class RoomUserListResponseDto {
    int count;
    Long creatorId;
    List<UserInfo> users;

    @Getter
    public static class UserInfo {
        Long userId;

        String username;

        public UserInfo(Long userId, String username) {
            this.userId = userId;
            this.username = username;
        }
    }

    private RoomUserListResponseDto(int count, Long creatorId, List<UserInfo> users) {
        this.count = count;
        this.creatorId = creatorId;
        this.users = users;
    }

    public static RoomUserListResponseDto of(int count, Long creatorId, List<UserInfo> users) {
        return new RoomUserListResponseDto(count, creatorId, users);
    }
}
