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

var turno = 1;
var move = false; //Booleano auxiliar para almacenar información de si el modo mover está activo.
var moving = false; //Booleano auxiliar para almacenar información de si se ha finalizado la animación de mover.
var movex = 0; //Variable auxiliar para almacenar la x destino al moverse.
var movey = 0; //Variable auxiliar para almacenar la y destino al moverse.

var p = new Partida(njug); //Instancia de la partida.


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
		var nombreSprite = new Array("S_Beth", "S_Jerry", "S_Meeseek1", "S_Meeseek2", "S_Morty", "S_MrP", "S_Rick", "S_Summer");

		var dirSprite = new Array("Material/Sprites/beth.png", "Material/Sprites/jerry.png", "Material/Sprites/meeseek1.png",
								  "Material/Sprites/meeseek2.png", "Material/Sprites/morty.png", "Material/Sprites/mrp.png", "Material/Sprites/rick.png",
								  "Material/Sprites/summer.png");


	//Precargamos los assets.
	game.load.image('Logo', 'Material/Img/Otros/Logo.png');
	game.load.image('Map1','Material/Img/Mapas/Map 1 - Bounds.png');
	game.load.image("Map2","Material/Img/Mapas/Map 2 - Bounds.png");
	game.load.image("Pickle","Material/Img/Otros/Pickle.png");
	game.load.image("Traitor","Material/Img/Otros/Traitor.png");
	game.load.image("Box","Material/Img/Otros/Box.png");
	game.load.image("AS","Material/Sprites/as.png");

	game.load.images(nombreP,dirP);
	game.load.images(nombreC,dirC);
	
	for (var i=0; i<8; i++)
	{
		game.load.spritesheet(nombreSprite[i], dirSprite[i], 57, 72.5, 16)
	}
}


function create() //Función create: inicia el juego.
{
	//Centramos horizontal y verticalmente el canvas de Phaser.
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;

	p.init(); //Inicializamos la partida.
	started = true; //Fijamos el booleano a true al empezar la partida.
	
	//Añadimos los atajos de teclado.
	var keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyA.onDown.add(atacarclick, this);
	var keyM = game.input.keyboard.addKey(Phaser.Keyboard.M);
    keyM.onDown.add(moverclick, this);
    var keyR = game.input.keyboard.addKey(Phaser.Keyboard.R);
    keyR.onDown.add(ruidoclick, this);

	//Creamos los manejadores de eventos.
	document.getElementById("mover").addEventListener("click", moverclick);
	document.getElementById("atacar").addEventListener("click", atacarclick);
	document.getElementById("ruido").addEventListener("click", ruidoclick);
}


function update() //Función update: actualiza el juego.
{
	//(Debug): Capturamos la posición del ratón.
	//var pos = game.input.activePointer.position;
    //console.log("x:" + pos.x + " y:" + pos.y, 180, 200);

	if (started && (!move)) //Si la partida ha empezado y no se está en el modo mover.
	{
		esturno = (p.getJugadores()[0].getAccionesDisp() > 0) //Fijamos el booleano a true si: acciones > 0.
		document.getElementById("Acciones").innerHTML = "Acciones: " + p.getJugadores()[0].getAccionesDisp(); //Mostramos las acciones disponibles.

		if (!esturno && !moving) //Si ha terminado el turno del jugador, turno de la máquina.
		{
			alert("Se acabó el turno del jugador.") //Debug.

			moverEnemigos();
			atacarEnemigo();
			//spawnEnemigo();
			p.getJugadores()[0].setAccionesDisp(4);
			 //Reseteamos las acciones del jugador.
			turno++;
			alert("Se acabó el turno de la máquina. Ronda = " + turno) //Debug.
		}


	}


	//Turno del jugador.
 	updateMover();
}


//////////////////////////////////////// Eventos /////////////////////////////////////////


