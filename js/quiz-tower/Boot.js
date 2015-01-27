var QuizTower = {};
QuizTower.Boot = function ( game ) {
};
QuizTower.Boot.prototype = {
	preload: function () {
		// Here, we can pre-load the loader bar, if needed
	},
	create : function () {
		// Here, we can set up initial game options, scale options, etc.

		// Start preloader
		this.state.start( 'Preloader' );
	}
};