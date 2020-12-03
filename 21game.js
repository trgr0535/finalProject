
/*
 window.speechSynthesis.cancel();

if ('speechSynthesis' in window) {
	alert("this works fjdkslafds")
	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	msg.voice = voices[10];
	msg.volume = 1; // From 0 to 1
	msg.rate = 1; // From 0.1 to 10
	msg.pitch = 2; // From 0 to 2
	msg.text = "it works i think";
	msg.lang = 'en-US';
	speechSynthesis.speak(msg);
}else{
  // Speech Synthesis Not Supported 😣
  alert("Sorry, your browser doesn't support text to speech!");
}
*/


var msg = new SpeechSynthesisUtterance('Hello, this is an accessbile game of blackjack. Use commands start and reset. Then use commands hit me, or stand, to direct the game');
msg.lang = 'en-US';
window.speechSynthesis.speak(msg);

alert('Hello, this is an accessbile game of blackjack. Please say start to start, reset to start over once you have started, your card will be read aloud, say hit to hit or stand to stand')


window.addEventListener('keydown', function (event) {
var key = event.which || event.keyCode;
if (key === 32) { // spacebar
	startListening()
	}


});


		var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
		var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
		var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

		var colors = [ 'hit' , 'stand' , 'fold', 'start', 'reset', 'hit me', 'what does the dealer have', 'seven', 'eight', 'nine', '/', '*', '-'];
		var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

		var recognition = new SpeechRecognition();
		var speechRecognitionList = new SpeechGrammarList();
		speechRecognitionList.addFromString(grammar, 1);
		recognition.grammars = speechRecognitionList;
		recognition.continuous = false;
		recognition.lang = 'en-US';
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;




		function startListening() {
		recognition.start();
		}
		//function stopListening() {
		//recognition.stop();
		//}

		recognition.onresult = function(event) {
	var word = event.results[0][0].transcript;
	//stopListening()


	if(word == 'start'){
		$('li').remove();
		$('.pscore p').remove();
		$('.score h1').remove();
			playGame();
	}



	if(word == 'reset'){
		$('li').remove();
		$('.pscore p').remove();
		$('.score h1').remove();
		$('.dealers_cards').css("height", "96px");
	}


	if(word == 'hit'){
			playerHand.hitMe("p");
			result = firstResultCheck();
			inputUserScore(result);
			if(isNumeric(result)){
				viewConsole();
			} else {
				hideConsole();
				return;
			}
		}
		if(word == 'hit me'){
				playerHand.hitMe("p");
				result = firstResultCheck();
				inputUserScore(result);
				if(isNumeric(result)){
					viewConsole();
				} else {
					hideConsole();
					return;
				}
			}
	if(word == 'stand'){
		while(dealerHand.score() < 17){
			countingDealersCards = 0;
			dealerHand.hitMe("b");
		}
		result = finalResultCheck();
		$('.dealers_cards li').remove();
		revealDealerHand(dealerHand);
		inputUserScore(result);
		hideConsole();
		return;
	}
}



$(document).ready(function() {

	// reset button will reset the table
	$('#reset').click(function() {
    	$('li').remove();
    	$('.pscore p').remove();
    	$('.score h1').remove();
    	$('.dealers_cards').css("height", "96px");
    });

    // start button will reset the table and start the game
    $('#start').click(function() {
    	$('li').remove();
    	$('.pscore p').remove();
    	$('.score h1').remove();
        playGame();
    });


    $('#hit').click(function() {
		playerHand.hitMe("p");
		result = firstResultCheck();
		inputUserScore(result);
		if(isNumeric(result)){
			viewConsole();
		} else {
			hideConsole();
			return;
		}
    });


    $('#stand').click(function() {
    	while(dealerHand.score() < 17){
    		countingDealersCards = 0;
    		dealerHand.hitMe("b");
    	}
		result = finalResultCheck();
		$('.dealers_cards li').remove();
		revealDealerHand(dealerHand);
		inputUserScore(result);
		hideConsole();
		return;
    });
});

