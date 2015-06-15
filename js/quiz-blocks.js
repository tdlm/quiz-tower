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

var default_overlay_text = 'Answer to gain control!';
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
		this.scoretextmain = this.add.text(344,390," "+score+" ",{ font: "25px Arial", fill: "#000", align: "center" })
		this.scoretextmain.anchor.setTo(0.5,0.5);
		this.default_overlay_text = default_overlay_text;

		oldsquares.length = 0;
		squaresinrow.length = 0;
		score = 0;
		this.force_down_max_time = force_down_max_time;
		this.next_refresh_time = 0;

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

	update: function(){
		if ( this.game.time.now > this.next_refresh_time ) {
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

				this.force_down_max_time = force_down_max_time; //Resetting speed

				this.question = new Question(this.game); //Generate new question
				this.disable();
			}

			this.checkcompletedlines();

			this.scoretextmain.setText(score);

			if ( score>1900 ) { 
				this.game.state.start('Win');
			}

			this.next_refresh_time = this.game.time.now + this.force_down_max_time;

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
	
	disable: function( disable ) {
		if ( typeof disable !== 'undefined' && disable == false ) {
			this.overlay_text.visible = false;
			this.disableOverlay.visible = false;
			this.disableStatus = false;
		} else if ( typeof this.disableOverlay == 'undefined' || this.disableOverlay.game === null ) {
			var md = this.game.width / 2;
			this.disableOverlay = new Phaser.Graphics( this.game, 0 , 0 );
			this.disableOverlay.beginFill( 0x000000, 0.7 ); //black, 0.7 transparency
			this.disableOverlay.drawRect( 0, 0, md, this.game.height );
			this.disableOverlay.endFill();
			this.disableOverlay = this.game.add.image( 0, 0, this.disableOverlay.generateTexture() );
			this.disableOverlay.bringToTop();
			this.disableStatus = true;

			//Message part!
			var style = { font: "64px Arial", fill: "#990000", wordWrap: true, wordWrapWidth: md, align: "center" };
			this.overlay_text = this.game.add.text( md / 2, this.game.height / 3, this.default_overlay_text, style );
			this.overlay_text.anchor.set(0.5);
		} else {
			this.overlay_text.visible = true;
			this.disableOverlay.visible = true;
			this.disableStatus = true;
		}
	}

};

;/* Made by Nambiar - Game Dolphin 

Feel free to use and learn from */

Game.MainMenu = function(game){



};



Game.MainMenu.prototype = {

	create : function(){
		this.game.world.bounds.x = 0;

		this.game.world.bounds.y = 0;

		if ( typeof this.game.world.bounds.width == 'undefined' )
			this.game.world.bounds.width = typeof gameWidth == 'undefined' ? 400 : gameWidth;

		if ( typeof this.game.world.bounds.height == 'undefined' )
			this.game.world.bounds.height = typeof gameHeight == 'undefined' ? 600 : gameHeight;

		this.playbutton = this.add.button(this.game.world.centerX, this.game.world.centerY-40,'play',this.playclicked,this,1,0,2);

		this.playbutton.anchor.setTo(0.5,0.5);

		this.tweenplay = this.game.add.tween(this.playbutton).to({y:300},1000,Phaser.Easing.Sinusoidal.InOut,true,0,100,true);



		this.arrows = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY+180,'arrow');

		this.arrows.anchor.setTo(0.5,0.5);

		this.arrows.scale.setTo(0.6,0.6);

	},



	playclicked : function() {
		score = 0;
		this.game.state.start('Game');
	},
};





Game.LoseScreen = function(game){



};



Game.LoseScreen.prototype = {

	create : function(){

		this.lose = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'lose');

		this.lose.anchor.setTo(0.5,0.5);

		this.playbutton = this.add.button(this.game.world.centerX, 40, 'play',this.playclicked,this,1,0,2);

		this.playbutton.anchor.setTo(0.5,0.5);

		this.tweenplay = this.game.add.tween(this.playbutton).to({y:50},1000,Phaser.Easing.Sinusoidal.InOut,true,0,100,true);

		this.scoretextmain = this.add.text(this.game.world.centerX,450,score,{ font: "40px Arial", fill: "#fff", align: "center" })

		this.scoretextmain.anchor.setTo(0.5,0.5);

		

	},

	playclicked : function() {

		score = 0;

		this.game.state.start('Game');

	},



};



