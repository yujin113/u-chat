package websocket.chat.controller;

public class ResultCode {

    public static final int Success = 200; // OK

    public static final int Failed = -1; // Failed

    public static final int Unauthorized = 401; // Unauthorized

    public static final int InternalServerError = 500; // Internal Server Error

    public static final int InvalidParameter = 600; // invalid parameter

    public static final int DuplicateUser = 601; // duplicate user

    public static final int InvalidToken = 602; // invalid token

    public static final int InvalidRoom = 603; // invalid room

    public static final int DuplicateRequest = 604; // duplicate request

    public static final int NotFoundUser = 1000; // not found user

    public static final int AlreadyExistEmail = 10010; // already exist email

    public static final int AlreadyEnter = 10020; // already enter

    public static final int InvalidPassword = 10030; // invalid password


    public static final int BadParams = 605; // invalid parameter

    public static String get(int code) {
        switch(code) {
            case 200: return "OK";
            case -1: return "Failed";
            case 401: return "Unauthorized";
            case 500: return "Internal Server Error";
            case 600: return "invalid parameter";
            case 601: return "duplicate user";
            case 602: return "invalid token";
            case 603: return "invalid room";
            case 604: return "duplicate request";
            case 1000: return "not found user";
            case 10010: return "already exist email";
            case 10020: return "already enter";
            case 10030: return "invalid password";
            case 605: return "invalid parameter";
        }
        return "Uknown";
    }
}
