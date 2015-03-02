/*var defaultSettings = {
	'oldsquares': new Array(),
	'squaresinrow': new Array(),
	'change_rot_time': 0,
	'force_down': 0,
	'slide_time': 
}
TODO: complete this defaultSettings thing... put all width/height/x/y/score/..... there

*/
var oldsquares = new Array();
var squaresinrow = new Array();
var change_rot_time = 0;
var force_down = 0;
var slide_time = 0;
var force_down_max_time = 500;
var blockHeight = 30;
var blockWidth = 30;
var gamePlayWidth = 280;
var gamePlayHeight = 590;

var KEYLEFT;
var KEYRIGHT;
var KEYUP;
var KEYDOWN;

Game = {};


Game.PlayGame = function(game){};
Game.Load = function(game){};

Game.Load.prototype = {
	preload : function(){
		this.stage.backgroundColor = "#000";
		this.preloadtext = this.add.text(this.game.world.centerX,this.game.world.centerY,"Loading..."+this.load.progress+"%",{ font: "20px Arial", fill: "#ff0044", align: "center" });
		this.preloadtext.anchor.setTo(0.5,0.5);
		var asset_dir = 'images';
		this.load.spritesheet('play', asset_dir + '/play.png',100,80);
		this.load.image('lose', asset_dir + '/lose.png');
		this.load.image('arrow', asset_dir + '/arrow.png');
		this.load.image('win', asset_dir + '/win.png');
		this.load.spritesheet('blocks', asset_dir + '/blocks.png',30,30);
		this.load.image('bck', asset_dir + '/Bck.png');
	},

	create : function(){
        this.game.state.start('MainMenu');
	}
};



Game.PlayGame.prototype = {

	create : function(){
		
		this.bck = this.game.add.sprite(0,0,'bck');
		this.game.world.bounds.x = 21;
		this.game.world.bounds.y = 0;
		this.game.world.bounds.width = gamePlayWidth;
		this.game.world.bounds.height = gamePlayHeight;

		this.game.blockGroup = this.game.add.group();
		this.focusblock = new Block(this.game,this.game.world.centerX,-40,this.chooseblock(),this.choosecolor(),1);
		this.nextblocktype = this.chooseblock();
		this.nextblockcolor = this.choosecolor();
		this.nextblock = new Block(this.game, 330, 271,this.nextblocktype,this.nextblockcolor,0.7);
		this.question = new Question(this.game);

		KEYRIGHT = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		KEYLEFT = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		KEYUP = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		KEYDOWN = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

		this.scoretext = this.add.text(344,355,"SCORE",{ font: "15px Arial", fill: "#ff0044", align: "center" });
		this.scoretext.anchor.setTo(0.5,0.5);
		this.scoretextmain = this.add.text(344,370," "+score+" ",{ font: "25px Arial", fill: "#000", align: "center" })

		oldsquares.length = 0;
		squaresinrow.length = 0;
		score = 0;
		this.force_down_max_time = force_down_max_time;

		this.disable();
	},

	pausebuttondown : function(){
		if ( this.game.paused == false ) {
			this.game.paused = true;
		} else { 
			this.game.paused = false;
		}
	},

	resetbuttondown : function(){

		this.game.state.start('MainMenu');

	},

	chooseblock : function(){

		var x = Math.floor(Math.random()*7);

		switch(x){

			case 0 : return 'o';

			case 1 : return 't';

			case 2 : return 'l';

			case 3 : return 'j';

			case 4 : return 'i';

			case 5 : return 's';

			case 6 : return 'z';

		}

	},

	choosecolor : function(){

		return Math.floor(Math.random()*5);

	},

	checkcompletedlines : function(){

		for(var i=0;i<20;i++){

			squaresinrow[i]=0;

		}

		var top = this.game.world.bounds.height - 19 * blockHeight - blockHeight / 2;

		var num_rows,rows;



		for(var i=0;i<oldsquares.length;i++){

			row = (oldsquares[i].y - top)/blockHeight;

			squaresinrow[row]++;

		}



		for(var i=0;i<20;i++){

			if(squaresinrow[i]==9){

				console.log(score);

				score+=100;

				for(var j=0;j<oldsquares.length;j++){

					if((oldsquares[j].y - top)/blockHeight==i){

						oldsquares[j].destroy();

						oldsquares.splice(j,1);

						j--;

					}

				}

			}

		}



		for(var i=0;i<oldsquares.length;i++){

			for(var j=0;j<20;j++){

				if(squaresinrow[j]==9){

					row = (oldsquares[i].y - top)/blockHeight;

					if(row<j){

						oldsquares[i].y += blockHeight;

					}

				}

			}

		}

	},

	update : function(){
		if ( this.game.time.now > force_down ) {
			if ( this.focusblock.wallcollide( oldsquares,'down' ) != true ) {
				this.focusblock.move('down');
			} else {
				for ( var i=0 ; i<4 ; i++ ) {
					oldsquares.push(this.focusblock.squares[i]);
				}
				this.focusblock = new Block(this.game,this.game.world.centerX,-40,this.nextblocktype,this.nextblockcolor,1);
				this.nextblocktype = this.chooseblock();
				this.nextblockcolor = this.choosecolor();
				for ( var i=0 ; i<4 ; i++ ) {
					this.nextblock.squares[i].destroy();
				}

				this.nextblock = new Block(this.game, 330, 271,this.nextblocktype,this.nextblockcolor,0.7);
				if ( this.focusblock.wallcollide( oldsquares,'down' ) == true ) {
					this.game.state.start('Lose');
				}
			}

			this.checkcompletedlines();

			this.scoretextmain.setText(score);

			if ( score>1900 ) { 
				this.game.state.start('Win');
			}

			force_down = this.game.time.now + this.force_down_max_time;

		}
		if ( ! this.disableStatus ) {
			if ( KEYRIGHT.isDown ){

				if(this.game.time.now>change_rot_time){

				if(this.focusblock.wallcollide(oldsquares,'right')!=true)	this.focusblock.move('right');

				change_rot_time = this.game.time.now + 100;

				}

			}

			if ( KEYLEFT.isDown ){

				if(this.game.time.now>change_rot_time){

				if(this.focusblock.wallcollide(oldsquares,'left')!=true)	this.focusblock.move('left');

				change_rot_time = this.game.time.now + 100;

				}

			}

			if ( KEYUP.isDown ){
				if ( this.game.time.now > change_rot_time ){
					if ( this.focusblock.rotatecollide(oldsquares) != true) {
						this.focusblock.rotate(); 
					}
					change_rot_time = this.game.time.now + 100;
				}

			}

			if ( KEYDOWN.isDown ){
				this.force_down_max_time = force_down_max_time / 10;
			} else {
				this.force_down_max_time = force_down_max_time;
			}
		}



	},

	disable: function( enable ) {
		if ( typeof enable !== 'undefined' && enable ) {
			this.disableStatus = false;
		} else {
			var md = this.game.width / 2;
			this.disableOverlay = new Phaser.Graphics( this.game, 0 , 0 );
			this.disableOverlay.beginFill( 0x000000, 0.7 ); //black, 0.7 transparency
			this.disableOverlay.drawRect( 0, 0, md, this.game.height );
			this.disableOverlay.endFill();
			this.disableOverlay = this.game.add.image( 0, 0, this.disableOverlay.generateTexture() );
			this.disableOverlay.bringToTop();
			this.disableStatus = true;
		}
	}

};

