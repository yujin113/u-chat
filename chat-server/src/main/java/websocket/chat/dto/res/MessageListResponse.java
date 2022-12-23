package websocket.chat.dto.res;

import lombok.Data;
import websocket.chat.dto.BaseResponse;

@Data
public class MessageListResponse extends BaseResponse {
    MessageListResponseDto data;
}
