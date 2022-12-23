package websocket.chat.dto.req;

import com.google.firebase.database.annotations.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
public class SignUpRequestDto {
    @NotBlank(message = "이메일은 필수값입니다.")
    public String email;

    @NotBlank(message = "닉네임은 필수값입니다.")
    @Length(max = 8, message = "닉네임은 8자까지 가능합니다.")
    public String username;

    @NotBlank(message = "비밀번호는 필수값입니다.")
    public String password;

    public boolean invalid() {
        if (
                email == null || email.length() == 0 ||
                        username == null || username.length() == 0 ||
                        password == null || password.length() == 0
        ) {
            return true;
        }
        return false;
    }
}