Game.WinScreen = function(game){



};



Game.WinScreen.prototype = {

	create : function(){

		this.winimage = this.game.add.sprite(0,0,'win');

		this.playbutton = this.add.button(this.game.world.centerX, 500, 'play',this.playclicked,this,1,0,2);

		this.playbutton.anchor.setTo(0.5,0.5);

		this.tweenplay = this.game.add.tween(this.playbutton).to({y:550},1000,Phaser.Easing.Sinusoidal.InOut,true,0,100,true);

		

	},

	playclicked : function() {

		score = 0;

		this.game.state.start('Game');

	},

};;Block = function(game,x,y,type,color,scale){
	this.centerX = x;
	this.centerY = y;

	this.blocktype = type;	
	this.blockcolor = color;

	this.game = game;
	this.squares = new Array();
	this.scale = scale;
	this.squareBottomPos = 0; //To calculate the stepstocollide
	this.setupsquares();
};

Block.prototype = {
	setupsquares : function(){

		this.squares.length = 0;
		var md = ( blockWidth * this.scale ) / 2;
		
		switch(this.blocktype){
			case 'o' :
				this.squares[0] = this.game.add.sprite(this.centerX-md,this.centerY-md,'blocks',this.blockcolor);
				this.squares[1] = this.game.add.sprite(this.centerX-md,this.centerY+md,'blocks',this.blockcolor);
				this.squares[2] = this.game.add.sprite(this.centerX+md,this.centerY+md,'blocks',this.blockcolor);
				this.squares[3] = this.game.add.sprite(this.centerX+md,this.centerY-md,'blocks',this.blockcolor);
				break;
			case 't' :
				this.squares[0] = this.game.add.sprite(this.centerX+md,this.centerY-md,'blocks',this.blockcolor);
				this.squares[1] = this.game.add.sprite(this.centerX+md,this.centerY+md,'blocks',this.blockcolor);
				this.squares[2] = this.game.add.sprite(this.centerX-md,this.centerY+md,'blocks',this.blockcolor);
				this.squares[3] = this.game.add.sprite(this.centerX+md*3,this.centerY+md,'blocks',this.blockcolor);
				break;

			case 'l' : 
				this.squares[0] = this.game.add.sprite(this.centerX-md,this.centerY-md,'blocks',this.blockcolor);
				this.squares[1] = this.game.add.sprite(this.centerX-md,this.centerY+md,'blocks',this.blockcolor);
				this.squares[2] = this.game.add.sprite(this.centerX-md,this.centerY+md*3,'blocks',this.blockcolor);
				this.squares[3] = this.game.add.sprite(this.centerX+md,this.centerY+md*3,'blocks',this.blockcolor);
				break;
			case 'j' :
				this.squares[0] = this.game.add.sprite(this.centerX+md,this.centerY-md,'blocks',this.blockcolor);
				this.squares[1] = this.game.add.sprite(this.centerX+md,this.centerY+md,'blocks',this.blockcolor);
				this.squares[2] = this.game.add.sprite(this.centerX+md,this.centerY+md*3,'blocks',this.blockcolor);
				this.squares[3] = this.game.add.sprite(this.centerX-md,this.centerY+md*3,'blocks',this.blockcolor);
				break;
			case 'i' :
				this.squares[0] = this.game.add.sprite(this.centerX+md,this.centerY-md*3,'blocks',this.blockcolor);
				this.squares[1] = this.game.add.sprite(this.centerX+md,this.centerY-md,'blocks',this.blockcolor);
				this.squares[2] = this.game.add.sprite(this.centerX+md,this.centerY+md,'blocks',this.blockcolor);
				this.squares[3] = this.game.add.sprite(this.centerX+md,this.centerY+md*3,'blocks',this.blockcolor);
				break;
			case 's' :
				this.squares[0] = this.game.add.sprite(this.centerX+md*3,this.centerY-md,'blocks',this.blockcolor);
				this.squares[1] = this.game.add.sprite(this.centerX+md,this.centerY-md,'blocks',this.blockcolor);
				this.squares[2] = this.game.add.sprite(this.centerX+md,this.centerY+md,'blocks',this.blockcolor);
				this.squares[3] = this.game.add.sprite(this.centerX-md,this.centerY+md,'blocks',this.blockcolor);
				break;
			case 'z' :
				this.squares[0] = this.game.add.sprite(this.centerX-md,this.centerY-md,'blocks',this.blockcolor);
				this.squares[1] = this.game.add.sprite(this.centerX+md,this.centerY-md,'blocks',this.blockcolor);
				this.squares[2] = this.game.add.sprite(this.centerX+md,this.centerY+md,'blocks',this.blockcolor);
				this.squares[3] = this.game.add.sprite(this.centerX+md*3,this.centerY+md,'blocks',this.blockcolor);
				break;
		}

		for ( var i=0;i<this.squares.length;i++ ){
			this.squares[i].anchor.setTo(0.5,0.5);
			this.squares[i].scale.setTo(this.scale,this.scale);
			this.squares[i].collideWorldBounds = true;
			this.game.physics.enable( this.squares[i], Phaser.Physics.ARCADE );

			this.game.blockGroup.add( this.squares[i] );
		}	
	},

	move : function(dir){
		switch(dir){
			case 'left' :
			this.centerX -= blockWidth;
			for(var i=0;i<this.squares.length;i++){
				this.squares[i].x -= blockWidth;
			}
			break;
			case 'right' :
				this.centerX += blockWidth;
				for(var i=0;i<this.squares.length;i++){
					this.squares[i].x += blockWidth;
				}
				break;
			case 'down' :
				this.centerY += blockHeight;
				for(var i=0;i<this.squares.length;i++){
					this.squares[i].y += blockHeight;
				}
				break;
		}
	},
	rotate : function(){

		var x1,x2,y1,y2;

		for (var i=0; i<this.squares.length; i++){

		// Get the center of the current square
		x1 = this.squares[i].x;
		y1 = this.squares[i].y;

		// Move the square so it's positioned at the origin 
		x1 -= this.centerX;
		y1 -= this.centerY;

        // Do the actual rotation
		x2 = - y1;
		y2 = x1;

        // Move the square back to its proper location 
		x2 += this.centerX;
		y2 += this.centerY;

        // Set the square's location to our temporary variables 
		this.squares[i].x = x2;
		this.squares[i].y = y2;

    	}
	},

	getrotated : function(){
		var temp_array = new Array();
    	var x1, y1, x2, y2;

    	for (var i=0; i<this.squares.length; i++){    
			x1 = this.squares[i].x;
			y1 = this.squares[i].y;
			x1 -= this.centerX;
			y1 -= this.centerY;

			x2 = - y1;
			y2 = x1;

			x2 += this.centerX;
			y2 += this.centerY;

			// Instead of setting the squares, we just store the values
			temp_array[i*2]   = x2;
			temp_array[i*2+1] = y2;
    	}



    	return temp_array;
	},

	//How many steps to collide the lower edge
	stepstocollide : function( oldsquares ) {
		//this.game.world.
	},

	wallcollide : function(oldsquares,dir){

		len = oldsquares.length;
		var md = blockWidth / 2;

		if ( len==0 ){
			switch( dir ) {
				case 'left' : 
					for(var i=0;i<4;i++){
						if(this.squares[i].x-2*md<this.game.world.bounds.x) 
							return true;
					}
				break;
				case 'right' : 
					for(var i=0;i<4;i++){
						if(this.squares[i].x+2*md>this.game.world.bounds.width) 
							return true;
					}
				break;
				case 'down' : 
					for(var i=0;i<4;i++){
						if ( this.squares[i].y+2*md>this.game.world.bounds.height ) {
							if ( this.squares[i].y > this.squareBottomPos ) {
								this.squareBottomPos = this.squares[i].y;
							}
							return true;
						}
							
					}
				break;
				default : return false;
			}
		} else {
			switch( dir ){
				case 'left'  : 	
					for(var i=0;i<4;i++){
						for(var j=0;j<len;j++){
							if(this.squares[i].x-md<this.game.world.bounds.x||(this.squares[i].x>oldsquares[j].x&&this.squares[i].x-3*md<oldsquares[j].x&&this.squares[i].y==oldsquares[j].y)) 
								return true;
						}
					}
				break;
				case 'right' : 	
					for(var i=0;i<4;i++){
						for(var j=0;j<len;j++){
							if(this.squares[i].x+md>this.game.world.bounds.width||(this.squares[i].x<oldsquares[j].x&&this.squares[i].x+3*md>oldsquares[j].x&&this.squares[i].y==oldsquares[j].y)) 
								return true;
					}
				}
				break;
				case 'down'  : 	
					for(var i=0;i<4;i++){
						for(var j=0;j<len;j++){
							if(this.squares[i].y+2*md>this.game.world.bounds.height||(this.squares[i].y+3*md>oldsquares[j].y&&this.squares[i].x==oldsquares[j].x)) {
								if ( this.squares[i].y > this.squareBottomPos ) {
									this.squareBottomPos = this.squares[i].y;
								}
								return true;
							}
						}

					}
				break;
				default 	 :  return false; 
			}
		}
	},

	rotatecollide : function(oldsquares){

		var arr = this.getrotated();

		var len = oldsquares.length;

		for(var i=0;i<4;i++){

			if ( (arr[i*2] < this.game.world.bounds.x) ||  (arr[i*2] > this.game.width) ) return true;

			if(arr[i*2+1]>this.game.height) return true;

			for(var j=0;j<len;j++){

				if ( ( Math.abs(arr[i*2] - oldsquares[j].x) < blockWidth ) && ( Math.abs(arr[i*2+1] - oldsquares[j].y) < blockHeight ) ){

					return true;

            	}

			}

		}

		return false;
	}



};;var questions;
Question = function( game, category ){
	this.game = game;
	var that = this;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
			questions = JSON.parse( xmlhttp.responseText );
			that.setupQuestion();
		}
	}

	xmlhttp.open( 'GET', 'data/questions.json', true );
	xmlhttp.send();

};

