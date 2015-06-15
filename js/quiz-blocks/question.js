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
};