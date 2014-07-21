$( document ).ready(function(){ 
	
	var thenum=Math.floor((Math.random() * 100) + 1);
	var guesscnt=0;
	var guesses=[];

	$(document).keypress(function(e) {
	    if(e.which == 13) {
	    	$(".guessbtn").click();
	    }
	});

    $('.guessbtn').on('click', function() {
    	var guessnum = $('.guessinput').val();
    	//check if guess is valid number
    	if(guessnum>0 && guessnum<=100 && guessnum%1===0){
	    	$("#hotcold").show();
			//check if number is repeat
			var repeat = false; 	    	
			for(var i=0; i<guesses.length; i++){
				if(guesses[i]==guessnum){
					repeat= true;
				}
			}
			if(repeat){
		    	$("#hotcoldx").text("you have already guessed that number");
   	   			$("#hotcoldy").hide();
			}else{
		    	guesses[guesscnt] = guessnum;
		    	var dif= thenum - guessnum;
		    	var lastdif = thenum - guesses[guesscnt-1];
		    	if(guesscnt>0){
		    		$("#hotcoldy").show()
			    	if((Math.abs(lastdif)-Math.abs(dif))>0){
			    		$("#hotcoldy").text('getting hotter');
			    	}else{
			    		$("#hotcoldy").text('getting colder');
			    	}
		    	}
		    	var guessleft = 5 - (++guesscnt);
		    	var guesslog;
		    	if(guessleft>0){
		    		switch(true) {
		    			case (dif==0):
		    				$("#winnerModal").modal('show');
		    				$("#hotcoldx").text('Hotter than hot! You Won!');
		    				$("#hotcoldy").hide();
		    				guesslog="on the money!";
		    				break;
			    		case (dif<10 && dif>0):
			           		$("#hotcoldx").text('You\'re hot! guess higher!');
			           		guesslog="hot";
			  	      		break;
			    		case (dif> -10 && dif<0):
			        		$("#hotcoldx").text('You\'re hot! guess lower!');
			        		guesslog="hot";
			  	      		break;
			    		case (dif< -10):
			        		$("#hotcoldx").text('You\'re not looking so good there buddy, guess lower.');
			        		guesslog="cold";
			  	      		break;
			       		case (dif>10):
			        		$("#hotcoldx").text('You\'re not looking so good there buddy, guess higher.');
			        		guesslog="cold";
			  	      		break;        		
			    		default:
			        		
			        		break;
					}
					$("#countdown p").text('you have '+guessleft+' guesses left!');
					guesslog="<p>"+guessnum+" was "+guesslog+"</p>"
					$('#prevguesses').append(guesslog);  				
		    	}else if(guessleft==0){
		    		$("#hotcoldx").text("the number to guess was "+thenum);
		    		$("#hotcoldy").hide();
		    		$("#countdown p").text('that was your last guess!');
		    	}else{

		    	}
		    }	
	    }else{
	    	alert("that is not a valid number");
	    }	
    })

    $('.newbtn').on('click', function() {
    	thenum=Math.floor((Math.random() * 100) + 1);
    	guesses=[];
    	guesscnt=0;
   	    $("#hotcoldy").hide();
    	$("#hotcoldx").text("Your game has been restarted, submit a new guess!");
    	$("#countdown p").text('you have 5 guesses left!');
    	$("#prevguesses").empty();
    })

    $('.answerbtn').on('click', function() {
    	$("#hotcold").show();
   	    $("#hotcoldy").hide();
    	$("#hotcoldx").text("the number to guess was "+thenum);
    	$("#countdown p").text('CHEATER CHEATER PUMPKIN EATER!');
    })
});