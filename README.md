# Robot Simulation

This a command line application that simulates a robot moving on a 5 x 5 table. The south-west of the table has a coordinate (0,0).

User will follow the prompt in the application by placing the robot with a format **X,Y,F**, where X and Y are numbers between **0 and 5**, and F is either one of the direction: **NORTH, SOUTH, EAST, WEST**. 

## How to run the application:

_Note: Make sure you have installed Node.js and NPM on your machine. If you haven't, please go to [Node.js](https://nodejs.org "Node.js")
to install. NPM will automatically be installed on your machine when your are installing Node.js_. 

1. In the directory, run `npm install`.
2. Run `node app.js`.
3. Follow the prompt to start playing. Enjoy!

## Instruction:

1. When starting the application, user needs to type 'PLACE' to begin the robot placement. 
2. User will then need to specify the coordinate and direction the robot will be facing, in X,Y,F format. For example, to place the robot at (X,Y) = (3,4) and facing east, user needs to enter 3,4,EAST. If the robot is placed outside the table, eg. such as (X,Y) = (3,6), the program will consider it invalid and require the user to start over again by typing 'PLACE'.
3. After that, user are free to use any of the commands listed below to move the robot, report the current status, or begin the robot placement over again.


## Commands:
* PLACE: Used at the beginning of the program before placement of robot coordinate. It can also be used to restart the placement when playing the robot.
* MOVE: To move the robot one unit in the direction it is facing. This action will be invalid when the robot is at the edge of table, eg X or Y coordinate at 0 or 5.
* LEFT: To make the robot turn to the left direction. For example, if it is facing south, using this command will make it face to the east.
* RIGHT: To make the robot turn to the right direction. For example, if it is facing west, using this command will make it face to the north.
* REPORT: To show the robot's current coordinate and the direction the robot is facing to the user.




