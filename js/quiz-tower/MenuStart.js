QuizTower.MenuStart = function ( game ) {
};
QuizTower.MenuStart.prototype = {
	create   : function () {
		// We can set up the display menu before everything else shows
		// And display a button to "start" and maybe a button for high scores

		// For now, we go straight to the start
		this.startGame();
	},
	startGame: function () {
		// Start game state!
		this.state.start( 'Game' );
	}
};