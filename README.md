![alt text](https://github.com/Yaryhus/Rick-And-Morty-Hide-and-Meeseek/blob/master/Material/Img/Logo.png "Rick and Morty: Hide and Meeseek")

---

# Tabla de Contenidos

  #### 1. Autores
  #### 2. Descripción del juego
  #### 3. Reglas del juego
  #### 4. Referencias
  #### 5. Copyright disclaimer <br>

---

## 1. Autores

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

## 2. Descripción del juego

*Rick and Morty: Hide and Meeseek* es un juego de mesa por turnos, online y multijugador, cuyas mecánicas principales se inspiran en gran medida en el juego de mesa *Zombicide*, y, en menor grado, en los juegos de mesa *Dead of Winter* y *Arcadia Quest*, y cuya estética y ambientación se corresponden con las de la serie animada *Rick and Morty* (*Adult Swim*, *Cartoon Network*).

El desarrollo del juego consiste en la alternancia de turnos entre jugadores y la máquina, de forma que ambos controlarán diferentes avatares o personajes por el tablero, cada uno de los cuales podrá realizar diversas acciones para lograr su objetivo (escapar del mapa, matar al jefe final, etc.). Para ello, el juego cuenta con un sistema de inventario de objetos, diferentes personajes con sus respectivas habilidades y características, y distintas acciones que podrán realizar en el desarrollo de la partida. A continuación, se exponen sus reglas más detalladamente.

---

## 3. Reglas del juego

*Nota: para una lista completa de personajes, objetos, escenarios y misiones, consultar el anexo incluido en este repositorio.*

El juego soporta de 2 a 4 jugadores de forma online, de manera que se irán sucediendo los turnos de cada jugador y la máquina, hasta dar lugar a que el desarrollo de la partida siga una estructura similar a la siguiente: <br><br>

**1º Introducción:** 
- **Jugadores/Personajes:** Se escoge el número de jugadores (2-4), y cada uno de ellos eligirá un personaje con el que jugar. Cada personaje tiene unos atributos o características propios, así como una habilidad especial única.

- **Escenario/Misión:** Tras elegir a los personajes, los jugadores decidirán la combinación del escenario/misión (ej: escapar del escenario, conseguir un objeto, matar un jefe final, etc.) que deseen jugar en la partida. <br><br>
Una vez seleccionados personajes, escenario y misión, se establece la configuración inicial del tablero y comienza la partida. <br><br>

**2º Fases de la partida:** El desarrollo de la partida viene dado por la sucesión de dos fases determinadas:
- **Fase de los jugadores:** Los jugadores jugarán por turnos, en función del personaje escogido, y durante su turno podrán realizar 3 acciones (diferentes o no) a elegir entre varias posibilidades:
  - *Hacer ruido:* el jugador puede elegir hacer ruido en la casilla en la que está, de forma que atraerá a los enemigos al final de la ronda. El ruido se disipa en la ronda siguiente, tras la fase de los enemigos. Esta acción genera 5 de ruido.
  - *Moverse:* el jugador podrá moverse de 1 a 3 casillas. Por cada enemigo que haya en la casilla en que se encuentra el jugador, éste deberá tirar un dado para ver si logra escapar satisfactoriamente, o de lo contrario sufrir una herida. Esta acción no genera ruido.
  - *Buscar:* si se encuentra en una casilla interior (ej: dentro de un edificio), el jugador puede buscar objetos en ella. Para ello, primero lanzará un dado que determinará si encuentra algo o no. Si acierta, se le asignará un objeto aleatorio (cada jugador puede llevar hasta 3 objetos equipados, y deberá descartarse del resto). Sin embargo, hay una muy leve probabilidad de que el jugador quede incapacitado al buscar y pierda ese turno (al siguiente podrá jugar de nuevo). Esta acción genera 1 de ruido, independientemente si se encuentra algo o no.
  - *Atacar:* si el jugador tiene dentro de su alcance a algún enemigo (en su casilla si el arma es cuerpo a cuerpo o la distancia que indique el objeto), el jugador elegirá con qué arma ataca y a qué enemigo, y lanzará tantos dados como indique la suma de sus dados de personaje mas los del arma. El daño total será el número de aciertos. Los ataques a distancia generan 3 de ruido, y los cuerpo a cuerpo, 2.
  - *Usar objeto/habilidad:* tal y como se indique para cada caso en particular. Esta acción no genera ruido.
 
- **Fase de los enemigos:** Los enemigos en juego realizarán las siguientes acciones: 
  - *Movimiento:* Una vez finalizado el turno de todos los jugadores (tras realizar cada uno sus acciones), los enemigos se mueven 1 hacia la casilla que más ruido tenga, o, si hay algún jugador a 3 casillas o menos del enemigo, hacia su posición. 
  - *Ataque/Defensa:* Acto seguido, si se encuentran en la misma casilla que un jugador tras haberse movido, atacan. Para ello, lanzan tantos dados como se indique según el enemigo (normal, jefe final, etc.), y el jugador atacado lanza los dados de su personaje para intentar defenderse. Cada acierto del enemigo es un impacto, y cada acierto del jugador, una defensa que lo contrarresta. Por cada impacto no defendido, el jugador sufre una herida. Cada jugador puede sufrir hasta 3 heridas, y éstas ocupan espacio en las ranuras de su inventario, por lo que perderá el objeto de la ranura en cuestión.
  - *Aparición:* Una vez los enemigos han realizado sus acciones, aparecen más enemigos en los puntos designados del escenario. En función de cómo de avanzada vaya la partida, aparecerá un número mayor o menor de ellos. Si durante la aparición alcanza el número máximo de enemigos posibles en el tablero, de forma que no puedan aparecer más porque no "quepan", todos los enemigos actualmente en juego se "activan" y vuelven a realizar las acciones de movimiento y ataque/defensa. Tras esto, ya se hayan "activado" o no, se reinicia la ronda, volviendo a la fase de los jugadores.

Esta sucesión se producirá indefinidamente, hasta que se obtenga la victoria (se cumple el objetivo) o la derrota (muerte de algún jugador), finalizando así la partida. <br><br>

**Funcionalidad extra: traidor** <br>
Una modalidad extra del juego es la mecánica del traidor, en la cual, tras elegir personaje, escenario y misión, hay una posibilidad de que alguno de los jugadores sea designado como traidor de forma secreta, y su objetivo pasará a ser el de matar a otro jugador aliado.
Si lo consigue, el traidor ganará la partida automáticamente en solitario, y el resto de jugadores serán derrotados. 

Sin embargo, durante su turno, un jugador no traidor puede decidir realizar una acusación contra otro jugador del que sospeche, y se realizará una votación para exiliar al jugador en cuestión. Si la votación triunfa, se comprueba la identidad del sospechoso. Si era el traidor, ganan los demás jugadores, y él es derrotado. Si no era el traidor, pierden los demás jugadores (puede darse el caso de que no haya traidor en la partida). Por ello, conviene que los jugadores no traidores no caigan en la paranoia, y que el traidor, de haberlo, sea precavido con sus acciones, atacando a un aliado sólo cuando sabe que lo va a matar en un sólo ataque.

---

## 4. Referencias

1. Web oficial de *Rick and Morty*: [http://www.adultswim.com/videos/rick-and-morty/] <br>
2. Manuales de *Zombicide*: [https://zombicide.com/en/game-rules/] <br>
3. Manuales de *Dead of Winter*: [https://www.plaidhatgames.com/games/dead-of-winter] <br>
4. Manuales de *Arcadia Quest*: [http://arcadiaquest.com/en/] <br>

---

## 5. Copyright disclaimer

This product is a non-lucrative recreation of the show through a tabletop online game, without any kind of profit or redistribution present, and for educative purposes only. 

All content and images used on this site are owned or licensed by *Adult Swim*, *Cartoon Network* or its affiliates. 
Names of *Adult Swim* products and services are trademarks of *Adult Swim*, *Cartoon Network* or its subsidiaries.
Nothing contained herein shall be construed as conferring any license or right under any *Adult Swim* patent, copyright, or trademark.

If you enjoy this product, please support the creators of the show and their respective affiliates. Thank you!

---
