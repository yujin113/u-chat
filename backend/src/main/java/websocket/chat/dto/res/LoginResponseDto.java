package websocket.chat.dto.res;

import lombok.Getter;

import java.util.List;

@Getter
public class LoginResponseDto {
    Long userId;
    String userName;
    List<Long> rooms;

    private LoginResponseDto(Long userId, String userName, List<Long> rooms) {
        this.userId = userId;
        this.userName = userName;
        this.rooms = rooms;
    }

    private LoginResponseDto(Long userId, String userName) {
        this.userId = userId;
        this.userName = userName;
    }

    public static LoginResponseDto of(Long userId, String userName, List<Long> rooms) {
        return new LoginResponseDto(userId, userName, rooms);
    }

    public static LoginResponseDto of(Long userId, String userName) {
        return new LoginResponseDto(userId, userName);
    }
}
