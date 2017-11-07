/*
Código JavaScript - Guillermo Amigó Urda, Alejandro Camuñas Casas y Sergio García Aloguín.
Práctica final de Juegos en Red.
Grado en Diseño y Desarrollo de Videojuegos.
*/


/////////////////////////////////// Variables globales ///////////////////////////////////


var game; //Creación del juego en Phaser.

//Sonidos.
var music;
var S_Rick_spawn;
var S_Rick_daño;
var S_Rick_turno;
var S_Meeseek_spawn1;
var S_Meeseek_spawn2;
var S_Meeseek_move;
var S_IA_furia;
var S_IA_RoundStart;
var S_lose;
var S_ruido;
var S_punch;
var S_win;
var S_main;

var njug; //Número de jugadores de la partida.
var turno; //Variable que almacena el turno actual.
var started; //Booleano de si ha empezado la partida.
var esturno; //Booleano auxiliar para almacenar información del turno del jugador.
var con; //Booleano auxiliar para indicar si se debe pulsar el botón de continuar.
var fin; //Booleano auxiliar para indicar que se ha acabado la partida.
var mouseoff; //Booleano auxiliar para indicar si el ratón está en el canvas.
var aux; //Booleano auxiliar para diversas funciones.

var move; //Booleano auxiliar para almacenar información de si el modo mover está activo.
var moving; //Booleano auxiliar para almacenar información de si se ha finalizado la animación de mover.
var movinge; //Booleano auxiliar para almacenar información de la animación de mover enemiga.
var moveonce; //Booleano auxiliar para almacenar información de si los enemigos se han movido este turno.
var movex; //Variable auxiliar para almacenar la x destino al moverse.
var movey; //Variable auxiliar para almacenar la y destino al moverse.

var p; //Instancia de la partida.


///////////////////////////////////////// Main ///////////////////////////////////////////


$(document).ready(function() //Función inicial.
{ 
	//Inicializamos las variables.
	mute = false;
	njug = 1;
	turno = 0;
	started = false;
	esturno = false;
	con = false;
	fin = false;
	move = false;
	moving = false;
	movex = 0;
	movey = 0;

	//Ocultamos los elementos adecuados.
	$("#logo").show();
	$("#Misc").show();
	$("#Borderframe").hide();
	$("#Notificaciones").hide();
	$("#Barra").hide();
})


$(window).keypress(function (e)  //Función que detecta si se pulsa espacio para iniciar el juego.
{
	if (turno == 0 && (e.keyCode === 0 || e.keyCode === 32)) 
	{
	    e.preventDefault();

	    //Mostramos los elementos adecuados.
	    $("#logo").hide();
	    $("#Misc").hide();
	    $("#Borderframe").show();
	    $("#Notificaciones").show();
	    $("#Barra").show();

	    turno++;
	    game = new Phaser.Game(1000, 750, Phaser.CANVAS, 'phaser', { preload: preload, create: create, update: update }); //Creamos el juego.
	}
})


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


		/*
		//Nombres y directorios de los sonidos.
 		var nombreSonido = new Array("S_Rick_spawn","S_Rick_daño","S_Rick_turno","S_Meeseek_spawn1","S_Meeseek_spawn2","S_Meeseek_move","S_IA_furia","S_IA_RoundStart","S_lose","S_ruido","S_punch","S_win","S_main");

  		var dirSonido = new Array("Material/Sound/Rick/S_spawn.mp3","Material/Sound/Rick/S_daño.mp3","Material/Sound/Rick/S_turno.mp3",
         						  "Material/Sound/Meeseek/S_spawn1.mp3","Material/Sound/Meeseek/S_spawn2.mp3","Material/Sound/Meeseek/S_move.mp3",
         						  "Material/Sound/Extra/S_IA_furia.mp3","Material/Sound/Extra/S_IA_RoundStart.mp3","Material/Sound/Extra/S_lose.mp3",
         						  "Material/Sound/Extra/S_ruido.mp3","Material/Sound/Extra/S_punch.mp3","Material/Sound/Extra/S_win.mp3","Material/Sound/Music/S_main.mp3");
  		*/


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
	
	for (var i = 0; i < 8; i++)
	{
		game.load.spritesheet(nombreSprite[i], dirSprite[i], 57, 72.5, 16)
	}

	/*
	for (var i = 0; i < 13; i++)
	{
		game.load.audio(nombreSonido[i], dirSonido[i]);
	}
	*/
}


