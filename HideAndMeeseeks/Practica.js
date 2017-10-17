/*
Código JavaScript - Guillermo Amigó Urda, Alejandro Camuñas Casas y Sergio García Aloguín.
Práctica final de Juegos en Red.
Grado en Diseño y Desarrollo de Videojuegos.
*/


/////////////////////////////////// Variables globales ///////////////////////////////////


var game = new Phaser.Game(1000, 751, Phaser.CANVAS, '', { preload: preload, create: create, update: update }); //Creación del juego en Phaser.

var njug = 1; //Número de jugadores de la partida.
var started = false; //Booleano de si ha empezado la partida.
var esturno = false; //Booleano auxiliar para almacenar información del turno del jugador.
var move = false;
var p = new Partida(njug); //Instancia de la partida.

var isClicked = false;
//////////////////////////////////////// Phaser //////////////////////////////////////////


function preload() //Función preload: precarga los assets del juego.
{
	//Creamos arrays que almacenan los nombres de los assets y sus directorios, para automatizar su precarga.

		//Nombres y directorios de los personajes.
		var nombreP = new Array("P_Beth","P_Jerry","P_Morty","P_MrP","P_Rick","P_Summer");

		var dirP = new Array("Material/Img/Characters/Characters - Beth.png","Material/Img/Characters/Characters - Jerry.png",
							 "Material/Img/Characters/Characters - Morty.png","Material/Img/Characters/Characters - MrP.png",
							 "Material/Img/Characters/Characters - Rick.png","Material/Img/Characters/Characters - Summer.png");


		//Nombres y directorios de las cartas.
		var nombreC = new Array("CA_Bate","CA_Blaster","CA_Fart","CA_Martillo","CA_Navaja","CA_Patucasa","CA_Pistola","CA_Plot",
								"CC_Cristal","CC_Deus","CC_Elixir","CC_Salsa","CC_Simulation","CC_Single",
								"CE_Bata","CE_Casco","CE_Hamster","CE_Mando","CE_Microverso","CE_Monopatin","CE_Portales",
								"CO_Boss","CO_Enemy1","CO_Enemy2","CO_Herida");

		var dirC = new Array("Material/Img/Cartas/Armas/Card - Obj - Bate.png","Material/Img/Cartas/Armas/Card - Obj - Blaster.png",
							 "Material/Img/Cartas/Armas/Card - Obj - Fart.png","Material/Img/Cartas/Armas/Card - Obj - Martillo.png",
							 "Material/Img/Cartas/Armas/Card - Obj - Navaja.png","Material/Img/Cartas/Armas/Card - Obj - Patucasa.png",
							 "Material/Img/Cartas/Armas/Card - Obj - Pistola.png","Material/Img/Cartas/Armas/Card - Obj - Plot.png",
							 "Material/Img/Cartas/Consumibles/Card - Obj - Cristal.png","Material/Img/Cartas/Consumibles/Card - Obj - Deus.png",
							 "Material/Img/Cartas/Consumibles/Card - Obj - Elixir.png","Material/Img/Cartas/Consumibles/Card - Obj - Salsa.png",
							 "Material/Img/Cartas/Consumibles/Card - Obj - Simulation.png","Material/Img/Cartas/Consumibles/Card - Obj - Single.png",
							 "Material/Img/Cartas/Equipo/Card - Obj - Bata.png","Material/Img/Cartas/Equipo/Card - Obj - Casco.png",
							 "Material/Img/Cartas/Equipo/Card - Obj - Hamster.png","Material/Img/Cartas/Equipo/Card - Obj - Mando.png",
							 "Material/Img/Cartas/Equipo/Card - Obj - Microverso.png","Material/Img/Cartas/Equipo/Card - Obj - Monopatin.png",
							 "Material/Img/Cartas/Equipo/Card - Obj - Portales.png","Material/Img/Cartas/Otros/Card - Boss.png",
							 "Material/Img/Cartas/Otros/Card - Enemy 1.png","Material/Img/Cartas/Otros/Card - Enemy 2.png","Material/Img/Cartas/Otros/Card - Herida.png");


		//Nombres y directorios de los sprites.
		/*
		var nombreSprite = new Array("S_AS", "S_Beth", "S_Jerry", "S_Meeseek1", "S_Meeseek2", "S_Morty", "S_MrP", "S_Rick", "S_Summer");

		var dirSprite = new Array("Material/Sprites/as.png", "Material/Sprites/beth.png", "Material/Sprites/jerry.png", "Material/Sprites/meeseek1.png",
								  "Material/Sprites/meeseek2.png", "Material/Sprites/morty.png", "Material/Sprites/mrp.png", "Material/Sprites/rick.png",
								  "Material/Sprites/summer.png");
								  */

		game.load.spritesheet('S_Rick', "Material/Sprites/rick.png", 57, 72.5, 16);

	//Precargamos los assets.
	game.load.image('Logo', 'Material/Img/Otros/Logo.png');
	game.load.image('Map1','Material/Img/Mapas/Map 1 - Bounds.png');
	game.load.image("Map2","Material/Img/Mapas/Map 2 - Bounds.png");
	game.load.image("Pickle","Material/Img/Otros/Pickle.png");
	game.load.image("Traitor","Material/Img/Otros/Traitor.png");
	game.load.image("Box","Material/Img/Otros/Box.png");

	game.load.images(nombreP,dirP);
	game.load.images(nombreC,dirC);
	//game.load.images(nombreSprite,dirSprite);
}


