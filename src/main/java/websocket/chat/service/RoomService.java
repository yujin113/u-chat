package websocket.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import websocket.chat.controller.ResultCode;
import websocket.chat.domain.Room;
import websocket.chat.domain.User;
import websocket.chat.domain.UserRoom;
import websocket.chat.dto.req.SaveRoomRequestDto;
import websocket.chat.dto.res.*;
import websocket.chat.dto.res.MessageListResponseDto.MessageInfo;
import websocket.chat.repository.MessageRepository;
import websocket.chat.repository.RoomRepository;
import websocket.chat.repository.UserRepository;
import websocket.chat.repository.UserRoomRepository;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import static websocket.chat.dto.res.RoomListResponseDto.*;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRoomRepository userRoomRepository;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    public SaveRoomResponse makeRoom(SaveRoomRequestDto req, Long userId) {
        SaveRoomResponse res = new SaveRoomResponse();
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            res.setCode(ResultCode.NotFoundUser);
            return res;
        }
        User user = userOptional.get();
        Room room = Room.createRoom(req.getName());
        roomRepository.save(room);

        UserRoom userRoom = UserRoom.createUserRoom(user, room, true, 0L);
        userRoomRepository.save(userRoom);

        res.setRoomId(userRoom.getRoom().getRoomId());
        res.setCode(ResultCode.Success);
        return res;
    }

    public RoomListResponse getRoomList() {
        RoomListResponse res = new RoomListResponse();

        List<RoomList> rooms = roomRepository.findAll().stream()
                .map(RoomList::new)
                .collect(Collectors.toList());
        res.setData(RoomListResponseDto.of(rooms));

        res.setCode(ResultCode.Success);
        return res;
    }

    public RoomUserListResponse getRoomInfo(Long roomId) {
        RoomUserListResponse res = new RoomUserListResponse();

        Optional<Room> roomOptional = roomRepository.findById(roomId);
        if (roomOptional.isEmpty()) {
            res.setCode(ResultCode.InvalidRoom);
            return res;
        }
        Room room = roomOptional.get();
        List<String> userList = userRoomRepository.getListRoomUser(room);

        res.setData(RoomUserListResponseDto.of(userList.size(), userList));
        res.setCode(ResultCode.Success);
        return res;
    }

    public EnterRoomResponse enterRoom(Long userId, Long roomId) {
        EnterRoomResponse res = new EnterRoomResponse();

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            res.setCode(ResultCode.NotFoundUser);
            return res;
        }
        User user = userOptional.get();

        Optional<Room> roomOptional = roomRepository.findById(roomId);
        if (roomOptional.isEmpty()) {
            res.setCode(ResultCode.InvalidRoom);
            return res;
        }
        Room room = roomOptional.get();

        int count = userRoomRepository.countByUserAndRoom(user, room);
        if (count != 0) {
            res.setCode(ResultCode.AlreadyEnter);
            return res;
        }

        List<Long> chatKeyList = messageRepository.findChatKey(room, PageRequest.of(0, 1));
        Long chatKey = 0L;
        if (chatKeyList.size() != 0) {
            chatKey = chatKeyList.get(0);
        }
        System.out.println(chatKey);
        UserRoom userRoom = UserRoom.createUserRoom(user, room, false, chatKey);
        userRoomRepository.save(userRoom);

        res.setCode(ResultCode.Success);
        return res;
    }

    public MessageListResponse getChats(Long roomId, Long userId) {
        MessageListResponse res = new MessageListResponse();

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            res.setCode(ResultCode.NotFoundUser);
            return res;
        }
        User user = userOptional.get();

        Optional<Room> roomOptional = roomRepository.findById(roomId);
        if (roomOptional.isEmpty()) {
            res.setCode(ResultCode.InvalidRoom);
            return res;
        }
        Room room = roomOptional.get();

        Long chatKey = userRoomRepository.getUserRoomByUserAndRoom(user, room).getChatKey();

        List<MessageInfo> messages = messageRepository.findAllByRoom(room, chatKey).stream().map(message -> {
            return new MessageInfo(message.getMessageId(), message.getUser().getUsername(), message.getUser().getUserId().equals(userId), message.getContent(), message.getCreatedAt());
        }).collect(Collectors.toList());

        res.setData(MessageListResponseDto.of(messages));
        res.setCode(ResultCode.Success);
        return res;
    }

    public LeaveRoomResponse leaveRoom(Long roomId, Long userId) {
        LeaveRoomResponse res = new LeaveRoomResponse();

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            res.setCode(ResultCode.NotFoundUser);
            return res;
        }
        User user = userOptional.get();

        Optional<Room> roomOptional = roomRepository.findById(roomId);
        if (roomOptional.isEmpty()) {
            res.setCode(ResultCode.InvalidRoom);
            return res;
        }
        Room room = roomOptional.get();

        UserRoom userRoom = userRoomRepository.getUserRoomByUserAndRoom(user, room);
        if (userRoom.isCreator()) {
            roomRepository.delete(room);
        }
        userRoomRepository.delete(userRoom);

        res.setCode(ResultCode.Success);
        return res;
    }

    public GetMyRoomResponse getMyRoom(Long userId) {
        GetMyRoomResponse res = new GetMyRoomResponse();

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            res.setCode(ResultCode.NotFoundUser);
            return res;
        }
        User user = userOptional.get();

        List<RoomList> roomList = userRoomRepository.getMyRoom(user).stream().map(RoomList::new).collect(Collectors.toList());

        res.setData(GetMyRoomResponseDto.of(roomList));

        res.setCode(ResultCode.Success);
        return res;
    }
}