function moverclick() //Función llamada al pulsar el botón "Mover".
{
	if(!moving) //Si no se está reproduciendo la animación de mover.
	{
	 	if (!move) //Si no se está en el modo mover.
	 	{
			if (esturno) //Si es el turno del jugador (puede realizar sus acciones).
			{	
			 	move = true;	
			}
	 	} 
	 	else //Si se está en el modo mover. 
	 	{
	 		move = false;

	 		var c = p.getMapa().getTablero(); //Guardamos la matriz del tablero.

	 		//Limpiamos el tablero.
	 		for (var i = 0; i < 7; i++)
			{
				for(var j = 0; j < 9; j++)
				{
					if(c[i][j] instanceof Casilla) //Si la posición [i,j] es una casilla.
					{
						c[i][j].setColor(0xFFFFFF); //Color blanco.
						c[i][j].getGraphics().destroy(); //Destruimos los gráficos.
					}
				}
			}
 		}
	}
}


function ruidoclick() //Función llamada al pulsar el botón "Hacer Ruido".
{
	var c = p.getMapa().getTablero(); //Guardamos la matriz del tablero.

	if(!moving) //Si no se está reproduciendo la animación de mover.
	{
		c[p.getJugadores()[0].getCasilla()[0]][p.getJugadores()[0].getCasilla()[1]].setRuido( c[p.getJugadores()[0].getCasilla()[0]][p.getJugadores()[0].getCasilla()[1]].getRuido() + 5);
	 	alert("HAS HECHO RUIDO, QUE ESTOY DURMIENDO");

	 	p.getJugadores()[0].setAccionesDisp(p.getJugadores()[0].getAccionesDisp()-1); //Disminuimos las acciones del jugador en 1.
	}


}



function atacarclick() //Función llamada al pulsar el botón "Atacar".
{
	if(!moving) //Si no se está reproduciendo la animación de mover.
	{
		if(esturno) //Si es el turno del jugador (puede realizar sus acciones).
		{
			for(var i = 0; i < p.getEnemigos().length; i++) //Recorremos el array de enemigos.
			{
				if(p.getEnemigos()[i] != undefined && (p.getEnemigos()[i].getCasilla()[0] == p.getJugadores()[0].getCasilla()[0]) 
				&& (p.getEnemigos()[i].getCasilla()[1] == p.getJugadores()[0].getCasilla()[1])) //Si [i,j] del enemigo son iguales que las del jugador.
				{
					var tirada = Dados(p.getJugadores()[0].getPersonaje().getDados(), 3); //Tiramos los dados (n dados del personaje, 50% acierto).
					p.getEnemigos()[i].setSalud(p.getEnemigos()[i].getSalud() - tirada); //Disminuimos la salud del enemigo en la tirada realizada.

					if(p.getEnemigos()[i].getSalud() <= 0) //Si el enemigo pierde toda su salud.
					{
						p.getEnemigos()[i].getSprite().destroy(); //Eliminamos el sprite.
						p.getEnemigos()[i] = undefined; //Eliminamos el enemigo.
					}

					p.getJugadores()[0].setAccionesDisp(p.getJugadores()[0].getAccionesDisp()-1); //Disminuimos las acciones del jugador en 1.
				}
			}
		}
	}
}

function atacarEnemigo() //Función llamada al pulsar el botón "Atacar".
{

	for(var i = 0; i < p.getEnemigos().length; i++) //Recorremos el array de enemigos.
			{
				if(p.getEnemigos()[i] != undefined && (p.getEnemigos()[i].getCasilla()[0] == p.getJugadores()[0].getCasilla()[0]) 
				&& (p.getEnemigos()[i].getCasilla()[1] == p.getJugadores()[0].getCasilla()[1])) //Si [i,j] del enemigo son iguales que las del jugador.
				{
					var tiradaE = Dados(p.getEnemigos()[i].getDados(), 6); //Tiramos los dados (n dados del personaje, 50% acierto).
					console.log("TiradaE = " + tiradaE);
					
					var tiradaJ = Dados(p.getJugadores()[0].getPersonaje().getDados(),1);
					console.log("TiradaJ = " + tiradaJ);

					p.getJugadores()[0].getPersonaje().setSalud(p.getJugadores()[0].getPersonaje().getSalud() - Math.max(tiradaE-tiradaJ, 0));

					console.log("salud = " + p.getJugadores()[0].getPersonaje().getSalud());

					if(p.getJugadores()[0].getPersonaje().getSalud() <= 0) //Si el enemigo pierde toda su salud.
					{
						p.getJugadores()[0].getPersonaje().getSprite().destroy(); //Eliminamos el sprite.
						alert('Has perdido, parguela.')
					}

				}
			}
}

