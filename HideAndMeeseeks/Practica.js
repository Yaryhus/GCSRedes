/*
Código JavaScript - Guillermo Amigó Urda, Alejandro Camuñas Casas y Sergio García Aloguín.
Práctica final de Juegos en Red.
Grado en Diseño y Desarrollo de Videojuegos.
*/

var game = new Phaser.Game(1000, 751, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

//Arrays con todas las imagenes y array de direcciones de imagenes a cargar.
var nombreGaleriaFoto = new Array("P_Beth","P_Jerry","P_Morty","P_MrP","P_Rick","P_Summer");
var dirGaleriaFoto = new Array("Material/Img/Characters/Characters - Beth.png","Material/Img/Characters/Characters - Jerry.png","Material/Img/Characters/Characters - Morty.png","Material/Img/Characters/Characters - MrP.png","Material/Img/Characters/Characters - Rick.png","Material/Img/Characters/Characters - Summer.png");
var nombreSprite = new Array(); //Por rellenar
var dirSprite = new Array(); //Por rellenar
var nombreCartas = new Array(
		"CA_Bate","CA_Blaster","CA_Fart","CA_Martillo","CA_Navaja","CA_Patucasa","CA_Pistola","CA_Plot",
		"CC_Cristal","CC_Deus","CC_Elixir","CC_Salsa","CC_Simulation","CC_Single",
		"CE_Bata","CE_Casco","CE_Hamster","CE_Mando","CE_Microverso","CE_Monopatin","CE_Portales",
		"CO_Boss","CO_Enemy1","CO_Enemy2","CO_Herida");
var dirCartas = new Array(
		"Material/Img/Cartas/Armas/Card - Obj - Bate.png","Material/Img/Cartas/Armas/Card - Obj - Blaster.png","Material/Img/Cartas/Armas/Card - Obj - Fart.png","Material/Img/Cartas/Armas/Card - Obj - Martillo.png","Material/Img/Cartas/Armas/Card - Obj - Navaja.png","Material/Img/Cartas/Armas/Card - Obj - Patucasa.png","Material/Img/Cartas/Armas/Card - Obj - Pistola.png","Material/Img/Cartas/Armas/Card - Obj - Plot.png",
		"Material/Img/Cartas/Consumibles/Card - Obj - Cristal.png","Material/Img/Cartas/Consumibles/Card - Obj - Deus.png","Material/Img/Cartas/Consumibles/Card - Obj - Elixir.png","Material/Img/Cartas/Consumibles/Card - Obj - Salsa.png","Material/Img/Cartas/Consumibles/Card - Obj - Simulation.png","Material/Img/Cartas/Consumibles/Card - Obj - Single.png",
		"Material/Img/Cartas/Equipo/Card - Obj - Bata.png","Material/Img/Cartas/Equipo/Card - Obj - Casco.png","Material/Img/Cartas/Equipo/Card - Obj - Hamster.png","Material/Img/Cartas/Equipo/Card - Obj - Mando.png","Material/Img/Cartas/Equipo/Card - Obj - Microverso.png","Material/Img/Cartas/Equipo/Card - Obj - Monopatin.png","Material/Img/Cartas/Equipo/Card - Obj - Portales.png",
		"Material/Img/Cartas/Otros/Card - Boss.png","Material/Img/Cartas/Otros/Card - Enemy 1.png","Material/Img/Cartas/Otros/Card - Enemy 2.png","Material/Img/Cartas/Otros/Card - Herida.png");

function preload() 
{
	//Cargamos todas las imágenes usadas en el juego (caracteres, mapas, logo, etc)
	game.load.image('logo', 'Material/Img/Otros/Logo.png');
	game.load.images(nombreGaleriaFoto,dirGaleriaFoto);
	game.load.image('Map1','Material/Img/Mapas/Map 1 - Bounds.png');
	game.load.image("Map2","Material/Img/Mapas/Map 2 - Bounds.png");
	game.load.image("Pickle_Card","Material/Img/Otros/Pickle.png");
	game.load.image("Traitor_Card","Material/Img/Otros/Traitor.png");
	game.load.image("Box","Material/Img/Otros/Box.png");
	game.load.images(nombreSprite,dirSprite);
	game.load.images(nombreCartas,dirCartas);


}


function create() 
{


	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;

	$(document).ready(function(){


		//Preguntamos numero de jugadores y mapa elegido. Lo almacenaremos en mapa y jug
		var jug=1;
		var p = new Partida(jug); 
		p.init();
		gameLoop(p);

	});
}

function gameLoop(p) 
{
		
	var ganar=false;

	while(ganar == false)
	{
		//Turno del jugador
			
	}
}


function update() 
{

}

function Partida(numJ)
{

	var mapa;
	var numJugadores = numJ;
	var jugadores = new Array();
	var enemigos = new Array();

	this.init = function()
	{
		//preguntamos mapa  (1 o 2)
		var map=1;
		mapa = new Mapa(map);
		for(var i=0; i < numJugadores ; i++)
			{
				jugadores[i] = new Jugador();
			}
		jugadores[0].setPersonaje(new Personaje("Rick"));
		mapa.init();

	}
}

function Jugador()
{
	var personaje;
	var accionesDisp;
	var traidor;
	var casilla = new Array(); //Pos (i,j) en la matriz de casillas.


this.setPersonaje = function(p)
{
	personaje=p;
} 

this.getAccionesDisp = function()
{
	return accionesDisp;
}

}

function Mapa(tip)
{
	var tipo = tip;
	var Tablero = new Array(7);
	for(var i=0;i<7;i++)
	{
		Tablero[i] = new Array (9);
	}
	var fondo;
	this.init= function()
	{
		fondo = game.add.sprite(0,0,'Map1');
	}
}

function Casilla(int)
{
	var ruido;
	var numPersonajes;
	var numEnemigos;
	var interior = int;


}

function Enemigo()
{

	var salud;
	var dados;

}

function Objeto(){

}

function Personaje(nom)
{
	var id = nom;
	var inventario = new Array();
	var salud;
	var dados;

}

function Dados()
{

}