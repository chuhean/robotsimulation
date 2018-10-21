//This module will check whether the robot movement and direction is valid. If not, it will undo the movement and show error to user.
//It also check the robot direction. If the direction exceed/below the number listed in the 'direction' object, it will change it to appropriate number.

module.exports = {
    checkXY: function(x, y) {
      
        if (x > 5){
            x = 5;
            console.log('Invalid movement. Robot will fall down the table.');
        } else if (x < 0){
            x = 0;
            console.log('Invalid movement. Robot will fall down the table.');
        } else if (y > 5){
            y = 5;
            console.log('Invalid movement. Robot will fall down the table.');
        } else if (y < 0){
            y = 0;
            console.log('Invalid movement. Robot will fall down the table.');
        }
        
    },
    
    checkDirection: function(f) {
        
        if (f > 4){
            f = 1;
        } else if (f < 1){
            f = 4;
        }   
        
    }

};