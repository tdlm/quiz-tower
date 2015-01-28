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
};