function create() //Función create: inicia el juego.
{
	//Centramos horizontal y verticalmente el canvas de Phaser.
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;

	p = new Partida(njug); //Creamos la partida.
	p.init(); //Inicializamos la partida.
	
	document.getElementById("Consoletext").innerHTML += "¡Bienvenido a <em>Rick and Morty: Hide and Meeseek!</em> <br /><br /> Objetivo: llegar al helipuerto (Exit), sin palmarla por el camino." + 
	" Para ello, dispones de diversas acciones: <br /><br /> - Atacar: lanzar los dados de tu personaje para atacar a un enemigo de tu misma casilla. <br /> - Mover: moverse a una casilla adyacente (si hay algún enemigo en tu casilla, tirarás un dado para evadirlo)." + 
	" <br /> - Hacer ruido: hacer ruido en una casilla para atraer a los enemigos de casillas adyacentes. <br /><br /> ¡Mucha Suerte! <br /><br /><br /> ----------------------------- <br /><br /><br /> Pulse 'Continuar' para comenzar la partida.";
	

	//Música y sonidos.
	music = new sound("Material/Sound/Music/S_main.mp3");
	S_Rick_spawn = new sound("Material/Sound/Rick/S_spawn.mp3");
 	S_Rick_daño = new sound("Material/Sound/Rick/S_daño.mp3");
 	S_Rick_turno = new sound("Material/Sound/Rick/S_turno.mp3");
 	S_Meeseek_spawn1 = new sound("Material/Sound/Meeseek/S_spawn1.mp3");
 	S_Meeseek_spawn2 = new sound("Material/Sound/Meeseek/S_spawn2.mp3");
 	S_Meeseek_move = new sound("Material/Sound/Meeseek/S_move.mp3");
 	S_IA_furia = new sound("Material/Sound/Extra/S_IA_furia.mp3");
 	S_IA_RoundStart = new sound("Material/Sound/Extra/S_IA_RoundStart.mp3");
 	S_lose = new sound("Material/Sound/Extra/S_lose.mp3");
 	S_ruido = new sound("Material/Sound/Extra/S_ruido.mp3");
 	S_punch = new sound("Material/Sound/Extra/S_punch.mp3");
 	S_win = new sound("Material/Sound/Extra/S_win.mp3");
 	S_main = new sound("Material/Sound/Music/S_main.mp3");

 	music.loop();
 	music.volume = 0.25;
 	music.play();
 
 	S_Rick_spawn.play();


	//Añadimos los atajos de teclado.
	var keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyA.onDown.add(atacarclick, this);
	var keyM = game.input.keyboard.addKey(Phaser.Keyboard.M);
    keyM.onDown.add(moverclick, this);
    var keyR = game.input.keyboard.addKey(Phaser.Keyboard.R);
    keyR.onDown.add(ruidoclick, this);
    var keySPACEBAR = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    keySPACEBAR.onDown.add(conti, this);


	//Creamos los manejadores de eventos.
	document.getElementById("atacar").addEventListener("click", atacarclick);
	document.getElementById("mover").addEventListener("click", moverclick);
	document.getElementById("ruido").addEventListener("click", ruidoclick);
	document.getElementById("continuar").addEventListener("click", conti);
	document.getElementById("phaser").addEventListener("mouseout", function(){ mouseoff = true; });
	document.getElementById("phaser").addEventListener("mouseover", function(){ mouseoff = false; });
}