//Card face finder
function cardFace(suit, figure){
	suits = {1: "clubs", 2: "diamonds", 3: "hearts", 4: "spades"};
	figures = {1: "ace", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "jack", 12: "queen", 13: "king"};
	var c = figures[figure] + "_of_" + suits[suit] + ".svg";
	return c;
}

//Deck_constructor
function deck(){
	this.create = function(){
  	var cardArray = [];
  	var i = 1;
  	var j = 1;
  		for(i = 1; i < 14; i++){
  			for(j = 1; j < 5; j++){
  				cardArray.push(new Card(j, i));
  			}
  		}
  	return shuffle(shuffle(cardArray));
  };
}

//check The Deck Constructor
function deckChecker(){
	var array = new deck();
	var array = array.create();
	for(i = 0; i < 52; i++){
	  console.log(array[i].getNumber() + " of suit "+array[i].getSuit());
	}
}

//Deck suffling
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
	return a;
}

//Card Constructor
function Card(suit, number){
	var CardSuit = suit;
	var CardNumber = number;
	this.getSuit = function(){
		return CardSuit;
	};
	this.getNumber = function(){
		return CardNumber;
	};
	this.getValue = function(){
    if( number === 1) {
        return 11;
    } else if( number > 9) {
        return 10;
    } else {
    return number;
    }
	};
}

function revealDealerHand(hand){
	var hand = hand.getHand();
	for(i=0;i<hand.length;i++){
		$('.dealers_cards ul').prepend('<li><a href="#"><img src="cards/' + cardFace(hand[i].getSuit(), hand[i].getNumber()) + '" /></a></li>');
	}
}

// Deal function provides players with cards and prepend card images with jQuery
var deal = function(whos){
	var newCard = gameDeck.pop();
	if(whos == "b"){
		countingDealersCards+= 1;
	}
	// I would like to automate the correct div selection, but it dosn't work for now.
	if(whos == "p"){
		$('.players_cards ul').prepend('<li><a href="#"><img src="cards/' + cardFace(newCard.getSuit(), newCard.getNumber()) + '" /></a></li>');
	} else if(whos == "b" && countingDealersCards < 2) {
		$('.dealers_cards').css("height", "");
		$('.dealers_cards ul').prepend('<li><a href="#"><img src="cards/' + cardFace(newCard.getSuit(), newCard.getNumber()) + '" /></a></li>');
	} else if(whos == "b" && countingDealersCards == 2){
		$('.dealers_cards ul').prepend('<li><a href="#"><img src="cards/back.jpg" /></a></li>');
	}
	return newCard;
};

//Hand Object is keeping the score
function Hand(whos, howManyCards){
	var who = whos;
	var cardArray = [];
		for(i = 0; i < howManyCards; i++) {
    cardArray[i] = deal(who);
	}
	this.getHand = function() {
    return cardArray;
	};

	this.score = function(){
		var handSum = 0;
		var numofaces = 0;
		for(i=0;i<cardArray.length;i++){
			handSum += cardArray[i].getValue();
			if(cardArray[i].getNumber() === 1){
        		numofaces+=1;
        	}
        }
    	if(handSum > 21 && numofaces!=0){
    		for(i=0;i<numofaces;i++){
    			if(handSum > 21){
    				handSum-=10;
    			}
    		}
    	}
        return handSum;
	};
	this.printHand = function(){
		var string = "";
		for(i=0;i<cardArray.length;i++){
			string = string + cardArray[i].getNumber() + " of suit "+cardArray[i].getSuit()+", ";
		}
		return string;
	};
	this.hitMe = function(whos){
    cardArray.push(deal(whos));
	this.getHand();
	};
}

