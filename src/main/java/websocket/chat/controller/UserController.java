package websocket.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import websocket.chat.dto.req.LoginRequestDto;
import websocket.chat.dto.req.SignUpRequestDto;
import websocket.chat.dto.res.LoginResponse;
import websocket.chat.dto.res.SignUpResponse;
import websocket.chat.service.FCMService;
import websocket.chat.service.UserService;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final FCMService fcmService;

    @PostMapping("/signup")
    SignUpResponse signUp(@Valid @RequestBody SignUpRequestDto req) throws IOException {
        String token = fcmService.getAccessToken();
        return userService.signUp(req, token);
    }

    @PostMapping("/login")
    LoginResponse login(@RequestBody LoginRequestDto req) {
        return userService.login(req);
    }
}
