![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/HideAndMeeseeks/src/main/resources/static/HideAndMeeseeks/Material/Img/Otros/Logo.png "Rick and Morty: Hide and Meeseek")

---

# Tabla de Contenidos
  
  #### 1. Demo
  #### 2. Autores
  #### 3. Descripción del juego
  #### 4. Reglas del juego
  #### 5. Referencias
  #### 6. Copyright disclaimer 
  #### 7. Diagrama de navegación 
  #### 8. Diagrama de clases
  #### 9. Instrucciones de ejecución
  #### 10. Documentación WebSockets <br>

---

## 1. Demo

**Link:** https://www.youtube.com/watch?v=qkU_DU3RzIA

---

## 2. Autores

**Nombre y Apellidos:** Guillermo Amigó Urda <br>
**Correo corporativo:** g.amigo@alumnos.urjc.es <br>
**Cuenta de GitHub:** *Yaryhus* <br>

**Nombre y Apellidos:** Alejandro Camuñas Casas <br>
**Correo corporativo:** a.camunasc@alumnos.urjc.es <br>
**Cuenta de GitHub:** *Aleviux* <br>

**Nombre y Apellidos:** Sergio García Aloguín <br>
**Correo corporativo:** s.garciaalo@alumnos.urjc.es <br>
**Cuenta de GitHub:** *mrWester* <br>

---

## 3. Descripción del juego

*Rick and Morty: Hide and Meeseek* es un juego de mesa por turnos, online y multijugador, cuyas mecánicas principales se inspiran en gran medida en el juego de mesa *Zombicide*, y, en menor grado, en los juegos de mesa *Dead of Winter* y *Arcadia Quest*, y cuya estética y ambientación se corresponden con las de la serie animada *Rick and Morty* (*Adult Swim*, *Cartoon Network*).

El desarrollo del juego consiste en la alternancia de turnos entre jugadores y la máquina, de forma que ambos controlarán diferentes avatares o personajes por el tablero, cada uno de los cuales podrá realizar diversas acciones para lograr su objetivo (escapar del mapa, matar al jefe final, etc.). Para ello, el juego cuenta con un sistema de diferentes personajes con sus respectivas características, y distintas acciones que podrán realizar en el desarrollo de la partida. A continuación, se exponen sus reglas más detalladamente.

---

## 4. Reglas del juego

*Nota: para una lista completa de personajes, objetos, escenarios y misiones, consultar el anexo incluido en este repositorio.*

El juego soporta de 2 a 4 jugadores de forma online, de manera que se irán sucediendo los turnos de cada jugador y la máquina, hasta dar lugar a que el desarrollo de la partida siga una estructura similar a la siguiente: <br><br>

**1º Introducción:** 
- **Jugadores/Personajes:** Se escoge el número de jugadores (2-4), y cada uno de ellos eligirá un personaje con el que jugar. Cada personaje tiene unos atributos o características propios.

- **Escenario/Misión:** se establece la configuración inicial del tablero y comienza la partida. <br><br>

**2º Fases de la partida:** El desarrollo de la partida viene dado por la sucesión de dos fases determinadas:
- **Fase de los jugadores:** Los jugadores jugarán por turnos, en función del personaje escogido, y durante su turno podrán realizar 4 acciones (diferentes o no) a elegir entre varias posibilidades:
  - *Hacer ruido:* el jugador puede elegir hacer ruido en la casilla en la que está, de forma que atraerá a los enemigos al final de la ronda. El ruido se disipa en la ronda siguiente, tras la fase de los enemigos. Esta acción genera 5 de ruido.
  - *Moverse:* el jugador podrá moverse 1 casilla. Por cada enemigo que haya en la casilla en que se encuentra el jugador, éste deberá tirar un dado para ver si logra escapar satisfactoriamente, o de lo contrario sufrir una herida. Esta acción no genera ruido.
  - *Atacar:* si el jugador tiene dentro de su alcance a algún enemigo lanzará tantos dados como corresponda a su personaje. El daño total será el número de aciertos. Esta acción genera 3 de ruido.
 
- **Fase de los enemigos:** Los enemigos en juego realizarán las siguientes acciones: 
  - *Movimiento:* Una vez finalizado el turno de todos los jugadores (tras realizar cada uno sus acciones), los enemigos se mueven 1 hacia la casilla adyacente que más ruido tenga, o, de lo contrario, de forma impredecible.
  - *Ataque/Defensa:* Acto seguido, si se encuentran en la misma casilla que un jugador tras haberse movido, atacan. Para ello, lanzan tantos dados como se indique según el enemigo (normal, jefe final, etc.), y el jugador atacado lanza los dados de su personaje para intentar defenderse. Cada acierto del enemigo es un impacto, y cada acierto del jugador, una defensa que lo contrarresta. Por cada impacto no defendido, el jugador sufre una herida. Cada jugador puede sufrir hasta 3 heridas, antes de morir.
  - *Aparición:* Una vez los enemigos han realizado sus acciones, aparecen más enemigos en los puntos designados del escenario. En función de cómo de avanzada vaya la partida, aparecerá un número mayor o menor de ellos. Si durante la aparición alcanza el número máximo de enemigos posibles en el tablero, de forma que no puedan aparecer más porque no "quepan", todos los enemigos actualmente en juego se "activan" y vuelven a realizar las acciones de movimiento y ataque/defensa. Tras esto, ya se hayan "activado" o no, se reinicia la ronda, volviendo a la fase de los jugadores.

