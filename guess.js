//This number guessing game generates a random number between 1 and 100. Using the browser functions prompt 
//and alert, it asks the user to guess the number. 
//The user has 4 tries to guess the number. If they guess right, the game congratulates them. 
//Otherwise, they get a message saying what the correct number was, as well as their list of guesses.


var prompt = require('prompt');



function external(){

var num = Math.ceil( Math.random() * 100 );
var userGuesses = [];
var userInput = 0;  
var userTry = 3;
guessGame(3)

function guessGame(userTry) {
    if (userTry >= 0) {
        prompt.start();
        prompt.get(['number'], function (err, result) {
            if (err) {
                console.log("There was an error!");
            } else {
                console.log('Your guess is ' + result.number);
                userInput = result.number;
                if (userInput < num) {
                    console.log("This is too small; you have " + userTry + " more guesses");
                    userGuesses.push(userInput);
                    guessGame(userTry - 1);
                } else if (userInput > num) {
                    console.log("This is too big; you have " + userTry + " more guesses");
                    userGuesses.push(userInput);
                    guessGame(userTry - 1);
                }
                  else {   
                    console.log("Congrats, you're a number-guessing wizard!");
                }    
            }
        });
    } else console.log("The right answer was " + num + ". Your guesses were " + userGuesses + ".");
}
};

external();