var finalResultCheck = function(){


	var pS = playerHand.score();
	var n = pS.toString();
	var ans = n + 'Is your score'
	var playerScore1 = new SpeechSynthesisUtterance(ans);
	playerScore1.lang = 'en-US';
	window.speechSynthesis.speak(playerScore1);


	var dS = dealerHand.score();

	var n1 = dS.toString();
	var ans1 = n1 + 'Is the dealer score'
	var playerScore2 = new SpeechSynthesisUtterance(ans1);
	playerScore2.lang = 'en-US';
	window.speechSynthesis.speak(playerScore2);



	if(pS > 21){
      	if( dS >21){
					var msgOne1 = new SpeechSynthesisUtterance('Tie');
					msgOne1.lang = 'en-US';
					window.speechSynthesis.speak(msgOne1);
          return "Tide";
      	}
      	else{
					var msgTwo1 = new SpeechSynthesisUtterance('Bust, you lose');
					msgTwo1.lang = 'en-US';
					window.speechSynthesis.speak(msgTwo1);
      		return "Bust";
      	}
  	}
  	else if(dS>21){
			var msgThree1 = new SpeechSynthesisUtterance('You win');
			msgThree1.lang = 'en-US';
			window.speechSynthesis.speak(msgThree1);
			return "Win";
 	}
  	else if(pS>dS){
			var msgThree2 = new SpeechSynthesisUtterance('You win');
			msgThree2.lang = 'en-US';
			window.speechSynthesis.speak(msgThree);
			return "Win";
  	}
  	else if(pS===dS){
			var msgOne3 = new SpeechSynthesisUtterance('Tie');
			msgOne3.lang = 'en-US';
			window.speechSynthesis.speak(msgOne3);
			return "Tide";
  	}
  	else{
			var msgTwo5 = new SpeechSynthesisUtterance('Bust, you lose');
			msgTwo5.lang = 'en-US';
			window.speechSynthesis.speak(msgTwo5);
			return "Bust";
  	}
 };

 var inputUserScore = function(input){
 	$('.pscore p').remove();
	$('.pscore').prepend("<p>" + input + "</p>");
 }

 var firstResultCheck = function(){

	pS = playerHand.score();

	var n = pS.toString();
	var ans = n + 'Is your score'
	var playerScore1 = new SpeechSynthesisUtterance(ans);
	playerScore1.lang = 'en-US';
	window.speechSynthesis.speak(playerScore1);



	dS = dealerHand.score();

/*
	var n1 = dS.toString();
	var ans1 = n1 + 'Is the dealer score'
	var playerScore2 = new SpeechSynthesisUtterance(ans1);
	playerScore2.lang = 'en-US';
	window.speechSynthesis.speak(playerScore2);
	*/


	if(pS > 21){
      	if( dS >21){

						var msgOne = new SpeechSynthesisUtterance('Tie');
						msgOne.lang = 'en-US';
						window.speechSynthesis.speak(msgOne);
						return "TideOver";

      	}
      	else{
					var msgTwo = new SpeechSynthesisUtterance('Bust, you lose');
					msgTwo.lang = 'en-US';
					window.speechSynthesis.speak(msgTwo);
      		return "Bust";
      	}
  	}
  	else if(dS>21){
			var msgThree = new SpeechSynthesisUtterance('You win');
			msgThree.lang = 'en-US';
			window.speechSynthesis.speak(msgThree);
    	return "Win";
 	}
 	else if(pS===21){
		var msgThree = new SpeechSynthesisUtterance('Black jack you win');
		msgFour.lang = 'en-US';
		window.speechSynthesis.speak(msgFour);
		return "BJ";
 	}
  	else{
      	return pS;
  	}
 };

var phaseOne = function(){
	dealerHand = new Hand("b", 2);
	playerHand = new Hand("p", 2);
	result = firstResultCheck();

	inputUserScore(result);
	if(isNumeric(result)){
		viewConsole();
	} else {
		hideConsole();
		return;
	}
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var viewConsole = function(){
	$('.gameConsole').css("visibility", "");
}

var hideConsole = function(){
	$('.gameConsole').css("visibility", "hidden");
}

var playGame = function(){
	var gdeck = new deck();
	countingDealersCards = 0;
	// global variable
	gameDeck = gdeck.create();
	phaseOne();
	//playerHand = playAsUser();
	//dealerHand = playAsDealer();

	//declareWinner(playerHand, dealerHand);
};
