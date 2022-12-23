package websocket.chat.dto.res;

import lombok.Data;
import lombok.Getter;
import websocket.chat.dto.BaseResponse;

@Data
public class LoginResponse extends BaseResponse {
    LoginResponseDto data;
}
