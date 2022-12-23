package websocket.chat.dto.res;

import lombok.Data;
import websocket.chat.dto.BaseResponse;


@Data
public class SignUpResponse extends BaseResponse {
    LoginResponseDto data;
}