var questions;
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
		this.game.add.text( 420, 20, question_title, question_title_style );
		var answerLoc = 60;
		for ( i in answers ) {
			var answer = this.game.add.text( 420, answerLoc, answers[ i ][ 'value' ], answers_style );
			answer.inputEnabled = true;
			//Event for answer click
			answer.events.onInputDown.add( this.answerClick, { 'game': this.game, 'answer': answers[ i ] } );
			answer.input.useHandCursor = true;
			answerLoc += 40;
		}
	},
	answerClick: function() {
		if ( typeof this.answer.correct !== 'undefined' ) {
			alert('YOU ARE RIGHT');
		} else {
			alert('YOU ARE WRONG')
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
};