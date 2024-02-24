const canvas = document.getElementById("c1");
const c = canvas.getContext("2d");

const X_SPEED = 0.5;
const Y_SPEED = 0.5;
var entities = [];
const SPAWN_AMT = 10;
const WIDTH = 50;
const HEIGHT = 50;
const SPAWN_X=1410;
const SPAWN_Y =800;
const LARGE_R = 10;
//assign objects a class number:
//1 = rock
//2 = paper
//3 = scissor

//rocks chase scissors but run from paper
//paper chases rock but runs from scissors
//scisosrs chases paper but runs from rock

//if 2 opposing classes collide, the loser would turn into the winning class
//aka: if a paper and a rock collided, the rock would turn into paper since it would lose to the paper
//consider adding sound effects

//equation of a circle x^2 + y^2 = r^2

//
class Circle{
    constructor(type, x, y, r, entity){
        this.type = type;
        
        this.x = x;
        this.y = y;
        this.r = r;
        this.members = [];
        this.entity = entity;
    }
    get getType(){
        return this.type;
    }
    get getX(){
        return this.x;
    }
    get getY(){
        return this.y;
    }
    get getR(){
        return this.r
    }
    get getEntity(){
        return this.entity;
    }
    get getMembers(){
        return this.members;
    }
    set setType(type){
        this.type = type;
    }
    set setX(x){
        this.x = x;
    }
    set setY(y){
        this.y = y;
    }
    set setR(r){
        this.r = r;
    }
    set setEntity(entity){
        this.entity = entity;
    }

}


class Entity{
    constructor(type, x, y, id){
        this.type = type; //rock ,paper, or scissor

        this.x = x;
        this.y = y;
        this.id = id;
        this.img = new Image();
        this.near = [];
        this.circle = new Circle(1, (this.x+WIDTH/2),(this.y+HEIGHT/2), LARGE_R, this);
        if(type==1){this.img.src="https://static-00.iconduck.com/assets.00/rock-emoji-499x512-koqh2fbb.png";}
        if(type==2){this.img.src="https://assets.streamlinehq.com/image/private/w_200,h_200,ar_1/f_auto/v1/icons/kawaii-emoji/-objects/-objects/u+1f4c4-isfbbc3svhcyv7sa1txi1.png?_a=DAJFJtWIZAAC";}
        if(type==3){this.img.src="https://images.vexels.com/media/users/3/254863/isolated/preview/7244ff4b95fbce00f953018163201f82-scissors-semi-flat.png";}
        
    }
    get getX(){
        return this.x;
    }
    get getY(){
        return this.y;
    }
    get getType(){
        return this.type;
    }
    get getImg(){
        
        return this.img;
        
    }
    get getCircle(){
        return this.circle;
    }
    get getID(){
        return this.id
    }

    set setX(x){
        this.x = x;
    }
    set setY(y){
        this.y = y;
    }
    set setImg(src){
        this.img.src = src;
    }
    set setCircle(circle){
        this.circle = circle;
    }
    
