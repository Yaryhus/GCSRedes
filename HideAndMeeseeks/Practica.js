/*
Código JavaScript - Guillermo Amigó Urda, Alejandro Camuñas Casas y Sergio García Aloguín.
Práctica final de Juegos en Red.
Grado en Diseño y Desarrollo de Videojuegos.
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() 
{
	game.load.image('logo', 'Materiales/Img/Logo.png');
}

function create() 
{

	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;

	$(document).ready(function{
		
	})
}

function update() 
{

}


