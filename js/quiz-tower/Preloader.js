QuizTower.Preloader = function ( game ) {
	QuizTower.GAME_WIDTH = 800;
	QuizTower.GAME_HEIGHT = 600;
	QuizTower.BOUND_WIDTH = 800;
	QuizTower.BOUND_HEIGHT = 2000;

	this._backgroundTile = null;
};

QuizTower.Preloader.prototype = {
	preload: function () {
		// Set background color
		this.stage.backgroundColor = '#000';

		// Set world bounds
		this.world.setBounds( 0, 0, 2000, 2000 );

		// Set up loading indicator, if needed
		// Load images
		this.load.image( 'background-tile', 'images/background.jpg' );

		// Load sprite sheets
	},
	create : function () {
		// Load background tile
		this._backgroundTile = this.add.tileSprite( 0, 0, 2000, 2000, 'background-tile' );

		// Fire up the Start Menu
		this.state.start( 'MenuStart' );
	}
};