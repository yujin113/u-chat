package websocket.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import websocket.chat.dto.req.SaveRoomRequestDto;
import websocket.chat.dto.res.*;
import websocket.chat.service.RoomService;

@RestController
@RequestMapping("/api/chatroom")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/save/{userId}")
    SaveRoomResponse makeRoom(@PathVariable Long userId, @RequestBody SaveRoomRequestDto req) {
        return roomService.makeRoom(req, userId);
    }

    @GetMapping()
    RoomListResponse getRoomList() {
        return roomService.getRoomList();
    }

    @GetMapping("/info/{roomId}")
    RoomUserListResponse getRoomInfo(@PathVariable Long roomId) {
        return roomService.getRoomInfo(roomId);
    }

    @PostMapping("/enter/{roomId}/{userId}")
    EnterRoomResponse enterRoom(@PathVariable Long userId, @PathVariable Long roomId) {
        return roomService.enterRoom(userId, roomId);
    }

    @GetMapping("/chats/{roomId}/{userId}")
    MessageListResponse getChats(@PathVariable Long roomId, @PathVariable Long userId) {
        return roomService.getChats(roomId, userId);
    }

    @GetMapping("/leave/{roomId}/{userId}")
    LeaveRoomResponse leaveRoom(@PathVariable Long roomId, @PathVariable Long userId) {
        return roomService.leaveRoom(roomId, userId);
    }

    @GetMapping("/myroom/{userId}")
    GetMyRoomResponse getMyRoom(@PathVariable Long userId) {
        return roomService.getMyRoom(userId);
    }
}