Question.prototype = {
	setupQuestion: function() {
		var category = randomProperty( questions, true ); //Random Category
		var question = randomProperty( questions[ category ] ); //Random Question
		var question_title = question.question;
		var answers = question.answers;
		var question_title_style = { font: "24px Arial", fill: "#000", align: "left" };
		var answers_style = { font: "16px Arial", fill: "#000", align: "left" };
		if ( typeof this.game.question_title == 'undefined' || this.game.question_title.game === null ) {
			this.game.question_title = this.game.add.text( 420, 20, question_title, question_title_style );
		} else {
			this.game.question_title.setText( question_title );
		}
		
		var answerLoc = 60;
		if ( typeof this.game.answers == 'undefined' )
			this.game.answers = {};

		for ( i in answers ) {
			if ( typeof this.game.answers[ i ] == 'undefined' || this.game.answers[ i ].game === null ) {
				this.game.answers[ i ] = this.game.add.text( 420, answerLoc, answers[ i ][ 'value' ], answers_style );
				this.game.answers[ i ].inputEnabled = true;
				//Event for answer click
				this.game.answers[ i ].input.useHandCursor = true;
			} else {
				this.game.answers[ i ].setText( answers[ i ][ 'value' ] ); //setting new answer text
				this.game.answers[ i ].events.onInputDown.removeAll(); //removing old event
			}
			this.game.answers[ i ].events.onInputDown.add( this.answerClick, { 'game': this.game, 'answer': answers[ i ] } );
			answerLoc += 40;
		}
	},
	answerClick: function() {
		var currentState = this.game.state.getCurrentState();
		if ( typeof this.answer.correct !== 'undefined' ) {
			currentState.disable( false ); //Enable
		} else {
			currentState.overlay_text.setText( 'Wrong Answer!' );
			setTimeout( function() {
				currentState.overlay_text.setText( currentState.default_overlay_text );
			}, 1000 );
		}
	}
};

//Return random property of an object, if returnPropertyName is true - return property name
function randomProperty( obj, returnPropertyName ) {
	var keys = Object.keys(obj);
	if ( typeof returnPropertyName !== 'undefined' && returnPropertyName ) {
		return keys[ keys.length * Math.random() << 0];
	}

	return obj[keys[ keys.length * Math.random() << 0]];
};;window.onload = function() {
	var gameWidth = 800;
	var gameHeight = 600;


	var gamevar = new Phaser.Game( gameWidth, gameHeight, Phaser.AUTO, 'container' );

	gamevar.state.add('Load',Game.Load);

	gamevar.state.add('MainMenu',Game.MainMenu);

	gamevar.state.add('Game',Game.PlayGame);

	gamevar.state.add('Lose',Game.LoseScreen);

	gamevar.state.add('Win',Game.WinScreen);

	gamevar.state.start('Load');
}