function update() //Función update: actualiza el juego.
{
	if (p.getJugadores()[0].getPersonaje().getSalud() <= 0) //Si el personaje ha muerto (perder).
	{
		con = false;
		p.getJugadores()[0].getPersonaje().getSprite().destroy(); //Eliminamos el sprite.
		document.getElementById("Consoletext").innerHTML += "<br /><br /> ¡Game Over! ¡Hora de cambiar de dimensión!";
		S_lose.play();
		gameReset();
	} 
	else
	{
		if(!moving && (p.getJugadores()[0].getCasilla()[0] == 4) && (p.getJugadores()[0].getCasilla()[1] == 7)) //Si el jugador está en la casilla meta (ganar).
	 	{
	 		con = false;
	 		document.getElementById("Consoletext").innerHTML = "¡Has ganado! ¡Wubba Dubba lub lub!";
	 		S_win.play();
	 		gameReset();
	 	}
	 	else
	 	{
		 	if (started && !move && con) //Si la partida ha empezado y no se está en el modo mover.
			{
				esturno = (p.getJugadores()[0].getAccionesDisp() > 0) //Fijamos el booleano a true si: acciones > 0.
				document.getElementById("Acciones").innerHTML = "(Turno: " + turno + ")" + " - Acciones disponibles: " + p.getJugadores()[0].getAccionesDisp(); //Mostramos las acciones disponibles.

				if (!esturno && !moving && !movinge) //Si ha terminado el turno del jugador.
				{
					if(!aux) //Utilizamos el booleano auxiliar para realizar este fragmento de código una sola vez al principio del turno enemigo.
					{
						document.getElementById("Consoletext").innerHTML += "<br /><br /> Fin del turno de los jugadores. ¡Turno de los enemigos! (Continuar)";
						aux = true;
						con = false;
						started = false;
					}

					if(con) //Si se ha pulsado el botón de confirmar.
					{
						document.getElementById("Consoletext").innerHTML = "Turno de los enemigos:";

						var count = 0; //Contamos el número de enemigos en juego.

						for(var i = 0; i < p.getEnemigos().length; i++)
						{
							if(p.getEnemigos()[i] instanceof Enemigo)
							{
								count++;
							}
						}

						if (!moveonce) //Si no se han movido aún.
						{
							S_IA_RoundStart.play();
							moverEnemigos(); //Movemos a los enemigos.
							moveonce = true;
						}
					
						if(!movinge) //Si no se están moviendo.
						{
							atacarEnemigo(); //Los enemigos atacan.

							if (count >= 15) //Si hay 15 o más enemigos en juego, máximo alcanzable, se vuelven a activar.
							{
								document.getElementById("Consoletext").innerHTML += "<br /><br /> ¡Oh, oh! ¡Demasiados Meeseeks! ¡Vuelven a activar su turno muy mosqueados!";
								S_IA_furia.play();
								moverEnemigos(); //Movemos a los enemigos.
								atacarEnemigo(); //Los enemigos atacan.
							}
							else
							{
								if (getRandom(0, 3) != 0) //Hay un 75% de que aparezca un enemigo.
								{
									spawnEnemigo();
								}
							}

							p.getJugadores()[0].setAccionesDisp(4); //Reseteamos las acciones del jugador.

							turno++; //Incrementamos el turno.

							//Reseteamos el booleano auxiliar y preparamos que se pulse el botón de confirmar.
							aux = false;
							moveonce = false;
							con = false;
							started = false;
									
							if (p.getJugadores()[0].getPersonaje().getSalud() > 0) //Si el personaje no ha muerto.
							{
								document.getElementById("Consoletext").innerHTML += "<br /><br /> Fin del turno de los enemigos. ¡Turno de los jugadores! (Continuar)";
							}	
						}
					}
				}
			}

			moverAnimE();
			updateMover();
		}
    }
}


//////////////////////////////////////// Eventos /////////////////////////////////////////


function atacarclick() //Función llamada al pulsar el botón "Atacar".
{
	if(!move && !moving && started) //Si no se está reproduciendo la animación de mover.
	{
		if(esturno) //Si es el turno del jugador (puede realizar sus acciones).
		{
			for(var i = 0; i < p.getEnemigos().length; i++) //Recorremos el array de enemigos.
			{
				if(p.getEnemigos()[i] != undefined && (p.getEnemigos()[i].getCasilla()[0] == p.getJugadores()[0].getCasilla()[0]) && (p.getEnemigos()[i].getCasilla()[1] == p.getJugadores()[0].getCasilla()[1])) //Si el enemigo está en la misma casilla que el jugador.
				{
					var tirada = Dados(p.getJugadores()[0].getPersonaje().getDados(), 3); //Tiramos los dados (n dados del personaje, 50% acierto).
					p.getEnemigos()[i].setSalud(p.getEnemigos()[i].getSalud() - tirada); //Disminuimos la salud del enemigo en la tirada realizada.

					document.getElementById("Consoletext").innerHTML += "<br /><br /> ¡Atacas! Resultado del ataque: <br /> Has lanzado " + p.getJugadores()[0].getPersonaje().getDados() + " dados de ataque, de los cuales han acertado " + tirada + ".";

					S_punch.play();

					if(p.getEnemigos()[i].getSalud() <= 0) //Si el enemigo pierde toda su salud.
					{
						p.getEnemigos()[i].getSprite().destroy(); //Eliminamos el sprite.
						p.getEnemigos()[i] = undefined; //Eliminamos el enemigo.
						i = p.getEnemigos().length; //Salimos del bucle, para no seguir atacando al resto de enemigos.
						document.getElementById("Consoletext").innerHTML += "<br /><br /> ¡Enemigo eliminado!";
					}
					else
					{
						document.getElementById("Consoletext").innerHTML += "<br /><br /> Salud restante del enemigo: " + p.getEnemigos()[i].getSalud() + ".";
					}

					var c = p.getMapa().getTablero(); //Guardamos la matriz del tablero.

					c[p.getJugadores()[0].getCasilla()[0]][p.getJugadores()[0].getCasilla()[1]].setRuido(c[p.getJugadores()[0].getCasilla()[0]][p.getJugadores()[0].getCasilla()[1]].getRuido() + 2); //Aumentamos el ruido de la casilla.
					document.getElementById("Consoletext").innerHTML += "<br /><br /> Se ha generado un poco de ruido en la casilla.";

					p.getJugadores()[0].setAccionesDisp(p.getJugadores()[0].getAccionesDisp() - 1); //Disminuimos las acciones del jugador.
					i = p.getEnemigos().length; //Salimos del bucle.
				}
			}
		}
	}
}


