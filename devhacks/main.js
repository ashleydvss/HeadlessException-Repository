let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
canvas.style.background = "lightblue";
var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

let hit_counter = 0;


class Circle{
    constructor (xpos, ypos, radius, color, text, speed, type){
        this.xpos = xpos;
        this.ypos= ypos;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed; //if speed is 1, changes 1 pixel per second

        this.dx = 1*this.speed; //changes x position
        this.dy = 1*this.speed;

        this.img = new Image();
        if(type==1){this.img.src="https://static-00.iconduck.com/assets.00/rock-emoji-499x512-koqh2fbb.png";}
        if(type==2){this.img.src="https://assets.streamlinehq.com/image/private/w_200,h_200,ar_1/f_auto/v1/icons/kawaii-emoji/-objects/-objects/u+1f4c4-isfbbc3svhcyv7sa1txi1.png?_a=DAJFJtWIZAAC";}
        if(type==3){this.img.src="https://images.vexels.com/media/users/3/254863/isolated/preview/7244ff4b95fbce00f953018163201f82-scissors-semi-flat.png";}
    }

    draw(context){
        context.beginPath();

        //text inside circle
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial"; //size then font
        context.fillText(this.text, this.xpos, this.ypos);

        //creating circle
        context.lineWidth = 10;
        context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI*2, false);
        context.stroke();
        context.closePath();

        //creating picture:
        
    }

    update(other){ //update position
        //this.text = hit_counter;

        //context.clearRect(0,0,window_width, window_height); //clear window (delete old circle)

        this.draw(context);

        //check collision:
        if ((this.xpos + this.radius) >window_width){
            this.dx = -this.dx;
            hit_counter++; //when hit walls
        }
        if ((this.xpos - this.radius) < 0){
            this.dx = -this.dx;
            hit_counter++;
        }
        if ((this.ypos - this.radius) < 0){
            this.dy = -this.dy;
            hit_counter++;
        }
        if ((this.ypos + this.radius) > window_height){
            this.dy = -this.dy;
            hit_counter++
        }
        
        if (getDistance(this.xpos, this.ypos, other.xpos, other.ypos) < (other.radius + this.radius)){
            this.color = "red";
            if ((this.xpos + this.radius) > (other.xpos+other.radius)){
                this.dx = -this.dx;
                //other.xpos--;
            }
            if ((this.ypos + this.radius) > (other.ypos+other.radius)){
                this.dy = -this.dy;
                //other.ypos--;
            }

        }
        if (getDistance(this.xpos, this.ypos, other.xpos, other.ypos) >= (other.radius + this.radius)){
            this.color = "blue";
        }


        //changing position
        this.xpos += this.dx;
        this.ypos += this.dy;
    }
}


// ONE CIRCLE *****************************************************
// let random_x = Math.random()*window_width; //so circles are in different positions
// let random_y = Math.random()*window_height; //so circles are in different positions
// let my_circle = new Circle(random_x, random_y, 50, "black", hit_counter, 2);//won't draw anything yet
// my_circle.draw(context);
// let updateCircle = function(){
//     requestAnimationFrame(updateCircle);
//     my_circle.update();
// }
// updateCircle();





//COLLISION DETECTION: (w/ 2 objects) ***********************************
// let my_circle1 = new Circle (100, 100, 50, "blue", hit_counter, 2); //will count how many times they collide
// let my_circle2 = new Circle (300, 300, 50, "blue", hit_counter, 2);

let getDistance = function(xpos1, ypos1, xpos2, ypos2){
    //pythagorean theorem
    var result = Math.sqrt(Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2));
    return result;
}

//not counting hits(not displaying)
// let my_circle1 = new Circle (100, 100, 50, "blue", "A", 2); //will count how many times they collide
// let my_circle2 = new Circle (300, 300, 200, "blue", "B", 0); //big circle thats not moving

// //draw circles:
// my_circle1.draw(context);
// my_circle2.draw(context);

// let updateCircle = function(){
//     requestAnimationFrame(updateCircle);
//     context.clearRect(0,0,window_width, window_height); //clear window (delete old circle)

//     my_circle1.update();
//     my_circle2.update();

//     //collision detection:
//     if (getDistance(my_circle1.xpos, my_circle1.ypos, my_circle2.xpos, my_circle2.ypos) < (my_circle2.radius + my_circle1.radius)){
//         my_circle2.color = "red";
//     }
//     if (getDistance(my_circle1.xpos, my_circle1.ypos, my_circle2.xpos, my_circle2.ypos) >= (my_circle2.radius + my_circle1.radius)){
//         my_circle2.color = "blue";
//     }
// }
// updateCircle();



// MOVE MORE THAN 1 CIRCLE *******************************************
var all_circles = []; //empty array

//getting random positions:
let randomNum = function(min,max){
    var result = Math.random()*(max-min)+min;
    return result;
}

//draw 10 circles:
for (var i=0; i<10; i++){
    var radius = 50;
    var random_x = randomNum (radius, (window.innerWidth - radius));
    var random_y = randomNum (radius, (window.innerHeight - radius));

    var type = Math.floor(Math.random()*3+1);
    //1 = rock
    //2 = paper
    //3 = scissor

    let my_circle = new Circle (random_x, random_y, radius, "blue", type , 0.2, type); 
    all_circles.push(my_circle);
    //all_circles.draw(context);
}

let updateCircle = function(){
    requestAnimationFrame(updateCircle);
    context.clearRect(0,0,window_width, window_height); //clear window (delete old circle)

    // all_circles.forEach(element =>{
    //     element.update();
    // })


    for (var i=0; i<all_circles.length; i++){
        for (var j=0; j<all_circles.length; j++){
            all_circles[i].update(all_circles[j]);
        }       
    }

    //only detects if it touches one
    
}
updateCircle();



//NOW I EXPERIMENT: MAKE THEM COLLIDE
