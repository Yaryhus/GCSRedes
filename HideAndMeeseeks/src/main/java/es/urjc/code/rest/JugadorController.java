package es.urjc.code.rest;

import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JugadorController {
	
       public  List<Jugador> Jugadores = new ArrayList<>();
        
     
        //Pedir jugador
	@RequestMapping(value = "/jugadores", method = RequestMethod.GET)
	public List<Jugador> jugadores() 
        {

		return Jugadores;
	}
        
        //Añadir Jugador
        @RequestMapping(value = "/jugadores", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addJugador(@RequestBody Jugador jugador) {
                Jugadores.add(jugador);
                return new ResponseEntity<>(true, HttpStatus.CREATED);
	}
        
                //Get Puntuacion
        	@RequestMapping(value = "/getPuntuacion/{jugador}", method = RequestMethod.GET)
	public int getPuntuacion(@PathVariable String jugador) 
        {
            for(int i=0; i<Jugadores.size();i++)
                {
	      if(Jugadores.get(i).getName().equals(jugador))
                    return Jugadores.get(i).getPuntos();
                }
           return -1;
	}
                //Añadir Puntuacion
        @RequestMapping(value = "/setPuntuacion/{jugador}", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addPuntuacion(@RequestBody int puntos, @PathVariable Jugador jugador) {
                for(int i=0; i<Jugadores.size();i++)
                {
                    if(Jugadores.get(i).getName().equals(jugador.getName()))
                    {
                        Jugadores.get(i).setPuntos(Jugadores.get(i).getPuntos() + puntos);
                    }
                }
                return new ResponseEntity<>(true, HttpStatus.CREATED);
	}
        
        //Sustituir puntuacion 
        @RequestMapping(value = "/setPuntuacion/{jugador}", method = RequestMethod.PUT)
	public ResponseEntity<Boolean> setPuntuacion(@RequestBody int puntos, @PathVariable Jugador jugador) {
                for(int i=0; i<Jugadores.size();i++)
                {
                    if(Jugadores.get(i).getName().equals(jugador.getName()))
                    {
                        Jugadores.get(i).setPuntos(puntos);
                    }
                }
                return new ResponseEntity<>(true, HttpStatus.CREATED);
	}
        
      //Borrar Jugador
        @RequestMapping(value = "/deleteJugador", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteJugador(@RequestBody Jugador jugador) {
                for(int i=0; i<Jugadores.size();i++)
                {
                    if(Jugadores.get(i).getName().equals(jugador.getName()))
                    {
                        Jugadores.remove(Jugadores.get(i));
                    }
                }
                //Jugadores.remove(jugador);
                return new ResponseEntity<>(true, HttpStatus.CREATED);
	}
        
       
}
