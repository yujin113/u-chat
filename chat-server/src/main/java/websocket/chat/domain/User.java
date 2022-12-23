package websocket.chat.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String email;

    private String username;

    private String password;

    @Column(length = 1024)
    private String token;

    public static User createUser(String email, String username, String password, String token) {
        User user = new User();
        user.email = email;
        user.username = username;
        user.password = password;
        user.token = token;
        return user;
    }
}
