package websocket.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import websocket.chat.dto.ChatMessage;
import websocket.chat.service.MessageService;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations sendingOperations;
    private final MessageService messageService;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        sendingOperations.convertAndSend("/sub/room/" + message.getRoomId(), message);
        messageService.saveMessage(message);
    }

    @MessageMapping("/chat/room")
    public void enterRoom(ChatMessage message) {
        sendingOperations.convertAndSend("/sub/enter/" + message.getRoomId(), message);
    }
}