function create() //Función create: inicia el juego.
{
	//Centramos horizontal y verticalmente el canvas de Phaser.
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;

	p.init(); //Inicializamos la partida.
	started = true; //Fijamos el booleano a true al empezar la partida.
	
	//Creamos los manejadores de eventos.
	document.getElementById("mover").addEventListener("click", moverclick);
}


function update() //Función update: actualiza el juego.
{
	//(Debug): Capturamos la posición del ratón.
	//var pos = game.input.activePointer.position;
    //console.log("x:" + pos.x + " y:" + pos.y, 180, 200);

	if (started&&(!move)) //Si la partida ha empezado.
	{
		esturno = (p.getJugadores()[0].getAccionesDisp() > 0) //Fijamos el booleano a true si: acciones > 0.


		if (!esturno) //Si ha terminado el turno del jugador, turno de la máquina.
		{
			alert("Se acabó el turno.") //Debug.
			p.getJugadores()[0].setAccionesDisp(4); //Reseteamos las acciones del jugador.
		}
	}





 			var c = p.getMapa().getTablero();



		if (move){


 			var casillaActual = p.getJugadores()[0].getCasilla();
 			//c[casillaActual[0]+1 ][casillaActual[1]+1 ].getGraphics().destroy();
 			//c[casillaActual[0]+1 ][casillaActual[1]+1 ].pintRect(0xff0000,0.3);

 			c[casillaActual[0]+1 ][casillaActual[1] ].getGraphics().destroy();
 			c[casillaActual[0]+1 ][casillaActual[1] ].pintRect(0xff0000,0.3);

 			//c[casillaActual[0]-1 ][casillaActual[1]-1 ].getGraphics().destroy();
 			//c[casillaActual[0]-1 ][casillaActual[1]-1 ].pintRect(0xff0000,0.3);


			if( (game.input.activePointer.isDown))
	 		{


 			for (var i=0; i<7; i++)
			{
				for(var j=0; j<9; j++)
				{
					if(c[i][j] instanceof Casilla)
					{
						var rect = c[i][j].getRect();

						if(Phaser.Rectangle.contains(rect,game.input.x,game.input.y)){
							p.getJugadores()[0].setCasilla(i,j);
							p.getJugadores()[0].getPersonaje().movePersonaje(c[i][j].getX()+23.5,c[i][j].getY()+16.25);
						}

					}
				}
			}


				move = false;
	 			var c = p.getMapa().getTablero();
	 			for (var i=0; i<7; i++)
				{
					for(var j=0; j<9; j++)
					{
						if(c[i][j] instanceof Casilla)
							{
							c[i][j].setColor(0xFFFFFF);
							c[i][j].getGraphics().destroy();
						}
					}
				}
	 		}

		} 


 			for (var i=0; i<7; i++)
			{
				for(var j=0; j<9; j++)
				{
					if(c[i][j] instanceof Casilla)
					{
						var rect = c[i][j].getRect();

						if (c[i][j].getColor()!=0xff0000){
							c[i][j].getGraphics().destroy();
						}
						

						if(Phaser.Rectangle.contains(rect,game.input.x,game.input.y))
						{
							if (c[i][j].getColor()!=0xff0000)
								c[i][j].pintRect(0xFFFFFF,0.6);
							else{
								c[i][j].getGraphics().destroy();
								c[i][j].pintRect(0xff0000,0.8);
							}
							
							//(Debug): console.log("i: " + i + " j: " + j);
						} 
					}
				}
			}


		// UTILIZAR MAS ADELANTE ESTO COMENTADO
		/*
		if(game.input.activePointer.isDown && (isClicked==false))
 		{
 			isClicked = true;

 		} else if(game.input.activePointer.isUp) {
 			isClicked = false;
 		}
 		*/



 		


}