    moveToCentre(){
        // single selection movement
        for(var i = 0; i< entities.length; i++){
            //var moveLeft, moveRight, moveUp, moveDown = true;
            var minDistance = 100000000;       
            var closestJ = i;                          
            for(var j = 0; j< entities.length; j++){
                if(i!=j){
                    if(minDistance > (Math.abs(entities[i].getX - entities[j].getX) + Math.abs(entities[i].getY - entities[j].getY))){
                        minDistance = Math.abs(entities[i].getX - entities[j].getX) + Math.abs(entities[i].getY - entities[j].getY);
                        closestJ = j;
                    }
                }
            }
            if(entities[i].getType == 1){
                if(entities[closestJ].type == 1 || entities[closestJ].type == 3){
                    if(entities[i].getX > entities[closestJ].getX){
                        entities[i].setX=entities[i].getX - X_SPEED;
                    }
                    if(entities[i].getX < entities[closestJ].getX){
                        entities[i].setX=entities[i].getX + X_SPEED;
                    
                    if(entities[i].gety > entities[closestJ].getY){
                        entities[i].setY=entities[i].getY - Y_SPEED;
                    }
                    if(entities[i].getY < entities[closestJ].getY){
                        entities[i].setY=entities[i].getY + Y_SPEED;
                    }
                }
            }
                if(entities[closestJ].type == 2){
                    if(entities[i].getX > entities[closestJ].getX){
                        entities[i].setX=entities[i].getX + X_SPEED;
                    }
                    if(entities[i].getX < entities[closestJ].getX){
                        entities[i].setX=entities[i].getX - X_SPEED;
                    }
                    if(entities[i].gety > entities[closestJ].getY){
                        entities[i].setY=entities[i].getY + Y_SPEED;
                    }
                    if(entities[i].getY < entities[closestJ].getY){
                        entities[i].setY=entities[i].getY - Y_SPEED;
                    }
                }
            }
            if(entities[i].getType == 2){
                if(entities[closestJ].type == 2 || entities[closestJ].type == 1){
                    if(entities[i].getX > entities[closestJ].getX){
                        entities[i].setX=entities[i].getX - X_SPEED;
                    }
                    if(entities[i].getX < entities[closestJ].getX){
                        entities[i].setX=entities[i].getX + X_SPEED;
                    
                    if(entities[i].gety > entities[closestJ].getY){
                        entities[i].setY=entities[i].getY - Y_SPEED;
                    }
                    if(entities[i].getY < entities[closestJ].getY){
                        entities[i].setY=entities[i].getY + Y_SPEED;
                    }
                }
            }
                if(entities[closestJ].type == 3){
                    if(entities[i].getX > entities[closestJ].getX){
                        entities[i].setX=entities[i].getX + X_SPEED;
                    }
                    if(entities[i].getX < entities[closestJ].getX){
                        entities[i].setX=entities[i].getX - X_SPEED;
                    }
                    if(entities[i].gety > entities[closestJ].getY){
                        entities[i].setY=entities[i].getY + Y_SPEED;
                    }
                    if(entities[i].getY < entities[closestJ].getY){
                        entities[i].setY=entities[i].getY - Y_SPEED;
                    }
                }
            }
            if(entities[i].getType == 3){
                if(entities[closestJ].type == 3 || entities[closestJ].type == 2){
                    if(entities[i].getX > entities[closestJ].getX){
                        entities[i].setX=entities[i].getX - X_SPEED;
                    }
                    if(entities[i].getX < entities[closestJ].getX){
                        entities[i].setX=entities[i].getX + X_SPEED;
                    
                    if(entities[i].gety > entities[closestJ].getY){
                        entities[i].setY=entities[i].getY - Y_SPEED;
                    }
                    if(entities[i].getY < entities[closestJ].getY){
                        entities[i].setY=entities[i].getY + Y_SPEED;
                    }
                }
            }
                if(entities[closestJ].type == 1){
                    if(entities[i].getX > entities[closestJ].getX){
                        entities[i].setX=entities[i].getX + X_SPEED;
                    }
                    if(entities[i].getX < entities[closestJ].getX){
                        entities[i].setX=entities[i].getX - X_SPEED;
                    }
                    if(entities[i].gety > entities[closestJ].getY){
                        entities[i].setY=entities[i].getY + Y_SPEED;
                    }
                    if(entities[i].getY < entities[closestJ].getY){
                        entities[i].setY=entities[i].getY - Y_SPEED;
                    }
                }
            }
        }

        if(entities[closestJ].type == 2 || entities[closestJ].type == 1){
            if(entities[i].getX > entities[closestJ].getX){
                entities[i].setX= entities[i].getX - X_SPEED;
            }
            if(entities[i].getX < entities[closestJ].getX){
                entities[i].setX=entities[i].getX + X_SPEED;
            
            if(entities[i].gety > entities[closestJ].getY){
                entities[i].setY=entities[i].getY - Y_SPEED;
            }
            if(entities[i].getY < entities[closestJ].getY){
                entities[i].setY=entities[i].getY + Y_SPEED;
            }
        }
    }
        
        if(this.x > window.innerWidth/2){
            this.x-=X_SPEED;
        }
        if(this.x < window.innerWidth/2){
            this.x+=X_SPEED;
        }
        if(this.y > window.innerHeight/2){
            this.y-=Y_SPEED;
        }
        if(this.y < window.innerHeight/2){
            this.y+=Y_SPEED;
        }
    }

