package websocket.chat.controller;

public class ResultCode {

    public static final int Success = 200; // 성공

    public static final int Failed = -1; // 실패

    public static final int Unauthorized = 401; // Unauthorized

    public static final int NotFoundUser = 1000; // 사용자를 찾을 수 없습니다.

    public static final int AlreadyExistEmail = 10010; // 이미 사용중인 이메일입니다.

    public static final int BadParams = 10100; // 파라미터가 유효하지 않습니다.

    public static final int InvalidPassword = 10020; // 비밀번호가 유효하지 않습니다.

    public static final int DbFailed = 99999; // DB 실패

    public static String get(int code) {
        switch(code) {
            case 200: return "성공";
            case -1: return "실패";
            case 401: return "Unauthorized";
            case 1000: return "사용자를 찾을 수 없습니다.";
            case 10010: return "이미 사용중인 이메일입니다.";
            case 10100: return "파라미터가 유효하지 않습니다.";
            case 10020: return "비밀번호가 유효하지 않습니다.";
            case 99999: return "DB 실패";
        }
        return "Uknown";
    }
}