function spawnEnemigo()
{
	var enemigosN = new Array();
	var numEn = 3 + turno;
	//Switch case del infierno

	for(var i = 0 ; i < numEn; i++)
	{
		enemigosN[i] = new Enemigo(1);

		//var spawnElegido = Math.random() % 4;
		var spawnElegido = getRandom(0 , 3);
		
		if(spawnElegido = 0)
		{
			enemigosN[i].setCasilla(2, 0);

		}
		if(spawnElegido = 1)
		{
			enemigosN[i].setCasilla(4, 0);
		}
		if(spawnElegido = 2)
		{
			enemigosN[i].setCasilla(2, 8);
		}
		if(spawnElegido = 3)
		{
			enemigosN[i].setCasilla(6, 1);
		}

		enemigosN[i].init();

	}

	for(var j=0;j<p.getEnemigos().length;j++)
	{
		if(p.getEnemigos()[i] != undefined)
		enemigosN.push(p.getEnemigos()[i]);
	}

	p.setEnemigos(enemigosN); 
}

////////////////////////////////// Funciones auxiliares //////////////////////////////////


function Dados(num, prob) //Función auxiliar para el lanzamiento aleatorio de dados.
{
	var aciertos = 0;

	for (var i = 0; i < num; i++)
	{
		 var roll = Math.floor(Math.random() * 6) + 1;

		 if (roll <= prob)
		 {
		 	aciertos++;
		 }
	}

	return aciertos;
}

