package websocket.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import websocket.chat.dto.req.SaveRoomRequestDto;
import websocket.chat.dto.res.RoomListResponse;
import websocket.chat.dto.res.SaveRoomResponse;
import websocket.chat.service.RoomService;

@RestController
@RequestMapping("/api/chatroom")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/{userId}")
    SaveRoomResponse saveRoom(@PathVariable Long userId, @RequestBody SaveRoomRequestDto req) {
        return roomService.saveRoom(req, userId);
    }

    @GetMapping()
    RoomListResponse getRoomList() {
        return roomService.getRoomList();
    }
}
