package websocket.chat.dto.req;

import lombok.Data;

@Data
public class SignUpRequestDto {
    public String email;
    public String username;
    public String password;
}
