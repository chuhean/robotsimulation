const inquirer = require('inquirer');

let robotXCoordinate;
let robotYCoordinate;
let robotDirection;

//The following is the direction of the robot is facing, converted as numerical guidance. 
let direction = {
    'NORTH'   : 1,
    'EAST'    : 2,
    'SOUTH'   : 3,
    'WEST'    : 4  
}

//This function returns the textual direction, based on the numerial direction, as per the 'direction' object. 
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

//**************************************Questions Prompts*****************************************
const initialQuestions = [
    { type: 'input', 
    name: 'confirmPlacement', 
    message: 'Please type "place" to start',
    validate: function (input) {
        // Declare function as asynchronous, and save the done callback
        var done = this.async();
    
        // Do async stuff
        setTimeout(function() {
          if (input.toUpperCase().trim() !== 'PLACE') {
            // Pass the return value in the done callback
            done('You need to type "place" to start');
            return;
          }
          // Pass the return value in the done callback
          done(null, true);
        }, 3000);
      }
    },
    { type: 'input', name: 'confirmCoor', message: 'Type the placement coordinate in X,Y,F format.'}
];

const questions = [{
  type: 'input',
  name: 'response',
  message: 'What do you want to do (PLACE/MOVE/LEFT/RIGHT/REPORT)?',
}];

//********************************Command Line Questions & Response******************************************
inquirer
    .prompt(initialQuestions)
    .then(answers => {
        let placementCoor = answers.confirmCoor;

        
    });
    
inquirer
    .prompt(questions)
    .then(answers => {
        //Sanitize user's input to lower case and remove all whitespace.
        let sanitizedAnswer = answers.response.toUpperCase();
        
        //Check if sanitized answer satisfy one of the answer options. Otherwise show an error to user.
        
        //Run this code block if user types 'MOVE'. Then add or minus their coordinate according to their direction. 
        if (sanitizedAnswer === 'MOVE'){
            
            if (robotDirection === 1){
                robotXCoordinate++;
            } else if (robotDirection === 2){
                robotYCoordinate++;
            } else if (robotDirection === 3){
                robotXCoordinate--;
            } else {
                robotYCoordinate--;
            }
            
        }
        
        //Run this code block if user types 'LEFT'. Then move the robot direction's to left side, by minus 1 to their numerical direction. 
        if (sanitizedAnswer === 'LEFT'){
            robotDirection--;
        }
        
        //Run this code block if user types 'RIGHT'. Then move the robot direction's to right side, by adding 1 to their numerical direction. 
        if (sanitizedAnswer === 'RIGHT'){
            robotDirection++;
        }
        
        //Run this code block if user types 'REPORT'. Then report back the robot coordinate in the console. 
        if (sanitizedAnswer === 'REPORT'){
            let robotTextDirection = getKeyByValue(direction, robotDirection);
            console.log(`The robot's coordinate is (${robotXCoordinate}, ${robotYCoordinate}, ${robotTextDirection}).`);
        }
        
        //Check if robot will fall down or not. If robot falls down, undo the previous movement, and show an error to user.
        checkRobotMovement();
        
    });
