package websocket.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import websocket.chat.controller.ResultCode;
import websocket.chat.domain.Room;
import websocket.chat.domain.User;
import websocket.chat.domain.UserRoom;
import websocket.chat.dto.req.SaveRoomRequestDto;
import websocket.chat.dto.res.RoomListResponse;
import websocket.chat.dto.res.RoomListResponseDto;
import websocket.chat.dto.res.SaveRoomResponse;
import websocket.chat.repository.RoomRepository;
import websocket.chat.repository.UserRepository;
import websocket.chat.repository.UserRoomRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static websocket.chat.dto.res.RoomListResponseDto.*;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRoomRepository userRoomRepository;
    private final UserRepository userRepository;

    public SaveRoomResponse saveRoom(SaveRoomRequestDto req, Long userId) {
        SaveRoomResponse res = new SaveRoomResponse();
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            res.setCode(ResultCode.NotFoundUser);
            return res;
        }
        User user = userOptional.get();
        Room room = Room.createRoom(req.getName());
        roomRepository.save(room);

        UserRoom userRoom = UserRoom.createUserRoom(user, room, true);
        userRoomRepository.save(userRoom);

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
}
