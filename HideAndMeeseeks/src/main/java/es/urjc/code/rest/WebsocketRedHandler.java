package es.urjc.code.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;


public class WebsocketRedHandler extends TextWebSocketHandler 
{
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private ObjectMapper mapper = new ObjectMapper();
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception 
    {
	System.out.println("New user: " + session.getId());
        sessions.put(session.getId(), session);
    }
	
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception 
    {
	System.out.println("Session closed: " + session.getId());
	sessions.remove(session.getId());
    }
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception 
    {
	System.out.println("Message received: " + message.getPayload());
        String msg = message.getPayload();
	JsonNode node = mapper.readTree(msg);

	switch(node.get("clave").asText())
        {
            case ("chat"):
                session.sendMessage(new TextMessage(node.toString()));
                sendOtherParticipants(session, node);
                break;
            
            case ("echo"):
                session.sendMessage(new TextMessage(node.toString()));
                break;
                    
            case ("Hi"):
                session.sendMessage(new TextMessage(node.toString()));
                break;
                
            default:
                break;
        }
    }

    private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException 
    {
	System.out.println("Message sent: " + node.toString());
		
	ObjectNode newNode = mapper.createObjectNode();
	newNode.put("clave", node.get("clave").asText());
	newNode.put("message", node.get("message").asText());
			
	for(WebSocketSession participant : sessions.values()) 
        {
            if(!participant.getId().equals(session.getId())) 
            {
		participant.sendMessage(new TextMessage(newNode.toString()));
            }
	}
    }  
}
