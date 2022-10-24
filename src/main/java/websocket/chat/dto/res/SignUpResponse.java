package websocket.chat.dto.res;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import websocket.chat.dto.BaseResponse;

@Data
public class SignUpResponse extends BaseResponse {
    SignUpResponseDto data;
}