Esta sucesión se producirá indefinidamente, hasta que se obtenga la victoria (se cumple el objetivo) o la derrota (muerte de algún jugador), finalizando así la partida. 

---

## 5. Referencias

1. Web oficial de *Rick and Morty*: [http://www.adultswim.com/videos/rick-and-morty/] <br>
2. Manuales de *Zombicide*: [https://zombicide.com/en/game-rules/] <br>
3. Manuales de *Dead of Winter*: [https://www.plaidhatgames.com/games/dead-of-winter] <br>
4. Manuales de *Arcadia Quest*: [http://arcadiaquest.com/en/] <br>

---

## 6. Copyright disclaimer

This product is a non-lucrative recreation of the show through a tabletop online game, without any kind of profit or redistribution present, and for educative purposes only. 

All content and images used on this site are owned or licensed by *Adult Swim*, *Cartoon Network* or its affiliates. 
Names of *Adult Swim* products and services are trademarks of *Adult Swim*, *Cartoon Network* or its subsidiaries.
Nothing contained herein shall be construed as conferring any license or right under any *Adult Swim* patent, copyright, or trademark.

If you enjoy this product, please support the creators of the show and their respective affiliates. Thank you!

---

## 7. Diagrama de navegación

**Pantalla 1** - Menú principal del juego, pulsando espacio comenzamos la partida.

![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/DiagramaNav/IMG%20(1).PNG "Rick and Morty: Hide and Meeseek")

**Pantalla 2** - Tablero inicializado, mensaje de bienvenida. Para empezar a jugar, pulsamos el botón de Continuar.

![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/DiagramaNav/IMG%20(2).PNG "Rick and Morty: Hide and Meeseek")

**Pantalla 3** - Partida comenzada, podemos realizar nuestras acciones.

![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/DiagramaNav/IMG%20(3).PNG "Rick and Morty: Hide and Meeseek")

**Pantalla 4** - Acción de moverse, el jugador se mueve una casilla.

![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/DiagramaNav/IMG%20(4).PNG "Rick and Morty: Hide and Meeseek")

**Pantalla 5** - Acción de moverse, el jugador escoge una casilla adyacente (rojo) para moverse de nuevo.

![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/DiagramaNav/IMG%20(5).PNG "Rick and Morty: Hide and Meeseek")

**Pantalla 6** - Acción de ataque, en una casilla con enemigos, el jugador lanza dados para atacar. 

![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/DiagramaNav/IMG%20(6).PNG "Rick and Morty: Hide and Meeseek")

**Pantalla 7** - Turno de los enemigos, el jugador es atacado, por lo que lanza dados para defenderse.

![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/DiagramaNav/IMG%20(7).PNG "Rick and Morty: Hide and Meeseek")

**Pantalla 8** - Acceso a la meta, el jugador debe moverse a la casilla verde para ganar.

![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/DiagramaNav/IMG%20(8).PNG "Rick and Morty: Hide and Meeseek")

**Pantalla 9** - El jugador ha ganado llegando a la meta, el juego se resetea. 

![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/DiagramaNav/IMG%20(9).PNG "Rick and Morty: Hide and Meeseek")

**Pantalla 10** - El jugador ha perdido recibiendo 3 heridas, el juego se resetea. 

![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/DiagramaNav/IMG%20(10).PNG "Rick and Morty: Hide and Meeseek")

---

## 8. Diagrama de clases

A continuación se presenta el diagrama de clases correspondiente con la parte de Java, API Rest y WebSockets:
![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/DiagramaNav/Clases.PNG "Rick and Morty: Hide and Meeseek")

---

## 9. Instrucciones de ejecución

Durante el desarrollo de la fase, se ha utilizado el IDE gratuito NetBeans 8.2, basado en Java (https://netbeans.org/downloads/).
Se recomienda su uso para la ejecución/compilación del proyecto, aunque otro IDE como Eclipse (que soporte Spring y Maven mediante auxiliares como Spring Tool Suite) permitirá su ejecución.

Para ejecutar el juego, primero deberemos iniciar el servidor desde el IDE que corresponda (botón de play en NetBeans). Una vez iniciado, insertaremos en el navegador la siguiente URL: "localhost:8080/HideAndMeeseeks/Practica.html", y ya podremos jugar mediante el servidor.

Alternativamente, si no se dispone de un IDE de desarrollo, podemos ejecutar el .jar desde la consola de comandos. Para ello, primero descargaremos el .zip del repositorio y lo descomprimiremos. Después, abrimos la consola de comandos (PowerShell o cmd) en la carpeta "jar" (dentro de HideAndMeeseeks). Para ello, podemos hacer Shift + Click en dicho directorio. Al hacerlo, se nos abrirá la consola, sobre la que deberemos escribir "java -jar HideAndMeeseeks.jar". Damos a enter y dejamos unos segundos hasta que se inicialice el servidor. Finalmente, copiamos la url en el navegador, y ya podremos jugar: "localhost:8080/HideAndMeeseeks/Practica.html".

---

## 10. Documentación WebSockets

La implementación de la parte asíncrona de la práctica se ha llevado a cabo mediante el uso de WebSockets en Java, por lo que encontramos una estructura tal que así:

De los 4 posibles jugadores, el primero en iniciar la sesión en el servidor es considerado como "Líder" de la partida. Esto es, su parte de cliente será la que decidirá los cambios sobre las otras, de forma que éstas se limitarán a imitar sus acciones y estados. Así, tendremos un "host" cuyos datos usarán los demás clientes.

Para realizar el intercambio de datos entre sesiones, se utilizará el formato de texto Json, de forma que todos los mensajes que pasen por el servidor tendrán un campo "clave" que determinará qué acciones debe realizar el servidor (contestar a la misma sesión que mandó el mensaje, a otras, cambiar el valor de alguna variable del servidor, mandar mensajes a todas las sesiones, etc.). En la parte del cliente, cada mensaje tendrá un caso particular, para ejecutar las funciones determinadas con los datos recibidos.

Mediante este sistema, el "líder" realizará cambios en sus datos, envíandoselos al servidor (y éste a los demás jugadores), y llamadas para realizar diversas acciones, consiguiendo así un sistema de conexión asíncrona en el juego.

### Documentación del protocolo:

**Init:** 
El mensaje se manda para inciar el juego (saludo), recibiendo cada jugador conectado el personaje del jugador que manda Init. Contiene la clave, un booleano que determina si ha empezado la partida, y el personaje. <br>
El mensaje será recibido por el servidor, que lo reenviará al resto de jugadores, los cuales al recibirlo harán la función apropiada en el switch case (modificar las variables locales y llamada a RedResponse()). <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "init", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  begin: "true"/"false", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  message: initjugs[0] (El nombre del personaje que manda el mensaje) <br>
} <br>

**Response:**
El mensaje se manda para inciar el juego (respuesta al saludo), recibiendo cada jugador recién conectado el personaje de los jugadores que ya estaban en la partida. Contiene la clave y el valor del personaje. <br>
El mensaje será recibido por el servidor, que lo reenviará al resto de jugadores, los cuales al recibirlo harán la función apropiada en el switch case (modificar las variables locales). <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "response", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  message: initjugs[0] (El nombre del personaje que manda el mensaje) <br>
} <br>

**Leader:**
El mensaje lo manda el servidor a la primera sesión iniciada, para comunicarle que es el anfitrión o host. <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; clave: "leader" <br>
} <br>

**Full:**
El mensaje lo manda el servidor a las sesiones nuevas si la partida ha empezado o está llena, quitando la interfaz e impidiendo al nuevo jugador unirse hasta que la partida esté disponible. <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "full" <br>
} <br>

**Bye:**
El mensaje lo manda el servidor a las sesiones de la partida si algún jugador se ha ido de la misma, ya que el juego no puede contemplar que continúen si él (desbalancearía el juego), con lo que los demás jugadores son avisados y cancelan la partida. <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "bye" <br>
} <br>

