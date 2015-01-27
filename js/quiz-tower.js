var game = new Phaser.Game( 800, 600, Phaser.CANVAS, 'quiz-tower', {preload: preload, create: create, update: update} );
var categories = ['geography', 'history', 'science', 'sports'];
var timer = 0;
var score = 0;
var sprites;

function preload () {
	// Load images and sounds

	// Background Tile
	game.load.image( 'bgtile', 'images/background.jpg' );

	// Category Tiles
	game.load.image( 'tile-geography', 'images/tile-geo.gif' );
	game.load.image( 'tile-history', 'images/tile-history.gif' );
	game.load.image( 'tile-science', 'images/tile-science.gif' );
	game.load.image( 'tile-sports', 'images/tile-sports.gif' );
}

function create_category_sprite () {

	var category = categories[game.rnd.integerInRange( 0, categories.length - 1 )];

	var sprite = sprites.create( 200, 50, 'tile-' + category );
	sprite.body.collideWorldBounds = true;
	sprite.body.gravity.x = 0;
	sprite.body.gravity.y = 100;
	sprite.body.bounce.set( 0 );

	// game.camera.y -= 75;
	game.camera.follow( sprite );
}

function create () {
	// Background
	game.stage.backgroundColor = '#000';

	game.world.setBounds( 0, 0, 2000, 2000 );
	// game.camera.y = 600;

	bgtile = game.add.tileSprite( 0, 0, 2000, 2000, 'bgtile' );

	// Init score text
	scoreText = game.add.text( 16, 16, 'score: ' + score, {font: '24px arial', fill: '#fff'} );

	sprites = game.add.group();
	sprites.enableBody = true;
	sprites.physicsBodyType = Phaser.Physics.ARCADE;

	// Inputs
	game.input.onDown.add( create_category_sprite, this );
}

function increase_score () {
	score++;
	set_score( score );
}

function decrease_score () {
	score--;
	set_score( score );
}

function set_score ( score ) {
	scoreText.text = 'score: ' + score;
}

function update () {
	timer++;

	game.physics.arcade.collide( sprites, sprites, function ( sprite ) {
		console.log( sprite.body );
		if ( sprite.body.deltaAbsY() <= 1 ) {
			sprite.body.moves = false;
			sprite.body.immovable = true;
		}
	} );

	// bgtile.tilePosition.y += 0.5;

	if ( timer / 100 % 1 == 0 ) {
		increase_score();
	}
}

function render () {
	game.debug.cameraInfo( game.camera, 32, 32 );
}