    circleToObjOrigin(){
        
        this.circle.setX = this.x + (WIDTH/2);
        this.circle.setY = this.y + (HEIGHT/2);
        c.beginPath();
        //c.arc(xAvg, yAvg, 90, 0, 2*Math.PI)
        c.arc(this.circle.getX, this.circle.getY, 90, 0, 2*Math.PI)
        c.closePath();
        c.stroke();
        
        
    }

    

    update(){
        this.moveToCentre();
        this.circleToObjOrigin();
        this.regionDetection();
    }
}





const test = new Image();
test.src = "https://images.vexels.com/media/users/3/254863/isolated/preview/7244ff4b95fbce00f953018163201f82-scissors-semi-flat.png"

c.drawImage(test, 300, 300, 150, 150) //x,y,width,height




for(i = 0; i<SPAWN_AMT; i++){
    entities[i] = new Entity(Math.floor(Math.random() * 3)+1, Math.floor(Math.random() * SPAWN_X)+1, Math.floor(Math.random() * SPAWN_Y)+1, i)
    
}

//Movement function
function regionDetection(){
    for(var i = 0; i<entities.length; i++){
        var currCircleX = entities[i].getCircle.getX;
        var currCircleY = entities[i].getCircle.getY;
        
        for (var j = 0; j<entities.length; j++){
            var nearCircleX = entities[j].getCircle.getX;
            var nearCircleY = entities[j].getCircle.getY;

            if (distanceCalc(currCircleX,currCircleY,nearCircleX,nearCircleY)<=LARGE_R*2){
                if(i!=j){
                    var isMember = false;
                    console.log(entities[i].getID)
                    if(entities[i].near.length>0){
                        
                        for(var k = 0; k < entities[i].near.length; k++){
                            
                            if(entities[i].id == entities[i].near[k].getID){
                                isMember = true;
                                
                            }
                        }
                    }
                    
                    if(!isMember){
                        //console.log(entities.length)
                        entities[i].near.push(entities[j]);
                        
                    }
                }
            }else{
                if(entities[i].getID == entities[j].getID){
                    near.delete(near.indexOf(entities[j]));
                    console.log(near.indexOf(entities[j]))
                }
            }
            
        }
    }
}
regionDetection();

function move(){
    requestAnimationFrame(move);
    requestAnimationFrame(regionDetection);
    c.clearRect(0,0,window.innerWidth, window.innerHeight);
    for(var i = 0; i< entities.length; i++){
        entities[i].update();
        c.drawImage((entities[i].getImg), entities[i].getX, entities[i].getY, WIDTH, HEIGHT);
    };
    //setTimeout(move, 100)
}
move();
for (i=0; i < SPAWN_AMT; i++){
    //c.drawImage((entities[i].getImg), entities[i].getX, entities[i].getY, 50, 50)
}


function randomMovement(){
    for(var i=0; i<SPAWN_AMT; i++){
        //entities[i].setX = (Math.floor(Math.random() * 10)+1 + entities[i].getX)
        //entities[i].setY = (Math.floor(Math.random() * 10)+1 + entities[i].getY)
        c.drawImage((entities[i].getImg), entities[i].getX, entities[i].getY, 50, 50);
        c.clearRect;

    }
        

    
    setTimeout(randomMovement, 300)
}

function distanceCalc(x1, y1, x2, y2){
    var output = Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2)

    return output;
}


