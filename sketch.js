var bg,bgImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivaltime;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup;
var monkey , monkey_running;
var score;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("cartoon-empty-tropical-rainforest-jungle-background_88272-1547.jpg");
 
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  
 ground = createSprite(400,350,900,10);
 ground.velocityX=-4;
 ground.x=ground.width/2;
 console.log(ground.x) ;
 
  monkey = createSprite(150,335,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
 bg = createSprite(200,200,400,700);
  bg.addAnimation("bg",bgImage);
  bg.scale=0;
  
  survivaltime=0;
 
  score=0;
  
  obstacleGroup=createGroup();
  bananaGroup = createGroup();
  
 
}


function draw() {
  background("white");
  
  if(gameState === PLAY){
   
    survivaltime = survivaltime + Math.round(getFrameRate()/60);
  
   if(bananaGroup.isTouching(monkey)){
     score=score+1;
     bananaGroup.destroyEach();
   }
    
  spawnObstacles();
  bananas();
    
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.1;
  }
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
       
    }
   monkey.velocityY = monkey.velocityY + 0.8
  
  
 
    
    if(obstacleGroup.isTouching(monkey)){
       gameState = END;
    }
  }
  
 else if (gameState === END){
   obstacleGroup.setVelocityXEach(0);
    monkey.velocityX=0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  
   stroke("black");
  textSize(80);
  fill("black");
  text("GAMEOVER!!!",70,200);
  
 }   
 if (bg.x < 0){
      bg.x = bg.width/2;
   }
  
  if (ground.x < 300){
      ground.x = ground.width/2;
    }
  
 
  
/*obstacleGroup .depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  
  bananaGroup .depth = monkey.depth;
  monkey.depth = monkey.depth + 1;*/
  
 // bg.depth = bananaGroup.depth;
 // bananaGroup.depth = bananaGroup.depth + 2;
  
  //bg.depth = obstacleGroup.depth  
  //obstacleGroup.depth = obstacleGroup.depth + 1;
  
  // bg.depth = monkey.depth;
  //monkey.depth = monkey.depth + 1;
  
  monkey.collide(ground);
  
  if (gameState===PLAY){
    
  }
  
  
   drawSprites();

 stroke("black");
  textSize(20);
  fill("black");
  text("SCORE : " +score, 500,50);
 
  
  
  stroke("black");
  textSize(20);
  fill("black");
  text("SURVIVAL TIME : "+ survivaltime, 30,50);
  
  
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,315,10,40);
   obstacle.velocityX = -(6 + survivaltime/100);
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.2;
   obstacle.lifetime=250;
   obstacleGroup.add(obstacle);
 }}

function bananas() {
  
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
   banana .y = Math.round(random(80,200));
   banana .addImage(bananaImage);
   banana.scale = 0.5;
   banana.velocityX=-(7+(score/4));
   banana.lifetime = 200;
   bananaGroup.add(banana);
   banana.scale=0.1; 
  }}