function CasillasAd(base) //Función que recibe un array índice de casilla y devuelve sus adyacentes.
{
	var adyacentes = new Array();
	var c = p.getMapa().getTablero(); //Guardamos la matriz del tablero.

	//Casillas exteriores.
	if (!c[base[0]][base[1]].getInterior())
	{
		//Abajo.
		if(base[0] != 6) //Si no es la última fila.
		{
			if((c[base[0]+1][base[1]] instanceof Casilla) && (!c[base[0]+1][base[1]].getInterior())) //Si la posición del tablero es una casilla exterior.
			{
				adyacentes.push(c[base[0]+1][base[1]]);
			}
		}

		//Arriba.
		if(base[0] != 0) //Si no es la primera fila.
		{
			if((c[base[0]-1][base[1]] instanceof Casilla) && (!c[base[0]-1][base[1]].getInterior())) //Si la posición del tablero es una casilla exterior.
			{
				adyacentes.push(c[base[0]-1][base[1]]);
			}
		}

		//Derecha.
		if(base[1] != 8 && (c[base[0]][base[[1]]] != c[2][5])) //Si no es la última columna, ni la excepción [2, 5].
		{
			if((c[base[0]][base[1]+1] instanceof Casilla) && (!c[base[0]][base[1]+1].getInterior())) //Si la posición del tablero es una casilla exterior.
			{
				adyacentes.push(c[base[0]][base[1]+1]);
			}
		}

		//Izquierda.
		if(base[1] != 0 && (c[base[0]][base[[1]]] != c[2][6])) //Si no es la primera columna, ni la excepción [2, 6].
		{
			if((c[base[0]][base[1]-1] instanceof Casilla) && (!c[base[0]][base[1]-1].getInterior())) //Si la posición del tablero es una casilla exterior.
			{
				adyacentes.push(c[base[0]][base[1]-1]);
			}
		}
	}


	//Casillas interiores.

	switch (c[base[0]][base[[1]]])
	{
		case c[1][4]:
		adyacentes.push(c[1][3]);
		adyacentes.push(c[1][5]);
		break;

		case c[1][3]:
		adyacentes.push(c[1][4]);
		adyacentes.push(c[1][2]);
		break;

		case c[1][2]:
		adyacentes.push(c[2][2]);
		adyacentes.push(c[1][3]);
		break;

		case c[1][5]:
		adyacentes.push(c[1][4]);
		adyacentes.push(c[1][6]);
		break;

		case c[1][6]:
		adyacentes.push(c[1][5]);
		break;

		case c[2][2]:
		adyacentes.push(c[1][2]);
		break;

		case c[2][6]:
		adyacentes.push(c[4][7]);
		break;

		case c[2][7]:
		adyacentes.push(c[4][7]);
		break;

		case c[2][8]:
		adyacentes.push(c[4][7]);
		break;

		case c[3][1]:
		adyacentes.push(c[3][2]);
		break;

		case c[3][2]:
		adyacentes.push(c[3][1]);
		adyacentes.push(c[3][3]);
		break;

		case c[3][3]:
		adyacentes.push(c[3][2]);
		adyacentes.push(c[3][5]);
		break;

		case c[3][5]:
		adyacentes.push(c[3][6]);
		adyacentes.push(c[3][3]);
		break;

		case c[3][6]:
		adyacentes.push(c[3][5]);
		adyacentes.push(c[4][7]);
		break;

		case c[4][1]:
		adyacentes.push(c[5][1]);
		break;

		case c[4][3]:
		adyacentes.push(c[5][3]);
		break;

		case c[4][6]:
		adyacentes.push(c[5][6]);
		adyacentes.push(c[4][7]);
		break;

		case c[5][1]:
		adyacentes.push(c[4][1]);
		break;

		case c[5][3]:
		adyacentes.push(c[4][3]);
		adyacentes.push(c[5][6]);
		break;

		case c[5][6]:
		adyacentes.push(c[4][6]);
		adyacentes.push(c[5][3]);
		adyacentes.push(c[5][7]);
		break;

		case c[5][7]:
		adyacentes.push(c[5][6]);
		adyacentes.push(c[4][7]);
		break;
	}


	return adyacentes;
}

function getRandom(min, max) //Esta función recibe un máximo y un mínimo y devuelve un número aleatorio entre ambos.
{
 if (min == 0) //Ejemplo: para 1 y 9, se generarían todos los números, pero para 0 y 9, sólo hasta el 8, así que modificamos a 0 y 10.
  max += 1;

 return Math.floor((Math.random() * max) + min);
}