**Start:**
El mensaje lo manda el host para comunicar al resto de jugadores que inicien la partida (sólo la puede iniciar el líder). Contiene la clave. <br>
El mensaje será recibido por el servidor, que lo reenviará al resto de jugadores, los cuales al recibirlo harán la función apropiada en el switch case (startWebSockets()). <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "start" <br>
} <br>

**Continuar:**
El mensaje se manda para comunicar al resto de jugadores que continuen, actuando en consecuencia como si pulsasen la barra espaciadora, para controlar el ritmo del juego. Contiene la clave. <br>
El mensaje será recibido por el servidor, que lo reenviará al resto de jugadores, los cuales al recibirlo harán la función apropiada en el switch case (conti()). <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "continuar" <br>
} <br>

**Deactivate:**
El mensaje se manda para desactivar el turno del jugador, dándoselo al siguiente (o a los enemigos). Contiene la clave. <br>
El mensaje será recibido por el servidor, que lo reenviará al jugador cuyo turno sea (o al host si es el de los enemigos), los cuales al recibirlo harán la función apropiada en el switch case (enemies() o "activate"). <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "deactivate" <br>
} <br>

**Activate:**
El mensaje lo manda el servidor tras recibir un "deactivate", para activar el turno del jugador correspondiente. <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "activate" <br>
} <br>

