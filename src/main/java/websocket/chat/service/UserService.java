package websocket.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import websocket.chat.controller.ResultCode;
import websocket.chat.domain.User;
import websocket.chat.dto.req.SignUpRequestDto;
import websocket.chat.dto.res.SignUpResponse;
import websocket.chat.repository.UserRepository;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public SignUpResponse signUp(SignUpRequestDto req, String token) {
        SignUpResponse res = new SignUpResponse();

//        try {
        System.out.println(token);

        if (userRepository.existsByEmail(req.getEmail())) {
            res.setCode(ResultCode.AlreadyExistEmail);
            return res;
        }
        User user = User.createUser(req.getEmail(), req.getUsername(), req.getPassword(), token);
        userRepository.save(user);

        res.setCode(ResultCode.Success);
        return res;
//        } catch (Exception e) {
//            res.setCode(ResultCode.Failed);
//            return res;
//        }
    }
}
