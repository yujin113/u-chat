package websocket.chat.dto.res;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import websocket.chat.domain.Type;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class MessageListResponseDto {
    List<MessageInfo> messages;

    private MessageListResponseDto(List<MessageInfo> messages) {
        this.messages = messages;
    }

    public static MessageListResponseDto of(List<MessageInfo> messages) {
        return new MessageListResponseDto(messages);
    }

    @Getter
    public static class MessageInfo {
        Long messageId;
        String username;
        boolean sender;
        String content;

        @JsonFormat(pattern = "MM/dd HH:mm", timezone = "Asia/Seoul")
        LocalDateTime createdAt;

        Type type;

        public MessageInfo(Long messageId, String username, boolean sender, String content, LocalDateTime createdAt, Type type) {
            this.messageId = messageId;
            this.username = username;
            this.sender = sender;
            this.content = content;
            this.createdAt = createdAt;
            this.type = type;
        }
    }
}