**Enemies:**
El mensaje lo manda el servidor tras recibir un "deactivate", para activar el turno de los enemigos. <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "enemies" <br>
} <br>

**Restart:**
El mensaje se manda para devolver el turno al primer jugador (host) y reiniciar así la ronda. Contiene la clave. <br>
El mensaje será recibido por el servidor, que enviará un "activate" al primer jugador. <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "restart" <br>
} <br>

**Echo:**
El mensaje se manda para utilizar el servidor de eco, recibiendo el mismo mensaje que envía. Contiene la clave y el mensaje. <br>
El mensaje será recibido por el servidor, que lo reenviará al mismo jugador, el cual al recibirlo lo mostrarán por consola. <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "echo", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  message: (String) <br>
} <br>

**Chat:**
El mensaje se manda para difundirse al resto de jugadores de forma asíncrona, de manera que conseguimos el efecto de chat. Contiene la clave y el mensaje. <br>
El mensaje será recibido por el servidor, que lo reenviará al resto de jugadores, los cuales al recibirlo lo mostrarán en su chat. <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "chat", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  message: (String) <br>
} <br>

**MoverPJ:**
El mensaje se manda para comunicar al resto de jugadores que muevan al personaje a la casilla nueva. Contiene clave, jugador a mover, coordenadas de la casilla a la que se mueve, y salud resultante del movimiento (por si falla al evadir). <br>
El mensaje será recibido por el servidor, que lo reenviará al resto de jugadores, los cuales al recibirlo harán la función apropiada en el switch case (moverWebsockets()). <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "moverPJ", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  jugador: (jugador que se mueve), <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  i: (coordenada x de la casilla), <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  j: (coordenada y de la casilla), <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  salud: (salud resultante)
} <br> <br>

**Ruido:** 
El mensaje se manda para marcar que el jugador ha hecho ruido en su casilla. Contiene la clave y el jugador. <br>
El mensaje será recibido por el servidor, que lo reenviará al resto de jugadores, los cuales al recibirlo harán la función apropiada en el switch case (ruidoWebSockets()). <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "ruido", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  jugador: (jugador que hace ruido)<br>
} <br> 

**AtacarAEnemigo:**
El mensaje se manda para comunicar al resto de jugadores que se ha atacado al enemigo en cuestión. Contiene la clave, el jugador atacante, el daño y el enemigo atacado. <br>
El mensaje será recibido por el servidor, que lo reenviará al resto de jugadores, los cuales al recibirlo harán la función apropiada en el switch case (atacarWebsockets()). <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "atacaraenemigo", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  jugador: (jugador que ataca), <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  hurt: (daño inflingido), <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  enemigo: (el enemigo atacado) <br>
} <br>

**moverEnemigo:**
El mensaje se manda para mover a los enemigos en los jugadores que no sean el host. Contiene la clave, el enemigo y las coordenadas de la casilla a la que se mueve. <br>
El mensaje será recibido por el servidor, que lo reenviará al resto de jugadores, los cuales al recibirlo harán la función apropiada en el switch case (moverEnemigosWebsockets()). <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "moverenemigo", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  enemigo: (el enemigo que se mueve), <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  i: (coordenada x de la casilla), <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  j: (coordenada y de la casilla) <br>
} <br>

**AtacarEnemigo:**
El mensaje se manda para que el jugador atacado sea por el enemigo en cuestión. Contiene la clave, el jugador atacado, y el daño. <br>
El mensaje será recibido por el servidor, que lo reenviará al resto de jugadores, los cuales al recibirlo harán la función apropiada en el switch case (atacarEnemigosWebsockets()). <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "atacarenemigo", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  hurt: (daño inflingido), <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  jugador: (El nombre del jugador atacado) <br>
} <br>

**SpawnEnemigos:**
El mensaje se manda para que aparezcan los enemigos en los tableros de los otros jugadores. Contiene el la clave, el tipo de enemigo, la casilla en la que aparece, y las coordenadas de su sprite. <br>
El mensaje será recibido por el servidor, que lo reenviará al resto de jugadores, los cuales al recibirlo harán la función apropiada en el switch case (spawnEnemigosWebsockets()). <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  clave: "spawnenemigo", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  tipo: (tipo del enemigo aparecido), <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  coordx: (coordenada x del sprite), <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  coordy: (coordenada y del sprite), <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  casillau: (coordenada x de la casilla), <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  casillav: (coordenada y de la casilla) <br>
} <br>

---