function moverclick() //Función llamada al pulsar el botón "Mover".
{
	if(!moving && started) //Si no se está reproduciendo la animación de mover.
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

	if(!move && !moving && started && esturno) //Si no se está reproduciendo la animación de mover.
	{
		c[p.getJugadores()[0].getCasilla()[0]][p.getJugadores()[0].getCasilla()[1]].setRuido(c[p.getJugadores()[0].getCasilla()[0]][p.getJugadores()[0].getCasilla()[1]].getRuido() + 5); //Aumentamos el ruido de la casilla.
	 	document.getElementById("Consoletext").innerHTML += "<br /><br /> Se ha generado mucho ruido en la casilla.";

	 	S_ruido.play();

	 	p.getJugadores()[0].setAccionesDisp(p.getJugadores()[0].getAccionesDisp() - 1); //Disminuimos las acciones del jugador.
	}
}


function conti() //Función llamada al pulsar el botón "Continuar".
{
	if (!con) //Si hay que continuar.
	{
		if(turno == 1) //Turno inicial.
		{
   			document.getElementById("Consoletext").innerHTML = "¡Comienza la partida!";
  		}
  		else //Otro turno.
  		{
   			esturno = (p.getJugadores()[0].getAccionesDisp() > 0);

   			if(esturno)
   			{
    			S_Rick_turno.play();
   			}

   			document.getElementById("Consoletext").innerHTML = "Turno de los jugadores:";
  		}

  		con = true;
  		started = true; //Fijamos el booleano a true al empezar la partida.
 	}
}


////////////////////////////////// Funciones auxiliares //////////////////////////////////


function getRandom(min, max) //Esta función recibe un máximo y un mínimo y devuelve un número aleatorio entre ambos.
{
 if (min == 0) //Ejemplo: para 1 y 9, se generarían todos los números, pero para 0 y 9, sólo hasta el 8, así que modificamos a 0 y 10.
  max += 1;

 return Math.floor((Math.random() * max) + min);
}


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
	var adyacentes = new Array(); //Array resultado.
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

	//Casillas interiores (excepciones manuales).
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


function gameReset() //Función que resetea el juego.
{
	njug = 1;
	turno = 1;
	started = false;
	esturno = false;
	con = false;
	fin = false;
	move = false;
	moving = false;
	movex = 0;
	movey = 0;

	p = undefined;
	p = new Partida(njug);

	p.init(); //Inicializamos la partida.

	document.getElementById("Consoletext").innerHTML += "<br /><br /> Reseteando el juego..."; 
	document.getElementById("Consoletext").innerHTML += "<br /><br /> Pulse 'Continuar' para comenzar la partida.";
}


function updateMover() //Función expansión de update para el modo mover del jugador.
{
	var c = p.getMapa().getTablero(); //Guardamos la matriz del tablero.

	if (move) //Si se está en el modo mover.
	{
		var adyacentes = CasillasAd(p.getJugadores()[0].getCasilla()); //Guardamos las casillas adyacentes.

		for(var i = 0; i < adyacentes.length; i++) //Pintamos las casillas adyacentes de rojo.
		{
			adyacentes[i].getGraphics().destroy(); //Limpiamos la casilla.
			
			if(adyacentes[i] != (c[4][7])) //Si la casilla no es la meta.
			{
				adyacentes[i].pintRect(0xff0000, 0.3); //Pintamos de rojo la casilla.
			}
			else //Si la casilla es la meta.
			{
				adyacentes[i].pintRect(0x00ff00, 0.3); //Pintamos de verde la casilla.
			}
		}

 		//Movimiento.
		if(game.input.activePointer.isDown) //Si se pulsa el ratón.
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
   							evadir(); //Comprobamos la evasión de enemigos.

   							c[p.getJugadores()[0].getCasilla()[0]][p.getJugadores()[0].getCasilla()[1]].setPersonajes(c[p.getJugadores()[0].getCasilla()[0]][p.getJugadores()[0].getCasilla()[1]].getPersonajes() - 1); //Disminuimos el número de personajes de la casilla.
							p.getJugadores()[0].setCasilla(i,j); //Fijamos la casilla del jugador a la nueva.
							c[i][j].setPersonajes(c[i][j].getPersonajes() + 1); //Aumentamos el número de personajes de la nueva casilla.
							
							//Calculamos las coordenadas de destino de la casilla nueva como la posición de ésta mas la mitad del sprite (para centrarlo).
							movex = Math.round(c[i][j].getPos()[0] - 28.5);
							movey = Math.round(c[i][j].getPos()[1] - 36.25);

   							moving = true; //Fijamos a true el booleano de animación de movimiento.

							p.getJugadores()[0].setAccionesDisp(p.getJugadores()[0].getAccionesDisp() - 1); //Disminuimos las acciones del jugador.
						}
					}
				}
			}

			move = false; //Salimos del modo mover.

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

	if(!mouseoff) //Si el ratón está en el canvas.
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
						c[i][j].getGraphics().destroy(); //Destruimos el rectángulo.
					}
							
					if(Phaser.Rectangle.contains(rect, game.input.x, game.input.y)) //Si el rectángulo está debajo del cursor.
					{
						if (c[i][j].getColor() != 0xff0000 && c[i][j].getColor() != 0x00ff00) //Si el color no es rojo ni verde.
						{
							c[i][j].pintRect(0xFFFFFF,0.6); //Pintamos de blanco.
						}
						else if (c[i][j].getColor() == 0xff0000) //El color es rojo.
						{
							c[i][j].getGraphics().destroy();
							c[i][j].pintRect(0xff0000, 0.8); //Pintamos de rojo oscuro.
						}
						else if (c[i][j].getColor() == 0x00ff00) //El color es verde.
						{
							c[i][j].getGraphics().destroy();
							c[i][j].pintRect(0x00ff00, 0.8); //Pintamos de verde oscuro.
						}
					} 
				}
			}
		}
	}
	else //Si el ratón no está en el canvas.
	{
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
			moving = false;

			//Paramos las animaciones.
			p.getJugadores()[0].getPersonaje().getSprite().animations.stop();
			p.getJugadores()[0].getPersonaje().getSprite().frame = 0;
		}
	}
}


