package es.urjc.code.rest;

public class Jugador 
{
    private String name;
    private int puntos;
	
    public Jugador() 
    {    
    }
	
    public Jugador(String name, int puntos) 
    {
	this.name = name;
	this.puntos = puntos;
    }

    public String getName() 
    {
        return name;
    }

    public void setName(String name) 
    {
        this.name = name;
    }

    public int getPuntos() 
    {
        return puntos;
    }

    public void setPuntos(int puntos) 
    {
        this.puntos = puntos;
    }
}