//////////////////////////////////////// Eventos /////////////////////////////////////////


function moverclick() //Función llamada al pulsar el botón "Mover".
{
 	

 	if (move==false){

		if (esturno) //Si es el turno del jugador (puede realizar sus acciones).
		 	{	
		 	    move = true;	
		   		p.getJugadores()[0].setAccionesDisp(p.getJugadores()[0].getAccionesDisp() - 1); //Disminuimos las acciones del jugador.
		 	}

 	} else {

 		move = false;



 			var c = p.getMapa().getTablero();

 			for (var i=0; i<7; i++)
			{
				for(var j=0; j<9; j++)
				{
					if(c[i][j] instanceof Casilla)
						{
						c[i][j].setColor(0xFFFFFF);
						c[i][j].getGraphics().destroy();
					}
						
					
				}
			}


 	}
}


////////////////////////////////// Funciones auxiliares //////////////////////////////////


function Dados() //Función auxiliar para el lanzamiento aleatorio de dados.
{

}

//////////////////////////////////////// Objetos /////////////////////////////////////////


function Partida(numJ) //Objeto Partida.
{
	//Variables.
	var mapa; //Objeto mapa en el que se desarrolla la partida.
	var jugadores = new Array(); //Array que contiene todos los jugadores de la partida.
	var enemigos = new Array(); //Array que contiene todos los enemigos de la partida.

	//Funciones.
	this.init = function() //Función que inicializa la partida.
	{
		//Seleccionamos el mapa.
		var map = 1;
		mapa = new Mapa(map);

		//Creamos los jugadores.
		for(var i = 0; i < njug; i++)
		{
			jugadores[i] = new Jugador();
		}

		mapa.init(); //Inicializamos el mapa.

		//Seleccionamos los personajes.
		jugadores[0].setPersonaje(new Personaje("Rick"));
		jugadores[0].getPersonaje().init();

		
	}

	//Getters.
	this.getJugadores = function()
	{
		return jugadores;
	}
	this.getMapa = function()
	{
		return mapa;
	}
}


function Jugador() //Objeto Jugador.
{
	//Variables.
	var traidor; //Booleano de si es traidor o no.
	var personaje; //Personaje del jugador.
	var accionesDisp = 4; //Acciones disponibles del jugador.
	var casilla = [0,4]; //Índice i y j de la casilla en que está.

	//Funciones.

	//Getters.
	this.getAccionesDisp = function()
	{
		return accionesDisp;
	}

	//Setters.
	this.setPersonaje = function(p)
	{
		personaje = p;
	} 
	this.getPersonaje = function()
	{
		return personaje;
	} 

	this.setAccionesDisp = function(a)
	{
		accionesDisp = a;
	}

	this.getCasilla = function(){
		return casilla;
	}
	this.setCasilla = function(i,j){
		casilla = [i,j];
	}
}


function Personaje(nom) //Objeto Personaje.
{
	//Variables.
	var id = nom; //ID del personaje.
	var salud = 3; //Salud del personaje.
	var dados; //Dados del personaje.
	var inventario = new Array(3); //Inventario de objetos del personaje.
	var sprite;

	//Funciones.
	this.init = function()
	{
		sprite = game.add.sprite(475, 0, 'S_Rick');


	   // sprite.animations.add('idle', 16, true);

        
       sprite.frame = 0;

	}

	this.movePersonaje = function(x,y)
	{
		//sprite.animations.play('idle');
		sprite.x = x;
		sprite.y = y;
        sprite.frame = 0;

	}

}