function evadir() //Función de evadir enemigos al moverse.
{
	for(var i = 0; i < p.getEnemigos().length; i++) //Recorremos el array de enemigos.
	{
		if(p.getEnemigos()[i] != undefined && (p.getEnemigos()[i].getCasilla()[0] == p.getJugadores()[0].getCasilla()[0]) && (p.getEnemigos()[i].getCasilla()[1] == p.getJugadores()[0].getCasilla()[1])) //Si el enemigo está en la misma casilla que el jugador.
		{
			var tiradaJ = Dados(1, 2); //Lanzamos los dados.

			document.getElementById("Consoletext").innerHTML += "<br /><br /> Lanzas un dado para evadir al enemigo de tu casilla. Éxitos: " + tiradaJ + ".";

			if (tiradaJ != 1) //Lanzamos un dado con poca posibilidad de éxito.
			{
				p.getJugadores()[0].getPersonaje().setSalud(p.getJugadores()[0].getPersonaje().getSalud() - 1); //Disminuimos la salud del jugador.

				document.getElementById("Consoletext").innerHTML += "<br /><br /> Has fallado la evasión, recibes una herida. Tu salud resultante es: " +  p.getJugadores()[0].getPersonaje().getSalud() + ".";
				S_Rick_daño.play();
			}
			else
			{
				document.getElementById("Consoletext").innerHTML += "<br /><br /> ¡Evadido con éxito!";
			}
		}
	}
}


function atacarEnemigo() //Función de ataque de un enemigo.
{
	if (!movinge) //No se está moviendo.
	{
  		for(var i = 0; i < p.getEnemigos().length; i++) //Recorremos el array de enemigos.
  		{
   			if(p.getEnemigos()[i] != undefined && (p.getEnemigos()[i].getCasilla()[0] == p.getJugadores()[0].getCasilla()[0]) && (p.getEnemigos()[i].getCasilla()[1] == p.getJugadores()[0].getCasilla()[1])) //Si la casilla del enemigo es la misma que la del jugador.
   			{
    			var tiradaE = Dados(p.getEnemigos()[i].getDados(), 6); //Tiramos los dados enemigos (n dados del personaje, 50% acierto).
    			var tiradaJ = Dados(p.getJugadores()[0].getPersonaje().getDados(), 1); //Tiramos los dados del jugador.

    			var saludAnt = p.getJugadores()[0].getPersonaje().getSalud();

    			p.getJugadores()[0].getPersonaje().setSalud(p.getJugadores()[0].getPersonaje().getSalud() - Math.max(tiradaE - tiradaJ, 0)); //Disminuimos la salud del jugador, contrarrestando la tirada enemiga con la defensa.

    			if(p.getJugadores()[0].getPersonaje().getSalud() < saludAnt)
    			{
     				S_Rick_daño.play();
    			}

    			document.getElementById("Consoletext").innerHTML += "<br /><br /> ¡Te atacan! Resultado de la defensa: <br /> Has lanzado " + p.getJugadores()[0].getPersonaje().getDados() + " dados de defensa, de los cuales han acertado " + tiradaJ
    			+ ". <br /> El enemigo ha lanzado " + p.getEnemigos()[i].getDados() + " dados de ataque, de los cuales han acertado " + tiradaE + ". <br /> Salud resultante: " + p.getJugadores()[0].getPersonaje().getSalud() + ".";
   			}
  		}
 	}
}


