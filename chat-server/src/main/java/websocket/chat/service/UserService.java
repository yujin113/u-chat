package websocket.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import websocket.chat.controller.ResultCode;
import websocket.chat.domain.User;
import websocket.chat.dto.req.LoginRequestDto;
import websocket.chat.dto.req.SignUpRequestDto;
import websocket.chat.dto.res.LoginResponse;
import websocket.chat.dto.res.LoginResponseDto;
import websocket.chat.dto.res.SignUpResponse;
import websocket.chat.repository.UserRepository;
import websocket.chat.repository.UserRoomRepository;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserRoomRepository userRoomRepository;

    public SignUpResponse signUp(SignUpRequestDto req, String token) {
        SignUpResponse res = new SignUpResponse();

        System.out.println(token);

        if (userRepository.existsByEmail(req.getEmail())) {
            res.setCode(ResultCode.AlreadyExistEmail);
            return res;
        }
        User user = User.createUser(req.getEmail(), req.getUsername(), req.getPassword(), token);
        userRepository.save(user);

        res.setData(LoginResponseDto.of(user.getUserId(), user.getUsername()));
        res.setCode(ResultCode.Success);
        return res;
    }

    public LoginResponse login(LoginRequestDto req) {
        LoginResponse res = new LoginResponse();

        User user = userRepository.findByEmail(req.getEmail());
        if (user == null) {
            res.setCode(ResultCode.NotFoundUser);
            return res;
        }
        if (!user.getPassword().equals(req.getPassword())) {
            res.setCode(ResultCode.InvalidPassword);
            return res;
        }

        List<Long> rooms = userRoomRepository.getMyRoomId(user);
        Collections.sort(rooms);

        res.setData(LoginResponseDto.of(user.getUserId(), user.getUsername(), rooms));
        res.setCode(ResultCode.Success);
        return res;
    }
}