function updateMover() //Función expansión de update para el modo mover.
{
	var c = p.getMapa().getTablero(); //Guardamos la matriz del tablero.

	if (move) //Si se está en el modo mover.
	{
		var adyacentes = CasillasAd(p.getJugadores()[0].getCasilla()); //Guardamos las casillas adyacentes.

		for(var i = 0; i < adyacentes.length; i++) //Pintamos las casillas adyacentes de rojo.
		{
			adyacentes[i].getGraphics().destroy(); //Limpiamos la casilla.
			
			if(adyacentes[i] != (c[4][7]))
			{
				adyacentes[i].pintRect(0xff0000,0.3); //Pintamos de rojo la casilla.
			}
			else
			{
				adyacentes[i].pintRect(0x00ff00,0.3); //Pintamos de verde la casilla.
			}
		}

 		//Movimiento.
		if((game.input.activePointer.isDown)) //Si se pulsa el ratón.
	 	{
 			for (var i = 0; i < 7; i++)
			{
				for(var j = 0; j < 9; j++)
				{
					if(c[i][j] instanceof Casilla) //Si la posición del tablero es una casilla.
					{
						var rect = c[i][j].getRect(); //Guardamos el rectángulo de la casilla.

						if(Phaser.Rectangle.contains(rect,game.input.x,game.input.y) && (c[i][j].getColor() == 0xff0000 || c[i][j].getColor() == 0x00ff00)) //Si el ratón está encima del rectángulo y es rojo o verde.
						{

   							evadir();
   							c[p.getJugadores()[0].getCasilla()[0]][p.getJugadores()[0].getCasilla()[1]].setPersonajes(c[p.getJugadores()[0].getCasilla()[0]][p.getJugadores()[0].getCasilla()[1]].getPersonajes()-1);
							p.getJugadores()[0].setCasilla(i,j); //Fijamos la casilla del jugador a la nueva.
							c[i][j].setPersonajes(c[i][j].getPersonajes()+1);
							
							//Calculamos las coordenadas de destino de la casilla nueva como la posición de ésta mas la mitad del sprite (para centrarlo).
							movex = Math.round(c[i][j].getPos()[0]-28.5);
							movey = Math.round(c[i][j].getPos()[1]-36.25);

   							moving = true; //Fijamos a true el booleano de animación de movimiento.

							p.getJugadores()[0].setAccionesDisp(p.getJugadores()[0].getAccionesDisp() - 1); //Disminuimos las acciones del jugador.
						}
					}
				}
			}

			move = false;

			//Limpiamos el tablero.
			for (var i = 0; i < 7; i++)
			{
				for(var j = 0; j < 9; j++)
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

	if (game.input.x !=0 || game.input.y != 0) //Si el ratón no se ha pasado por el canvas.
	{
		//Iluminación del cursor.
	 	for (var i = 0; i < 7; i++)
		{
			for(var j = 0; j < 9; j++)
			{
				if(c[i][j] instanceof Casilla)
				{
					var rect = c[i][j].getRect();

					if (c[i][j].getColor() != 0xff0000 && c[i][j].getColor() != 0x00ff00) //Si el color no es rojo ni verde.
					{
						c[i][j].getGraphics().destroy(); //Destruimos el color.
					}
							
					if(Phaser.Rectangle.contains(rect,game.input.x,game.input.y)) //Si el rectángulo está debajo del cursor.
					{
						if (c[i][j].getColor() != 0xff0000 && c[i][j].getColor() != 0x00ff00) //Si el color no es rojo ni verde.
						{
							c[i][j].pintRect(0xFFFFFF,0.6); //Pintamos de blanco.
						}
						else if (c[i][j].getColor() == 0xff0000)
						{
							c[i][j].getGraphics().destroy();
							c[i][j].pintRect(0xff0000,0.8); //Pintamos de rojo oscuro.
						}
						else if (c[i][j].getColor() == 0x00ff00)
						{
							c[i][j].getGraphics().destroy();
							c[i][j].pintRect(0x00ff00,0.8);
						}
					} 
				}
			}
		}
	}

	if (moving) //Si se está moviendo con animación.
	{
		if (movey != p.getJugadores()[0].getPersonaje().getSprite().y) //Distintas en el eje y.
		{
			if (movey > p.getJugadores()[0].getPersonaje().getSprite().y) //El destino está abajo.
			{
				p.getJugadores()[0].getPersonaje().getSprite().y += 1;
				p.getJugadores()[0].getPersonaje().getSprite().animations.play('down', 12, true);
			}
			else if (movey < p.getJugadores()[0].getPersonaje().getSprite().y) //El destino está arriba.
			{
				p.getJugadores()[0].getPersonaje().getSprite().y -= 1;
				p.getJugadores()[0].getPersonaje().getSprite().animations.play('up', 12, true);
			}
		}
		else //Iguales en el eje y.
		{
			if (movex != p.getJugadores()[0].getPersonaje().getSprite().x) //Distintas en el eje x.
			{
				if (movex > p.getJugadores()[0].getPersonaje().getSprite().x) //El destino está a la derecha.
				{
					p.getJugadores()[0].getPersonaje().getSprite().x += 1;
					p.getJugadores()[0].getPersonaje().getSprite().animations.play('right', 12, true);
				}
				else if (movex < p.getJugadores()[0].getPersonaje().getSprite().x) //El destino está a la izquierda.
				{
					p.getJugadores()[0].getPersonaje().getSprite().x -= 1;
					p.getJugadores()[0].getPersonaje().getSprite().animations.play('left', 12, true);
				}
			}
		}

		if (movex == p.getJugadores()[0].getPersonaje().getSprite().x && movey == p.getJugadores()[0].getPersonaje().getSprite().y) //Iguales en el eje x y en el eje y.
		{
			//Reseteamos.
			movex = 0;
			movey = 0;
			moving = false;

			//Paramos las animaciones.
			p.getJugadores()[0].getPersonaje().getSprite().animations.stop();
			p.getJugadores()[0].getPersonaje().getSprite().frame = 0;
		}
	}
}


function moverEnemigos() //Función que mueve los enemigos del tablero.
{
 var e = p.getEnemigos(); //Guardamos los enemigos de la partida.
 var c = p.getMapa().getTablero(); //Guardamos la matriz del tablero.

 for(var i = 0; i < e.length; i++) //Por cada enemigo.
 {
  //Atacar a los jugadores.


  if ((c[e[i].getCasilla()[0]][e[i].getCasilla()[1]].getPersonajes() == 0))//&& (e[i].getTipo() != 3)) //No hay un personaje en la casilla en la que está el enemigo (se mueve), a no ser que sea un boss.
  {
   var adyacentes = CasillasAd(e[i].getCasilla()); //Guardamos las casillas adyacentes.
   
   //Ordenamos el array en función del ruido, de mayor a menor.
   var res;
   var t;
   do 
      {
          res = false;
          for (var j = 0; j < adyacentes .length - 1; j++) 
          {
              if (adyacentes[j].getRuido() < adyacentes[j+1].getRuido()) 
              {
                  var t = adyacentes[j];
                  adyacentes[j] = adyacentes [j+1];
                  adyacentes[j+1] = t;
                  res = true;
              }
          }
      } 
      while (res);


	


	if(adyacentes[0].getRuido() > 0) //Hay ruido en la casilla, movemos a esa casilla.
	   {
	     t = adyacentes[0];
	   }
   else //No hay ruido en la casilla, movemos a una casilla aleatoria.
	  {
	   do {
	     t = adyacentes[getRandom(0, adyacentes.length-1)];
	   } while (t == c[4][7])
	  }


    for (var u = 0; u < 7; u++)
    {
     for(var v = 0; v < 9; v++)
     {
      if(c[u][v] instanceof Casilla && c[u][v] == t) //Si la posición del tablero es una casilla, y es la misma que la buscada.
      {
        e[i].setCasilla(u, v); //Movemos a la casilla [i,j].
        e[i].getSprite().x = c[u][v].getPos()[0] - 28.5;
        e[i].getSprite().y = c[u][v].getPos()[1] - 36.25;
      }

      if(c[u][v] instanceof Casilla)
  	    c[u][v].setRuido(0);

     }
    }



  }
 }
}





function evadir() 
{
	for(var i = 0; i<p.getEnemigos().length; i++){
		if((p.getEnemigos()[i].getCasilla()[0] == p.getJugadores()[0].getCasilla()[0]) && (p.getEnemigos()[i].getCasilla()[1] == p.getJugadores()[0].getCasilla()[1])){
			if (Dados(1,2) != 1){


				p.getJugadores()[0].getPersonaje().setSalud(p.getJugadores()[0].getPersonaje().getSalud() - 1);

					console.log("salud = " + p.getJugadores()[0].getPersonaje().getSalud());

					if(p.getJugadores()[0].getPersonaje().getSalud() <= 0) //Si el enemigo pierde toda su salud.
					{
						p.getJugadores()[0].getPersonaje().getSprite().destroy(); //Eliminamos el sprite.
						alert('Has perdido, parguela.')
					}



			}



		}


	}

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
		//Creamos los jugadores.
		for(var i = 0; i < njug; i++)
		{
			jugadores[i] = new Jugador();
		}

		//Creamos el mapa.
		mapa = new Mapa(1);
		mapa.init(); //Inicializamos el mapa.

		//Creamos los enemigos inciales.
		for (var i = 0; i < 1; i++)
		{
			enemigos[i] = new Enemigo(1);
		}

		enemigos[0].setCasilla(2, 4);
		enemigos[0].init();

		//Seleccionamos los personajes.
		jugadores[0].setPersonaje(new Personaje("Rick"));

		for(var i = 0; i < njug; i++)
		{
			jugadores[0].getPersonaje().init();
		}
	}

	//Getters.
	this.getJugadores = function()
	{
		return jugadores;
	}

	this.getEnemigos = function()
	{
		return enemigos;
	}

	this.getMapa = function()
	{
		return mapa;
	}
	this.setEnemigos = function(i)
	{
		enemigos = i;
	}
}


function Jugador() //Objeto Jugador.
{
	//Variables.
	var traidor; //Booleano de si es traidor o no.
	var personaje; //Personaje del jugador.
	var accionesDisp = 4; //Acciones disponibles del jugador.
	var casilla = [0,4]; //Índice i y j de la casilla en que está.

	//Getters.	
	this.getPersonaje = function()
	{
		return personaje;
	} 

	this.getAccionesDisp = function()
	{
		return accionesDisp;
	}

	this.getCasilla = function()
	{
		return casilla;
	}

	//Setters.
	this.setPersonaje = function(p)
	{
		personaje = p;
	} 

	this.setAccionesDisp = function(a)
	{
		accionesDisp = a;
	}

	this.setCasilla = function(i, j)
	{
		casilla = [i,j];
	}
}


function Personaje(nom) //Objeto Personaje.
{
	//Variables.
	var id = nom; //ID del personaje.
	var salud = 3; //Salud del personaje.
	var dados; //Dados del personaje.
	var sprite; //Sprite del personaje.
	var inventario = new Array(3); //Inventario de objetos del personaje.

	//Funciones.
	this.init = function() //Función que inicializa el personaje.
	{
		//Inicializamos los datos del personaje determinado.
		switch (id)
		{
			case 'Rick':
			dados = 4;
			sprite = game.add.sprite(472, 0, 'S_Rick');
			break;

			case 'Morty':
			dados = 2;
			sprite = game.add.sprite(472, 0, 'S_Morty');
			break;

			case 'Summer':
			dados = 3;
			sprite = game.add.sprite(472, 0, 'S_Summer');
			break;

			case 'Beth':
			dados = 2;
			sprite = game.add.sprite(472, 0, 'S_Beth');
			break;

			case 'Jerry':
			dados = 1;
			sprite = game.add.sprite(472, 0, 'S_Jerry');
			break;

			case 'MrP':
			dados = 3;
			sprite = game.add.sprite(472, 0, 'S_MrP');
			break;
		}

		//Añadimos las animacones.
		p.getJugadores()[0].getPersonaje().getSprite().animations.add('down', [0,1,2,3]);
		p.getJugadores()[0].getPersonaje().getSprite().animations.add('left', [4,5,6,7]);
		p.getJugadores()[0].getPersonaje().getSprite().animations.add('right', [8,9,10,11]);
		p.getJugadores()[0].getPersonaje().getSprite().animations.add('up', [12,13,14,15]);

        sprite.frame = 0;
	}

	//Getters.
	this.getSalud = function()
	{
		return salud;
	}

	this.getDados = function()
	{
		return dados;
	}

	this.getSprite = function()
	{
		return sprite;
	}

	//Setters.
	this.setSalud = function(s)
	{
		salud = s;
	}
}


function Enemigo(tip) //Objeto Enemigo.
{
	//Variables.
	var tipo = tip; //Tipo de enemigo (1-Normal, 2-MiniBoss, 3-Boss).
	var salud; //Salud del enemigo.
	var dados; //Dados del enemigo.
	var sprite; //Sprite del enemigo.
	var casilla = new Array(); //Índice i y j de la casilla en que está.

	//Funciones.
	this.init = function() //Función que inicializa el enemigo.
	{
		if (tipo == 1) //Enemigo normal.
		{
			salud = 3;
			dados = 1;
			sprite = game.add.sprite(475, 200, 'S_Meeseek1');
			sprite.frame = 0;
		}
		else if (tipo == 2) //MiniBoss.
		{
			salud = 5;
			dados = 3;
			sprite = game.add.sprite(475, 200, 'S_Meeseek2');
			sprite.frame = 0;
		}
		else if (tipo == 3) //Boss.
		{
			salud = 8;
			dados = 5;
			sprite = game.add.sprite(475, 200, 'AS');
		}
	}

	//Getters.
	this.getCasilla = function()
	{
		return casilla;
	}

	this.getSalud = function()
	{
		return salud;
	}

	this.getSprite = function()
	{
		return sprite;
	}

	this.getDados = function()
	{
		return dados;
	}

	this.getTipo = function()
	{
	  return tipo;
	}	

	//Setters.
	this.setCasilla = function(i,j)
	{
		casilla = [i,j];
	}

	this.setSalud = function(s)
	{
		salud = s;
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
		fondo = game.add.sprite(0,0,'Map1'); //Creamos el fondo.

		for(var i = 0; i < 7; i++) //Creamos un tablero de 7x9.
		{
			Tablero[i] = new Array (9);
		}

		this.fillTab(); //Rellenamos el tablero.
	}

	this.fillTab = function() //Función que rellena el tablero con objetos casilla, según el mapa.
	{
		//Rellenamos el tablero como undefined, inicialmente.
		for (var i = 0; i < 7; i++)
		{
			for(var j = 0; j < 9; j++)
			{
				Tablero[i][j] = undefined;
			}
		}

		//Casilla objetivo.
		Tablero[4][7] = new Casilla(true,825,325,175,175);

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
	
	//Getters.
	this.getTablero = function()
	{
		return Tablero;
	}
}


function Casilla(inter, x, y, ancho, alto) //Objeto Casilla.
{
	//Variables.
	var ruido = 0; //Ruido de la casilla.
	var numPersonajes = 0; //Personajes en la casilla.
	var numEnemigos = 0; //Enemigos en la casilla.
	var interior = inter; //Booleano sobre si la casilla es interior o no.
	var colorCasilla; //Color de la casilla.
	var rectan = new Phaser.Rectangle(x,y,ancho,alto); //Rectángulo visual de la casilla.
	var graphics = game.add.graphics(); //Variable para dibujar gráficos de la casilla.

	//Funciones.
	this.pintRect = function(color, al) //Función que pinta el rectángulo.
	{		
		colorCasilla = color;

		graphics = game.add.graphics();
		graphics.alpha = al;
		graphics.beginFill(colorCasilla);
		graphics.drawRect(x, y, ancho, alto);
	}

	//Getters.
	this.getRect = function()
	{
		return rectan;
	}

	this.getPos = function()
	{
		return [rectan.x+(ancho/2), rectan.y+(alto/2)];
	}

	this.getColor = function()
	{
		return colorCasilla;
	}

	this.getGraphics = function()
	{
		return graphics;
	}

	this.getEnemigos = function()
	{
		return numEnemigos;
	}

	this.getInterior = function()
	{
		return interior;
	}

	this.getPersonajes = function()
	{
	 return numPersonajes;
	}

	this.getRuido = function()
	 {
	  return ruido;
	 }

	//Setters.
	this.setColor = function(col)
	{
		colorCasilla = col;
	}

	this.setEnemigos = function(ne)
	{
		numEnemigos = ne;
	}

	this.setRuido = function(ru)
	{
	  ruido = ru;
	}

	this.setPersonajes = function(per)
	{
		numPersonajes = per;
	}



}


function Objeto() //Objeto objeto.
{
	//Variables.

	//Funciones.
}

