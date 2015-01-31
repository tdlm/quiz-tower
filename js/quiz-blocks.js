/* Made by Nambiar - Game Dolphin 

Feel free to use and learn from */

Game = {};

var w = 400;
var h = 600;
var score = 0;
var width = 30;
var height = 30;
var force_down_max_time = 500;

Game.Load = function(game){

};

Game.Load.prototype = {
	preload : function(){
		this.stage.backgroundColor = "#000";
		this.preloadtext = this.add.text(this.game.world.centerX,this.game.world.centerY,"Loading..."+this.load.progress+"%",{ font: "20px Arial", fill: "#ff0044", align: "center" });
		this.preloadtext.anchor.setTo(0.5,0.5);
		var asset_dir = 'images';
		this.load.spritesheet('play', asset_dir + '/play.png',100,80);
		this.load.image('pause', asset_dir + '/Pause.png');
		this.load.image('reset', asset_dir + '/refresh.png');
		this.load.image('lose', asset_dir + '/lose.png');
		this.load.image('arrow', asset_dir + '/arrow.png');
		this.load.image('win', asset_dir + '/win.png');
		this.load.spritesheet('blocks', asset_dir + '/blocks.png',30,30);
		this.load.image('bck', asset_dir + '/Bck.png');
	},

	create : function(){
        this.game.state.start('MainMenu');
	}
};;/* Made by Nambiar - Game Dolphin 

Feel free to use and learn from */

Game.MainMenu = function(game){



};



Game.MainMenu.prototype = {

	create : function(){

		

		this.game.world.bounds.x = 0;

		this.game.world.bounds.y = 0;

		this.game.world.bounds.width = 400;

		this.game.world.bounds.height = 600;

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

		this.game.world.bounds.x = 0;

		this.game.world.bounds.y = 0;

		this.game.world.bounds.width = 400;

		this.game.world.bounds.height = 600;

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

		this.game.world.bounds.x = 0;

		this.game.world.bounds.y = 0;

		this.game.world.bounds.width = 400;

		this.game.world.bounds.height = 600;



		this.winimage = this.game.add.sprite(0,0,'win');

		this.playbutton = this.add.button(this.game.world.centerX, 500, 'play',this.playclicked,this,1,0,2);

		this.playbutton.anchor.setTo(0.5,0.5);

		this.tweenplay = this.game.add.tween(this.playbutton).to({y:550},1000,Phaser.Easing.Sinusoidal.InOut,true,0,100,true);

		

	},

	playclicked : function() {

		score = 0;

		this.game.state.start('Game');

	},

};;/* Made by Nambiar - Game Dolphin 

Feel free to use and learn from */

Block = function(game,x,y,type,color,scale){

	this.centerX = x;

	this.centerY = y;

	this.blocktype = type;	

	this.blockcolor = color;

	this.game = game;

	this.squares = new Array();

	this.scale = scale;

	this.setupsquares();

};

var md = width/2;

