package websocket.chat.dto;

import lombok.Data;
import websocket.chat.controller.ResultCode;


@Data
public class BaseResponse {
    private int code;
    private String message;

    public void setCode(int code) {
        this.code = code;
        this.message = ResultCode.get(code);
    }
}
