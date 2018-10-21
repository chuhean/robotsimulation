const inquirer = require('inquirer');
const checkRobotMovement = require('./checkRobotMovement');

let robotXCoordinate;
let robotYCoordinate;
let robotDirection;

//The following is the direction of the robot is facing, converted as numerical guidance. 
let direction = {
    'NORTH'   : 1,
    'EAST'    : 2,
    'SOUTH'   : 3,
    'WEST'    : 4  
};

//This function returns the textual direction, based on the numerial direction, as per the 'direction' object. 
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}



//*************************************************Questions Prompts******************************************************
const initialQuestions = [
    { type: 'input', 
    name: 'confirmPlacement', 
    message: 'Please type "PLACE" to start',
    validate: function (input) {
        // Declare function as asynchronous, and save the done callback
        var done = this.async();
    
        // Do async stuff
        setTimeout(function() {
          if (input.toUpperCase().trim() !== 'PLACE') {
            // Pass the return value in the done callback
            done('You need to type "PLACE" to start.');
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
  message: 'What do you want to do: PLACE/MOVE/LEFT/RIGHT/REPORT ?',
}];



//********************************************Command Line Questions & Response********************************************
inquirer
    .prompt(initialQuestions)
    .then(answers => {
        
        let placementCoor = answers.confirmCoor.split(',');
        robotXCoordinate = Number(placementCoor[0].trim());
        robotYCoordinate = Number(placementCoor[1].trim());
        let robotTextDirection = String(placementCoor[2].toUpperCase().trim());
        
        //Check if input coordinates is one of the following number. Otherwise show error to user.
        if (![0,1,2,3,4,5].includes(robotXCoordinate) || ![0,1,2,3,4,5].includes(robotYCoordinate)){
            console.log('Invalid coordinate input. Coordinate must be between 0 to 5.');
        } 
        //Check if input direction is one of the following direction. Otherwise show error to user.
        else if (!["NORTH", "EAST", "SOUTH", "WEST"].includes(robotTextDirection)){
            console.log('Invalid direction input. Direction must be either NORTH, EAST, SOUTH, or WEST.');
        }
        
        //Assign numerial direction according to 'direction' object.
        robotDirection = direction[robotTextDirection];
        
        inquirer
            .prompt(questions)
            .then(answers => {
                //Sanitize user's input to upper case and remove all whitespace.
                let sanitizedAnswer = answers.response.toUpperCase().trim();
                
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
                    
                    //Check if robot will fall down or not. If robot falls down, undo the previous movement, and show an error to user.
                    checkRobotMovement.checkXY(robotXCoordinate, robotYCoordinate);
                    
                }
                
                //Run this code block if user types 'LEFT'. Then move the robot direction's to left side, by minus 1 to their numerical direction. 
                else if (sanitizedAnswer === 'LEFT'){
                    
                    robotDirection--;
                    
                    //Check if the direction exceed/below the number listed in the 'direction' object, and change it to appropriate number.
                    checkRobotMovement.checkDirection(robotDirection);
                    
                }
                
                //Run this code block if user types 'RIGHT'. Then move the robot direction's to right side, by adding 1 to their numerical direction. 
                else if (sanitizedAnswer === 'RIGHT'){
                    
                    robotDirection++;
                    
                    //Check if the direction exceed/below the number listed in the 'direction' object, and change it to appropriate number.
                    checkRobotMovement.checkDirection(robotDirection);
                    
                }
                
                //Run this code block if user types 'REPORT'. Then report back the robot coordinate in the console. 
                else if (sanitizedAnswer === 'REPORT'){
                    
                    let robotTextDirection = getKeyByValue(direction, robotDirection);
                    console.log(`The robot's coordinate is (${robotXCoordinate}, ${robotYCoordinate}, ${robotTextDirection}).`);
                    
                }
                
                //Check if sanitized answer satisfy one of the answer options above. Otherwise show an error to user.
                else {
                    console.log('Invalid input. Please try again.');
                }
            });
        
    });
