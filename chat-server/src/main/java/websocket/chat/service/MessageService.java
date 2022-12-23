package websocket.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import websocket.chat.controller.ResultCode;
import websocket.chat.domain.Message;
import websocket.chat.domain.Room;
import websocket.chat.domain.Type;
import websocket.chat.domain.User;
import websocket.chat.dto.ChatMessage;
import websocket.chat.dto.res.SaveMessageResponse;
import websocket.chat.repository.MessageRepository;
import websocket.chat.repository.RoomRepository;
import websocket.chat.repository.UserRepository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    public SaveMessageResponse saveMessage(ChatMessage chatMessage) {
        SaveMessageResponse res = new SaveMessageResponse();

        Optional<User> userOptional = userRepository.findById(chatMessage.getUserId());
        if (userOptional.isEmpty()) {
            res.setCode(ResultCode.NotFoundUser);
            return res;
        }
        User user = userOptional.get();

        Optional<Room> roomOptional = roomRepository.findById(chatMessage.getRoomId());
        if (roomOptional.isEmpty()) {
            res.setCode(ResultCode.InvalidRoom);
            return res;
        }
        Room room = roomOptional.get();

        Message message = Message.createMessage(room, user, chatMessage.getContent(), Type.CHAT);
        messageRepository.save(message);

        room.updateRecentChat(LocalDateTime.now());

        res.setCode(ResultCode.Success);
        return res;
    }
}