function moverEnemigos() //Función que mueve los enemigos del tablero.
{
	var t; //Variable de la casilla buscada.
	var e = p.getEnemigos(); //Guardamos los enemigos de la partida.
	var c = p.getMapa().getTablero(); //Guardamos la matriz del tablero.

	if (!movinge) //No se está moviendo.
	{
		for(var i = 0; i < e.length; i++) //Por cada enemigo.
		{
	  		//Atacar a los jugadores.
	  		if (e[i] != undefined && (c[e[i].getCasilla()[0]][e[i].getCasilla()[1]].getPersonajes() == 0)) //No hay un personaje en la casilla en la que está el enemigo (se mueve).
			{
				var adyacentes = CasillasAd(e[i].getCasilla()); //Guardamos las casillas adyacentes.
			   
			   	//Ordenamos el array en función del ruido, de mayor a menor, utilizando el método de la burbuja.
			   	var res;
			   	do 
			    {
			        res = false;
			        for (var j = 0; j < adyacentes.length - 1; j++) 
			        {
			            if (adyacentes[j].getRuido() < adyacentes[j+1].getRuido()) 
			            {
			                var tt = adyacentes[j];
			                adyacentes[j] = adyacentes[j+1];
			                adyacentes[j+1] = tt;
			                res = true;
			            }
			        }
			    } 
			    while (res);

				if(adyacentes[0].getRuido() > 0) //Hay ruido en la casilla, movemos a esa casilla.
				{
				    t = adyacentes[0];
				}
			   	else if (adyacentes[0].getRuido() == 0) //No hay ruido en la casilla, movemos a una casilla aleatoria.
				{
				    do 
				    {
				    	t = adyacentes[getRandom(0, adyacentes.length - 1)];
				    } 
				    while (t == c[4][7]); //Mientras la casilla no sea la meta.
				}
			}
			else if (e[i] != undefined && (c[e[i].getCasilla()[0]][e[i].getCasilla()[1]].getPersonajes() > 0)) //Hay personajes en la casilla del enemigo (no se mueve).
			{
				t = c[e[i].getCasilla()[0]][e[i].getCasilla()[1]];
			}

			for (var u = 0; u < 7; u++)
			{
			    for(var v = 0; v < 9; v++)
			     {
			      	if(c[u][v] instanceof Casilla && c[u][v] == t && e[i] instanceof Enemigo) //Si la posición del tablero es una casilla, y es la misma que la buscada.
			      	{
			      		movinge = true;
					    e[i].setCasilla(u, v); //Movemos a la casilla [i,j].
					    e[i].setMoveset(Math.round(c[u][v].getPos()[0] - 28.5 + getRandom(-35, 35)), Math.round(c[u][v].getPos()[1] - 36.25 + getRandom(-35, 35))); //Actualizamos las coordenadas a las que se debe mover el sprite, multiplicando por un pequeño offset aleatorio.
			      	}

			      	if(c[u][v] instanceof Casilla)
			     	{
			  	   		c[u][v].setRuido(0); //Reseteamos el ruido de la ronda.
			     	}
			    }
			}
		}
	}
}


function moverAnimE() //Función que mueve a los enemigos utilizando su animación.
{
	if(movinge) //Si se está moviendo con animación.
	{
		for (var i = 0; i < p.getEnemigos().length; i++) //Por cada enemigo.
		{
			if(p.getEnemigos()[i] instanceof Enemigo)
			{
				if (p.getEnemigos()[i].getMoveset()[1] != p.getEnemigos()[i].getSprite().y) //Distintas en el eje y.
				{
					if (p.getEnemigos()[i].getMoveset()[1] > p.getEnemigos()[i].getSprite().y) //El destino está abajo.
					{
						p.getEnemigos()[i].getSprite().y += 1;
						p.getEnemigos()[i].getSprite().animations.play('down', 12, true);
					}
					else if (p.getEnemigos()[i].getMoveset()[1] < p.getEnemigos()[i].getSprite().y) //El destino está arriba.
					{
						p.getEnemigos()[i].getSprite().y -= 1;
						p.getEnemigos()[i].getSprite().animations.play('up', 12, true);
					}
				}
				else //Iguales en el eje y.
				{
					if (p.getEnemigos()[i].getMoveset()[0] != p.getEnemigos()[i].getSprite().x) //Distintas en el eje x.
					{
						if (p.getEnemigos()[i].getMoveset()[0] > p.getEnemigos()[i].getSprite().x) //El destino está a la derecha.
						{
							p.getEnemigos()[i].getSprite().x += 1;
							p.getEnemigos()[i].getSprite().animations.play('right', 12, true);
						}
						else if (p.getEnemigos()[i].getMoveset()[0] < p.getEnemigos()[i].getSprite().x) //El destino está a la izquierda.
						{
							p.getEnemigos()[i].getSprite().x -= 1;
							p.getEnemigos()[i].getSprite().animations.play('left', 12, true);
						}
					}
				}

				if (p.getEnemigos()[i] != undefined && p.getEnemigos()[i].getMoveset()[0] == p.getEnemigos()[i].getSprite().x && p.getEnemigos()[i].getMoveset()[1] == p.getEnemigos()[i].getSprite().y) //Iguales en el eje x y en el eje y.
				{
					//Paramos las animaciones.
					p.getEnemigos()[i].getSprite().animations.stop();
					p.getEnemigos()[i].getSprite().frame = 0;
				}
			}
		}

		//Comprobamos si todos han terminado de moverse.
		movinge = false;

		for (var i = 0; i < p.getEnemigos().length; i++) //Por cada enemigo.
		{
			if (p.getEnemigos()[i] != undefined && !(p.getEnemigos()[i].getMoveset()[0] == p.getEnemigos()[i].getSprite().x && p.getEnemigos()[i].getMoveset()[1] == p.getEnemigos()[i].getSprite().y)) //El enemigo no ha llegado a su posición.
			{
				movinge = true;
			}
		}
	}
}


