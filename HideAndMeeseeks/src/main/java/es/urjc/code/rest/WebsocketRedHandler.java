package es.urjc.code.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;


public class WebsocketRedHandler extends TextWebSocketHandler 
{
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); //Hashmap de sesiones.
    private ObjectMapper mapper = new ObjectMapper(); //Objeto mapper para utilizar Json con nodos.
    
    List<WebSocketSession> partida = new ArrayList<WebSocketSession>(); //Lista que almacena las sesiones activas en una partida.
    boolean empezada = false; //Booleano auxiliar que indica si se ha empezado la partida.
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception //Método llamado al establecerse la conexión con una sesión.
    {
        if(sessions.size() <= 3 && !empezada) //Si la partida no ha empezado y cabe otro jugador.
        {
            System.out.println("New user: " + session.getId());
            sessions.put(session.getId(), session);
        }
        else //Si la partida ha empezado o está llena.
        {
            session.sendMessage(new TextMessage("{\"clave\":\"full\"}")); //Mandamos un mensaje que indique que está llena o en curso.
        }
    }
	
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception //Método llamado al cerrarse la conexión con una sesión.
    {
	System.out.println("Session closed: " + session.getId());
	sessions.remove(session.getId());
        partida.remove(session); //Eliminamos la sesión de la partida.
        
        if (empezada) //Si la partida ha empezado.
        {
            for(WebSocketSession participant : sessions.values()) 
            {
                if(!participant.getId().equals(session.getId())) 
                {
                    participant.sendMessage(new TextMessage("{\"clave\":\"bye\"}")); //Mandamos un mensaje a cada jugador indicando que se han ido de la partida.
                }
            }
        }
        
        if (sessions.isEmpty()) //Si no hay sesiones restantes.
        {
            empezada = false; //Desmarcamos el booleano auxiliar.
        }
    }
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception //Método llamado al recibir un mensaje de una sesión.
    {
        if (sessions.containsValue(session)) //Si la sesión pertenece al servidor.
        {
            System.out.println("Message received: " + message.getPayload());
            String msg = message.getPayload();
            JsonNode node = mapper.readTree(msg);

            switch(node.get("clave").asText()) //Comprobamos el valor de la clave del mensaje.
            {   
                case ("init"): //Mensaje inicial.
                    partida.add(session); //Añadimos la sesión a la partida.
                    
                    if(session.getId().equals(partida.get(0).getId())) //Si la sesión es la primera.
                    {
                        session.sendMessage(new TextMessage("{\"clave\":\"leader\"}")); //Mandamos mensaje de líder de sesión.
                    }
                    
                    sendOtherParticipants(session, node);
                    break;
                
                case ("start"): //Mensaje de comienzo de partida.
                    if(!empezada) //Si no había empezado.
                    {
                        empezada = true; //Marcamos el booleano auxiliar.
                        sendOtherParticipants(session, node);
                    }
                    break;
                    
                case ("restart"): //Mensaje de recomenzar la ronda.
                    sessions.get(partida.get(0).getId()).sendMessage(new TextMessage("{\"clave\":\"activate\"}")); //Activamos el turno del jugador inicial.
                    break;
                    
                case ("deactivate"): //Mensaje de desactivar turno.
                    if(partida.indexOf(session) != (partida.size()-1)) //Si la sesión que manda el mensaje no es la última.
                    {
                        sessions.get(partida.get(partida.indexOf(session)+1).getId()).sendMessage(new TextMessage("{\"clave\":\"activate\"}")); //Activamos el turno de la siguiente sesión.
                    }
                    else //Si la sesión que manda el mensaje es la última.
                    {
                        //sessions.get(partida.get(0).getId()).sendMessage(new TextMessage("{\"clave\":\"activate\"}")); //(Debug).
                        sessions.get(partida.get(0).getId()).sendMessage(new TextMessage("{\"clave\":\"enemies\"}")); //Activamos el turno de los enemigos.
                    }
                    
                    break;
                
                case ("moverPJ"): //Mensaje de movimiento.
                case ("ruido"): //Mensaje de ruido.
                case ("atacaraenemigo"): //Mensaje de ataque al enemigo.
                case ("moverenemigo"): //Mensaje de mover a un enemigo.
                case ("atacarenemigo"): //Mensaje de ataque del enemigo.
                case ("spawnenemigo"): //Mensaje de spawn de los enemigos.
                case ("continuar"): //Mensaje de continuar.
                case ("response"): //Mensaje de respuesta inicial.
                    sendOtherParticipants(session, node);
                    break;

                case ("chat"): //Mensaje de chat.
                    session.sendMessage(new TextMessage(node.toString()));
                    sendOtherParticipants(session, node);
                    break;

                case ("echo"): //Mensaje de servidor de eco.
                    session.sendMessage(new TextMessage(node.toString()));
                    break;

                case ("Hi"): //Mensaje de saludo inicial.
                    session.sendMessage(new TextMessage(node.toString()));
                    break;

                default:
                    break;
            }
        }
    }

    private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException //Método llamado para enviar el mensaje al resto de sesiones.
    {
	System.out.println("Message sent: " + node.toString());
	ObjectNode newNode = mapper.createObjectNode();
        
        newNode.put("clave", node.get("clave").asText());
        
        switch(node.get("clave").asText()) //Configuramos el mensaje Json en función de la clave del mensaje.
        {   
            case ("ruido"):
                newNode.put("jugador", node.get("jugador").asText());
                break;
            
            case ("moverPJ"):
                newNode.put("jugador", node.get("jugador").asText());
                newNode.put("i", node.get("i").asText());
                newNode.put("j", node.get("j").asText());
                newNode.put("salud", node.get("salud").asText());
                break;
            
            case ("atacaraenemigo"):
                newNode.put("jugador", node.get("jugador").asText());
                newNode.put("enemigo", node.get("enemigo").asText());
                newNode.put("hurt", node.get("hurt").asText());
                break;
            
            case ("moverenemigo"):
                newNode.put("enemigo", node.get("enemigo").asText());
                newNode.put("casillau", node.get("casillau").asText());
                newNode.put("casillav", node.get("casillav").asText());
                break;
                
            case ("atacarenemigo"):
                newNode.put("jugador", node.get("jugador").asText());
                newNode.put("hurt", node.get("hurt").asText());
                break;
            
            case ("spawnenemigo"):
                newNode.put("casillau", node.get("casillau").asText());
                newNode.put("casillav", node.get("casillav").asText());
                newNode.put("coordx", node.get("coordx").asText());
                newNode.put("coordy", node.get("coordy").asText());
                newNode.put("tipo", node.get("tipo").asText());
                break;
            
            case ("response"):
            case ("init"):
            case ("chat"):
            case ("echo"):                 
            case ("Hi"):
                newNode.put("message", node.get("message").asText());
                break;
                
            case ("continuar"):
            case ("start"):
            default:
                break;
        }

	for(WebSocketSession participant : sessions.values()) //Enviamos el mensaje al resto de sesiones.
        {
            if(!participant.getId().equals(session.getId())) 
            {
		participant.sendMessage(new TextMessage(newNode.toString()));
            }
	}
    }  
}