function Mapa(tip) //Objeto Mapa.
{
	//Variables.
	var fondo; //Imagen de fondo.
	var tipo = tip; //Tipo de mapa (1-Fácil, 2-Difícil).
	var Tablero = new Array(); //Array de casillas del tablero.
	
	//Funciones.
	this.init = function() //Función que inicializa el mapa.
	{
		if (tipo == 1) //Si el mapa es de tipo 1.
		{
			fondo = game.add.sprite(0,0,'Map1'); //Creamos el fondo.

			for(var i = 0; i < 7; i++) //Creamos un tablero de 7x9.
			{
				Tablero[i] = new Array (9);
			}

			this.fillTab(); //Rellenamos el tablero.
		}
	}

	this.fillTab = function() //Función que rellena el tablero con objetos casilla, según el mapa.
	{
		if (tipo == 1) //Si el mapa es de tipo 1.
		{
			//Rellenamos el tablero como undefined, inicialmente.
			for (var i=0; i<7; i++)
			{
				for(var j=0; j<9; j++)
				{
					Tablero[i][j] = undefined;
				}
			}

			//Casilla objetivo.
			Tablero[4][7] = new Casilla(false,825,325,175,175);

			//Casillas exteriores.
			Tablero[0][4] = new Casilla(false,450,0,100,50); Tablero[1][4] = new Casilla(false,450,75,100,100); Tablero[2][0] = new Casilla(false,0,200,50,100);
			Tablero[2][1] = new Casilla(false,75,200,100,100); Tablero[2][2] = new Casilla(false,200,200,100,100); Tablero[2][4] = new Casilla(false,450,200,100,100);
			Tablero[2][3] = new Casilla(false,325,200,100,100); Tablero[2][5] = new Casilla(false,575,200,75,100);
			Tablero[2][6] = new Casilla(false,700,200,100,100); Tablero[2][7] = new Casilla(false,825,200,100,100); Tablero[2][8] = new Casilla(false,950,200,50,100);
			Tablero[3][0] = new Casilla(false,0,325,50,100); Tablero[3][2] = new Casilla(false,200,325,100,100); Tablero[3][6] = new Casilla(false,700,325,100,100);
			Tablero[4][0] = new Casilla(false,0,450,50,100); Tablero[4][1] = new Casilla(false,75,450,100,100); Tablero[4][2] = new Casilla(false,200,450,100,100);
			Tablero[4][3] = new Casilla(false,325,450,100,100); Tablero[4][4] = new Casilla(false,450,450,100,100); Tablero[4][5] = new Casilla(false,575,450,100,100);
			Tablero[4][6] = new Casilla(false,700,450,100,100); Tablero[5][2] = new Casilla(false,200,575,100,100); Tablero[6][2] = new Casilla(false,200,700,100,50);

			//Casillas interiores.
			Tablero[1][2] = new Casilla(true,0,0,250,170); Tablero[1][3] = new Casilla(true,250,0,170,170); Tablero[1][5] = new Casilla(true,575,0,175,175); 
			Tablero[1][6] = new Casilla(true,750,0,250,175); Tablero[3][1] = new Casilla(true,75,325,100,100); Tablero[3][3] = new Casilla(true,325,325,175,100);
			Tablero[3][5] = new Casilla(true,500,325,175,100); Tablero[5][1] = new Casilla(true,0,575,175,175); Tablero[5][3] = new Casilla(true,325,575,175,175);
			Tablero[5][6] = new Casilla(true,500,575,250,175); Tablero[5][7] = new Casilla(true,750,575,300,175);
		}
	}
	
	//Getters.
	this.getTablero = function()
	{
		return Tablero;
	}
}


function Casilla(inter, x, y, ancho, alto) //Objeto Casilla.
{
	//Variables.
	var graphics = game.add.graphics();
	var ruido = 0; //Ruido de la casilla.
	var numPersonajes = 0; //Personajes en la casilla.
	var numEnemigos = 0; //Enemigos en la casilla.
	var interior = inter; //Booleano sobre si la casilla es interior o no.
	var rectan = new Phaser.Rectangle(x,y,ancho,alto); //Rectángulo visual de la casilla.
	var colorCasilla;

	//Funciones.
	this.pintRect = function(color, al) //Función que pinta el rectángulo.
	{
		graphics = game.add.graphics();
		graphics.beginFill(color);
		graphics.alpha= al;
		graphics.drawRect(x, y, ancho, alto);
		colorCasilla = color;
	}
	this.getGraphics = function()
	{
		return graphics;
	}
	

	//Getters.
	this.getRect = function()
	{
		return rectan;
	}
	this.getColor = function()
	{
		return colorCasilla;
	}

	this.setColor = function(col)
	{
		colorCasilla = col;
	}

	this.getX = function(){
		return rectan.x;
	}
	this.getY = function(){
		return rectan.y;
	}
}


function Enemigo(tip) //Objeto Enemigo.
{
	//Variables.
	var tipo = tip; //Tipo de enemigo (1-Normal, 2-MiniBoss, 3-Boss).
	var salud; //Salud del enemigo.
	var dados; //Dados del enemigo.

	//Funciones.
}


function Objeto() //Objeto objeto.
{
	//Variables.

	//Funciones.
}