function spawnEnemigo() //Función que hace aparecer enemigos nuevos.
{
	if (!movinge)
	{
		var x; var y; //Coordenadas de los enemigos.
		var u; var v; //Índices de la casilla de los enemigos.
		var t = getRandom(1, 2); //Tipo del enemigo (Normal o MiniBoss).
		var index = p.getEnemigos().length; //Índice a partir del cual añadir los enemigos al array.

		switch (getRandom(0, 1))
		{
			case 0:
		    S_Meeseek_spawn1.play();
		    break;

		    case 1:
		    S_Meeseek_spawn2.play();
		    break;
		}
	 	
	 	//Añadimos a los enemigos aleatoriamente.
		switch (getRandom(0, 3))
		{
			case 0:
			x = 0; y = 215;
			u = 2; v = 0;
			break;

			case 1:
			x = 950; y = 215;
			u = 2; v = 8;
			break;	

			case 2:
			x = 0; y = 465;
			u = 4; v = 0;
			break;	
				
			case 3:
			x = 220; y = 665;
			u = 6; v = 2;
			break;
		}

		//Creamos el enemigo con los datos rellenados.
		p.getEnemigos()[index] = new Enemigo(t, x, y);
		p.getEnemigos()[index].init();
		p.getEnemigos()[index].setCasilla(u,v);

		document.getElementById("Consoletext").innerHTML += "<br /><br /> ¡Han aparecido enemigos!";
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

		//Creamos los enemigos inciales (10).
		enemigos[0] = new Enemigo(1, 475, 200);
		enemigos[0].setCasilla(2, 4);
		enemigos[1] = new Enemigo(2, 775, 0);
		enemigos[1].setCasilla(1, 6);
		enemigos[2] = new Enemigo(1, 225, 200);
		enemigos[2].setCasilla(2, 2);
		enemigos[3] = new Enemigo(2, 850, 200);
		enemigos[3].setCasilla(2, 7);
		enemigos[4] = new Enemigo(1, 725, 450);
		enemigos[4].setCasilla(4, 6);
		enemigos[5] = new Enemigo(2, 600, 600);
		enemigos[5].setCasilla(5, 6);
		enemigos[6] = new Enemigo(3, 850, 600);
		enemigos[6].setCasilla(5, 7);
		enemigos[7] = new Enemigo(2, 225, 450);
		enemigos[7].setCasilla(4, 2);
		enemigos[8] = new Enemigo(1, 100, 325);
		enemigos[8].setCasilla(3, 1);
		enemigos[9] = new Enemigo(1, 525, 325);
		enemigos[9].setCasilla(3, 5);

		for(var i = 0; i < enemigos.length; i++)
		{
			enemigos[i].init();
		}

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
		enemigos = undefined;
		enemigos = i;
	}
}


function Jugador() //Objeto Jugador.
{
	//Variables.
	var personaje; //Personaje del jugador.
	var accionesDisp = 4; //Acciones disponibles del jugador.
	var casilla = [0,4]; //Índice i y j de la casilla en que está.

	//Getters.	
	this.getAccionesDisp = function()
	{
		return accionesDisp;
	}

	this.getCasilla = function()
	{
		return casilla;
	}

	this.getPersonaje = function()
	{
		return personaje;
	} 

	//Setters.
	this.setAccionesDisp = function(a)
	{
		accionesDisp = a;

		if (accionesDisp < 0)
		{
			accionesDisp = 0;
		}
	}

	this.setCasilla = function(i, j)
	{
		casilla = [i,j];
	}

	this.setPersonaje = function(p)
	{
		personaje = p;
	} 
}


