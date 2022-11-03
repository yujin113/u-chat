package websocket.chat.dto.req;

import lombok.Data;

@Data
public class LoginRequestDto {
    public String email;
    public String password;
}
