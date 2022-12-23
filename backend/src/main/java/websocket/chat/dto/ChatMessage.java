package websocket.chat.dto;

import lombok.Data;

@Data
public class ChatMessage {
    private Long roomId;
    private Long userId;
    private String sender;
    private String content;
    private String type;
}
