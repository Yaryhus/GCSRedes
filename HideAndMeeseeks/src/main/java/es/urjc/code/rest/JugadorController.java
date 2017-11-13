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
        
     /*   
        public JugadorController()
        {
            Jugadores.add(new Jugador("Rick",100));
            Jugadores.add(new Jugador("Morty",10));
            Jugadores.add(new Jugador("Summer",20));
            Jugadores.add(new Jugador("Idiocia",1000));
        }
        */
        //Pedir jugador
	@RequestMapping(value = "/jugadores", method = RequestMethod.GET)
	public List<Jugador> jugadores() 
        {
            /*
            Jugadores.add(new Jugador("Rick",100));
            Jugadores.add(new Jugador("Morty",10));
            Jugadores.add(new Jugador("Summer",20));
            Jugadores.add(new Jugador("Idiocia",1000));
*/
		return Jugadores;
	}
        
        //Añadir Jugador
        @RequestMapping(value = "/jugadores", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addJugador(@RequestBody Jugador jugador) {
                Jugadores.add(jugador);
                return new ResponseEntity<>(true, HttpStatus.CREATED);
	}
        //Actualizar valor 
        @RequestMapping(value = "/setPuntuacion", method = RequestMethod.POST)
	public ResponseEntity<Boolean> setPuntuacion(@RequestBody Jugador jugador) {
                for(int i=0; i<Jugadores.size();i++)
                {
                    if(Jugadores.get(i).getName().equals(jugador.getName()))
                    {
                        Jugadores.get(i).setPuntos(jugador.getPuntos());
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
