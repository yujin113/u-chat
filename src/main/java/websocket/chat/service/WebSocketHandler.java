package websocket.chat.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();


    /**
     * 웹소켓 연결
     * @param session
     * @throws Exception
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("Connection established: " + session.getId());
        sessions.put(session.getId(), session);
    }

    /**
     * 웹소켓을 통해 메시지를 주고 받음
     * @param session
     * @param message
     * @throws Exception
     */
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        log.info("Message received: " + message.getPayload());

        this.sessions.forEach((sessionId, webSocketSession) -> {
            try {
                webSocketSession.sendMessage(message);
            } catch (Exception e) {
                log.error("Error sending message", e);
            }
        });

//        session.sendMessage(new TextMessage("Hello " + message.getPayload()));
    }

    /**
     * 웹소켓 연결 해제
     * @param session
     * @param status
     * @throws Exception
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("Connection closed: " + session.getId());
        sessions.remove(session.getId());
    }


    /**
     * 에러 발생
     * @param session
     * @param exception
     * @throws Exception
     */
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.error("Transport error: " + session.getId(), exception);
        sessions.remove(session.getId());
    }



}
