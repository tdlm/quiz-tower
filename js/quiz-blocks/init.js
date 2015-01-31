window.onload = function() {
	var gameWidth = 400;
	var gameHeight = 600;


	var gamevar = new Phaser.Game( gameWidth, gameHeight, Phaser.AUTO, 'container' );

	gamevar.state.add('Load',Game.Load);

	gamevar.state.add('MainMenu',Game.MainMenu);

	gamevar.state.add('Game',Game.PlayGame);

	gamevar.state.add('Lose',Game.LoseScreen);

	gamevar.state.add('Win',Game.WinScreen);

	gamevar.state.start('Load');
}