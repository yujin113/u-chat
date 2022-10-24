package websocket.chat.dto.res;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignUpResponseDto {
    String username;
    String createdAt;
    String token;
}
