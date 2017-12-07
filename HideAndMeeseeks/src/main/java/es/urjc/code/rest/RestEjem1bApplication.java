package es.urjc.code.rest;

import java.util.Properties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.*;


@SpringBootApplication
@EnableWebSocket
public class RestEjem1bApplication implements WebSocketConfigurer   
{
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) 
    {
        registry.addHandler(redHandler(), "/red").setAllowedOrigins("*");
    }
    
    @Bean
    public WebsocketRedHandler redHandler()
    {
        return new WebsocketRedHandler();
    }
    
    public static void main(String[] args) 
    {
        SpringApplication app = new SpringApplication(RestEjem1bApplication.class);
       
        Properties properties = new Properties();
        properties.setProperty("spring.resources.staticLocations", "classpath:/static/");
        app.setDefaultProperties(properties);
        app.run(args);
    }
}