function Personaje(nom) //Objeto Personaje.
{
	//Variables.
	var id = nom; //ID del personaje.
	var salud = 3; //Salud del personaje.
	var dados; //Dados del personaje.
	var sprite; //Sprite del personaje.

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
		sprite.animations.add('down', [0,1,2,3]);
		sprite.animations.add('left', [4,5,6,7]);
		sprite.animations.add('right', [8,9,10,11]);
		sprite.animations.add('up', [12,13,14,15]);

        sprite.frame = 0;
	}

	//Getters.
	this.getDados = function()
	{
		return dados;
	}

	this.getSalud = function()
	{
		return salud;
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


function Enemigo(tip, xx, yy) //Objeto Enemigo.
{
	//Variables.
	var tipo = tip; //Tipo de enemigo (1-Normal, 2-MiniBoss, 3-Boss).
	var x = xx; //Coordenada x inicial donde se pinta el sprite.
	var y = yy; //Coordenada y inicial donde se pinta el sprite.
	var salud; //Salud del enemigo.
	var dados; //Dados del enemigo.
	var sprite; //Sprite del enemigo.
	var casilla = new Array(); //Índice i y j de la casilla en que está.
	var moveset = new Array(); //Coordenadas a las que se tiene que mover el enemigo.

	//Funciones.
	this.init = function() //Función que inicializa el enemigo.
	{
		if (tipo == 1) //Enemigo normal.
		{
			salud = 3;
			dados = 1;
			sprite = game.add.sprite(x, y, 'S_Meeseek1');
		}
		else if (tipo == 2) //MiniBoss.
		{
			salud = 5;
			dados = 3;
			sprite = game.add.sprite(x, y, 'S_Meeseek2');
		}
		else if (tipo == 3) //Boss.
		{
			salud = 8;
			dados = 5;
			sprite = game.add.sprite(x, y, 'AS');
		}

		if (tipo != 3) //Si no es un Boss.
		{
			//Añadimos las animacones.
			sprite.animations.add('down', [0,1,2,3]);
			sprite.animations.add('left', [4,5,6,7]);
			sprite.animations.add('right', [8,9,10,11]);
			sprite.animations.add('up', [12,13,14,15]);

	        sprite.frame = 0;
		}
	}

	//Getters.
	this.getCasilla = function()
	{
		return casilla;
	}

	this.getDados = function()
	{
		return dados;
	}

	this.getMoveset = function()
	{
		return moveset;
	}

	this.getSalud = function()
	{
		return salud;
	}

	this.getSprite = function()
	{
		return sprite;
	}

	this.getTipo = function()
	{
	    return tipo;
	}	

	//Setters.
	this.setCasilla = function(i, j)
	{
		casilla = [i,j];
	}

	this.setMoveset = function(msi, msj)
	{
		moveset = [msi, msj];
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
	var Tablero = new Array(); //Array de casillas del tablero.
	
	//Funciones.
	this.init = function() //Función que inicializa el mapa.
	{
		fondo = game.add.sprite(0, 0, 'Map1'); //Creamos el fondo.

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
		Tablero[2][3] = new Casilla(false,325,200,100,100); Tablero[2][5] = new Casilla(false,575,200,75,100); Tablero[2][6] = new Casilla(false,700,200,100,100); 
		Tablero[2][7] = new Casilla(false,825,200,100,100); Tablero[2][8] = new Casilla(false,950,200,50,100); Tablero[3][0] = new Casilla(false,0,325,50,100); 
		Tablero[3][2] = new Casilla(false,200,325,100,100); Tablero[3][6] = new Casilla(false,700,325,100,100); Tablero[4][0] = new Casilla(false,0,450,50,100); 
		Tablero[4][1] = new Casilla(false,75,450,100,100); Tablero[4][2] = new Casilla(false,200,450,100,100); Tablero[4][3] = new Casilla(false,325,450,100,100); 
		Tablero[4][4] = new Casilla(false,450,450,100,100); Tablero[4][5] = new Casilla(false,575,450,100,100); Tablero[4][6] = new Casilla(false,700,450,100,100); 
		Tablero[5][2] = new Casilla(false,200,575,100,100); Tablero[6][2] = new Casilla(false,200,700,100,50);

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
	var graphics = game.add.graphics(); //Variable para dibujar gráficos de la casilla.
	var rectan = new Phaser.Rectangle(x, y, ancho, alto); //Rectángulo visual de la casilla.

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
	this.getColor = function()
	{
		return colorCasilla;
	}

	this.getEnemigos = function()
	{
		return numEnemigos;
	}

	this.getGraphics = function()
	{
		return graphics;
	}

	this.getInterior = function()
	{
		return interior;
	}

	this.getPersonajes = function()
	{
	 return numPersonajes;
	}

	this.getPos = function()
	{
		return [rectan.x+(ancho/2), rectan.y+(alto/2)];
	}	

	this.getRect = function()
	{
		return rectan;
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

	this.setEnemigos = function(en)
	{
		numEnemigos = en;
	}

	this.setPersonajes = function(per)
	{
		numPersonajes = per;
	}

	this.setRuido = function(ru)
	{
		ruido = ru;
	}
}


function sound(src) //Objeto auxiliar de sonido.
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
    this.loop = function()
    {
    	this.sound.setAttribute("loop", "loop");
    }
}