Block.prototype = {

	setupsquares : function(){

		this.squares.length = 0;

		

		switch(this.blocktype){

			case 'o' : 	this.squares[0] = this.game.add.sprite(this.centerX-md,this.centerY-md,'blocks',this.blockcolor);

						this.squares[1] = this.game.add.sprite(this.centerX-md,this.centerY+md,'blocks',this.blockcolor);

						this.squares[2] = this.game.add.sprite(this.centerX+md,this.centerY+md,'blocks',this.blockcolor);

						this.squares[3] = this.game.add.sprite(this.centerX+md,this.centerY-md,'blocks',this.blockcolor);

						break;

			case 't' : 	this.squares[0] = this.game.add.sprite(this.centerX+md,this.centerY-md,'blocks',this.blockcolor);

						this.squares[1] = this.game.add.sprite(this.centerX+md,this.centerY+md,'blocks',this.blockcolor);

						this.squares[2] = this.game.add.sprite(this.centerX-md,this.centerY+md,'blocks',this.blockcolor);

						this.squares[3] = this.game.add.sprite(this.centerX+md*3,this.centerY+md,'blocks',this.blockcolor);

						break;

			case 'l' : 	this.squares[0] = this.game.add.sprite(this.centerX-md,this.centerY-md,'blocks',this.blockcolor);

						this.squares[1] = this.game.add.sprite(this.centerX-md,this.centerY+md,'blocks',this.blockcolor);

						this.squares[2] = this.game.add.sprite(this.centerX-md,this.centerY+md*3,'blocks',this.blockcolor);

						this.squares[3] = this.game.add.sprite(this.centerX+md,this.centerY+md*3,'blocks',this.blockcolor);

						break;

			case 'j' : 	this.squares[0] = this.game.add.sprite(this.centerX+md,this.centerY-md,'blocks',this.blockcolor);

						this.squares[1] = this.game.add.sprite(this.centerX+md,this.centerY+md,'blocks',this.blockcolor);

						this.squares[2] = this.game.add.sprite(this.centerX+md,this.centerY+md*3,'blocks',this.blockcolor);

						this.squares[3] = this.game.add.sprite(this.centerX-md,this.centerY+md*3,'blocks',this.blockcolor);

						break;

			case 'i' :  this.squares[0] = this.game.add.sprite(this.centerX+md,this.centerY-md*3,'blocks',this.blockcolor);

						this.squares[1] = this.game.add.sprite(this.centerX+md,this.centerY-md,'blocks',this.blockcolor);

						this.squares[2] = this.game.add.sprite(this.centerX+md,this.centerY+md,'blocks',this.blockcolor);

						this.squares[3] = this.game.add.sprite(this.centerX+md,this.centerY+md*3,'blocks',this.blockcolor);

						break;

			case 's' :  this.squares[0] = this.game.add.sprite(this.centerX+md*3,this.centerY-md,'blocks',this.blockcolor);

						this.squares[1] = this.game.add.sprite(this.centerX+md,this.centerY-md,'blocks',this.blockcolor);

						this.squares[2] = this.game.add.sprite(this.centerX+md,this.centerY+md,'blocks',this.blockcolor);

						this.squares[3] = this.game.add.sprite(this.centerX-md,this.centerY+md,'blocks',this.blockcolor);

						break;

			case 'z' :  this.squares[0] = this.game.add.sprite(this.centerX-md,this.centerY-md,'blocks',this.blockcolor);

						this.squares[1] = this.game.add.sprite(this.centerX+md,this.centerY-md,'blocks',this.blockcolor);

						this.squares[2] = this.game.add.sprite(this.centerX+md,this.centerY+md,'blocks',this.blockcolor);

						this.squares[3] = this.game.add.sprite(this.centerX+md*3,this.centerY+md,'blocks',this.blockcolor);

						break;

		}

		for(var i=0;i<this.squares.length;i++){

		this.squares[i].anchor.setTo(0.5,0.5);

		this.squares[i].scale.setTo(this.scale,this.scale)

		this.squares[i].collideWorldBounds = true;

		}	

	},



	move : function(dir){

		switch(dir){

			case 'left' : 	this.centerX -= width;

							for(var i=0;i<this.squares.length;i++){

								this.squares[i].x -= width;

							}

							break;

			case 'right' : 	this.centerX += width;

							for(var i=0;i<this.squares.length;i++){

								this.squares[i].x += width;

							}

							break;

			case 'down' : 	this.centerY += height;

							for(var i=0;i<this.squares.length;i++){

								this.squares[i].y += height;

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



	wallcollide : function(oldsquares,dir){

		len = oldsquares.length;

		if(len==0){

			switch(dir){

				case 'left' : for(var i=0;i<4;i++){

					if(this.squares[i].x-2*md<this.game.world.bounds.x) return true;

				}

				break;



				case 'right' : for(var i=0;i<4;i++){

					if(this.squares[i].x+2*md>this.game.world.bounds.width) return true;

				}

				break;

				case 'down' : for(var i=0;i<4;i++){

					if(this.squares[i].y+2*md>this.game.world.height) return true;

				}

				break;

				default : return false;



			}

		}else{

		switch(dir){

			case 'left'  : 	for(var i=0;i<4;i++){

				for(var j=0;j<len;j++){

					if(this.squares[i].x-md<this.game.world.bounds.x||(this.squares[i].x>oldsquares[j].x&&this.squares[i].x-3*md<oldsquares[j].x&&this.squares[i].y==oldsquares[j].y)) return true;

				}

			}

			break;



			case 'right' : 	for(var i=0;i<4;i++){

				for(var j=0;j<len;j++){

					if(this.squares[i].x+md>this.game.world.bounds.width||(this.squares[i].x<oldsquares[j].x&&this.squares[i].x+3*md>oldsquares[j].x&&this.squares[i].y==oldsquares[j].y)) return true;

				}

			}

			break;



			case 'down'  : 	for(var i=0;i<4;i++){

				for(var j=0;j<len;j++){

					if(this.squares[i].y+2*md>this.game.world.bounds.height||(this.squares[i].y+3*md>oldsquares[j].y&&this.squares[i].x==oldsquares[j].x)) return true;

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

			if ( (arr[i*2] < this.game.world.bounds.x) ||  (arr[i*2] > this.game.world.bounds.width) ) return true;

			if(arr[i*2+1]>this.game.world.bounds.height) return true;

			for(var j=0;j<len;j++){

				if ( ( Math.abs(arr[i*2] - oldsquares[j].x) < width ) && ( Math.abs(arr[i*2+1] - oldsquares[j].y) < height ) ){

					return true;

            	}

			}

		}

		return false;

	}



};;Game.PlayGame = function(game){
	this.currentlevel;
};
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

var KEYLEFT;
var KEYRIGHT;
var KEYUP;
var KEYDOWN;


Game.PlayGame.prototype = {

	create : function(){

		this.bck = this.game.add.sprite(0,0,'bck');

		this.game.world.bounds.x = 21;

		this.game.world.bounds.y = 0;

		this.game.world.bounds.width = typeof gameWidth == 'undefined' ? 400 : gameWidth;

		this.game.world.bounds.height = typeof gameHeight == 'undefined' ? 600 : gameHeight;

		this.focusblock = new Block(this.game,this.game.world.centerX,-40,this.chooseblock(),this.choosecolor(),1);

		this.nextblocktype = this.chooseblock();

		this.nextblockcolor = this.choosecolor();

		this.nextblock = new Block(this.game, 330, 271,this.nextblocktype,this.nextblockcolor,0.7);



		KEYRIGHT = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

		KEYLEFT = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);

		KEYUP = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);

		KEYDOWN = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

		

		this.scoretext = this.add.text(344,355,"SCORE",{ font: "15px Arial", fill: "#ff0044", align: "center" });

		this.scoretext.anchor.setTo(0.5,0.5);

		this.scoretextmain = this.add.text(344,370," "+score+" ",{ font: "15px Arial", fill: "#fff", align: "center" })

		

		this.resetbutton = this.add.sprite(320,520,'reset');

		this.pausebutton = this.add.sprite(320,460,'pause');

		this.pausebutton.inputEnabled = true;

		this.resetbutton.inputEnabled = true;

		this.pausebutton.events.onInputDown.add(this.pausebuttondown,this.pausebutton);

		this.resetbutton.events.onInputDown.add(this.resetbuttondown,this.resetbutton);



		oldsquares.length = 0;

		squaresinrow.length = 0;

		score = 0;

		

	},

	pausebuttondown : function(){

		if(this.game.paused==false)

		{

			this.game.paused = true;

		} 

		else

		{ this.game.paused = false;

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

		var top = this.game.world.bounds.height - 19*height - height/2;

		var num_rows,rows;



		for(var i=0;i<oldsquares.length;i++){

			row = (oldsquares[i].y - top)/height;

			squaresinrow[row]++;

		}



		for(var i=0;i<20;i++){

			if(squaresinrow[i]==9){

				console.log(score);

				score+=100;

				for(var j=0;j<oldsquares.length;j++){

					if((oldsquares[j].y - top)/height==i){

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

					row = (oldsquares[i].y - top)/height;

					if(row<j){

						oldsquares[i].y += height;

					}

				}

			}

		}

	},



	update : function(){

		if(this.game.time.now>force_down)

		{

			if(this.focusblock.wallcollide(oldsquares,'down')!=true)	this.focusblock.move('down');

			else{

				for(var i=0;i<4;i++){

					oldsquares.push(this.focusblock.squares[i]);

				}

				this.focusblock = new Block(this.game,this.game.world.centerX,-40,this.nextblocktype,this.nextblockcolor,1);

				this.nextblocktype = this.chooseblock();

				this.nextblockcolor = this.choosecolor();

				for(var i=0;i<4;i++){

					this.nextblock.squares[i].destroy();

				}

				this.nextblock = new Block(this.game, 330, 271,this.nextblocktype,this.nextblockcolor,0.7);

				if(this.focusblock.wallcollide(oldsquares,'down')==true) { this.game.state.start('Lose');}

			}

			this.checkcompletedlines();

			this.scoretextmain.setText(score);

			if(score>1900){ this.game.state.start('Win');

			}

			force_down = this.game.time.now + force_down_max_time;

		}

		if(KEYRIGHT.isDown){

			if(this.game.time.now>change_rot_time){

			if(this.focusblock.wallcollide(oldsquares,'right')!=true)	this.focusblock.move('right');

			change_rot_time = this.game.time.now + 100;

			}

		}

		if(KEYLEFT.isDown){

			if(this.game.time.now>change_rot_time){

			if(this.focusblock.wallcollide(oldsquares,'left')!=true)	this.focusblock.move('left');

			change_rot_time = this.game.time.now + 100;

			}

		}

		if(KEYUP.isDown){

			if(this.game.time.now>change_rot_time){

				if(this.focusblock.rotatecollide(oldsquares)!=true)		this.focusblock.rotate(); 

				change_rot_time = this.game.time.now + 100;

			}

		}

		if(KEYDOWN.isDown){

			force_down_max_time = 50;

		}

		else {

			force_down_max_time = 500;

		}



	}

};

;window.onload = function() {
	var gameWidth = 400;
	var gameHeight = 600;

	var gamevar = new Phaser.Game(w,h,Phaser.AUTO,'container');

	gamevar.state.add('Load',Game.Load);

	gamevar.state.add('MainMenu',Game.MainMenu);

	gamevar.state.add('Game',Game.PlayGame);

	gamevar.state.add('Lose',Game.LoseScreen);

	gamevar.state.add('Win',Game.WinScreen);

	gamevar.state.start('Load');
}