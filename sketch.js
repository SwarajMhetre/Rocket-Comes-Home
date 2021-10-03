var rocket,rocketImg;
var asteroid,ast1,ast2,ufoImg;
var fuel,fuelImg;
var obsGroup,fuelGroup;
var gameOver,gameOverImg;
var bg,bgImg;
var score;

var I = 0;
var PLAY = 1;
var END = 2;
var gameState = I;

function preload(){

  bgImg = loadImage("space.jpg");
  
  rocketImg = loadImage("rocket.png");
  fuelImg= loadImage("fuel.png");
  
  ast1=loadImage("ast1.png");
  ast2=loadImage("ast2.png");
  ufoImg=loadImage("ufo.png");
  
  gameOverImg=loadImage("game.jpg")
  
}
function setup() {
     createCanvas(600,500);
  
  bg = createSprite(250,300,400,400);
  bg.addImage(bgImg);
  bg.velocityX=-5;
  bg.scale=1.3;
  
  rocket= createSprite(80,250,20,20);
  rocket.addImage(rocketImg);
  rocket.scale=0.3;
  rocket.rotation=140;
  
  gameOver=createSprite(250,300);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  
  obsGroup = new Group();
  fuelGroup = new Group();
  
  score = 0;
}

function draw() {
     background(0);
  
  if (bg.x<0){
    bg.x=bg.width/2;
  }
  
  if(gameState===I){
    
    textSize(15);
    
    fill("white");
    stroke("gold")
    text("STORY :-",10,20);
    
    fill("pink");
    stroke("pink")
    text("There is an ISRO rocket who wants to reach his Home Planet, Earth. Help Rocket to",30,50);
    text(" reach its planet. There are some Aliens who don't want it to come its home, Earth. ",33,68);
    text("So, beat them by showing YOUR GAMING SKILLS of DODGING.",33,87)
    
    fill("gold")
   text("Instructions :-",10,210)
    
    fill("white");
    stroke("white")
    text("- Move the rocket Up,down by your ARROW KEYS in the Keyboard.",40,250);
    
     fill("lightgreen")
    noStroke()
    text("- Collect the Fuel by just touching it with Your Rocket...",40,274);
    
    fill("red")
    stroke("red")
    text("- BEWARE OF THE ASTEROIDS & THE UFO'S By JUST SIMPLY DODGING THEM.",10,298);
    text("- ALSO DON'T GO OUT OF THE VIEW AREA. If rocket goes there, YOU LOST.",10,320)
    
    fill("gold");    
    text("Press the SPACEBAR to start the Game !!!",160,480);
    
    if(keyDown("space")){
      gameState=PLAY;
    }
  }
  
  
  if (gameState===PLAY){
    
   if(obsGroup.isTouching(rocket)||rocket.y<0||rocket.y>600){
     gameState = END;
   } 
    
    if(fuelGroup.isTouching(rocket)){
      score++;
      fuelGroup.destroyEach();
    }
    
    if(keyDown(UP_ARROW)){
      rocket.y=rocket.y-10;
    }
    if(keyDown(DOWN_ARROW)){
      rocket.y=rocket.y+10;
    }
    
    spawnFuel();
    spawnObstacles(); 
    drawSprites();
    
    fill("gold");
    stroke("gold");
    textSize(15 )
    text ("FUEL (in Litre) = "+score,250,20)
  }
  
  if(gameState===END) {  
    textSize(40);
    fill("red");
    stroke("red")
    text("Game Over !!",200,260)
  }
}



function spawnObstacles(){
  
  if(frameCount%217===0){
    asteroid=createSprite(600,300,20,20);
    asteroid.setCollider("circle",0,0,90)
    asteroid.scale=0.5;
    asteroid.velocityX=-5;
    asteroid.lifetime=140;
  //  asteroid.debug=true;
    
    r=Math.round(random(1,3))
    
    if (r===1){
      asteroid.addImage(ast1);
    }
    else if (r===2){
       asteroid.addImage(ast2);
    }
    else if(r===3){
      asteroid.addImage(ufoImg)
    }
    asteroid.y=Math.round(random(50,450))
    
     obsGroup.add(asteroid) 
  }
}

function spawnFuel(){
  if (frameCount%500===0){
    fuel=createSprite(510,250,20,20);
    fuel.addImage(fuelImg);
    fuel.scale=0.1;
    fuel.velocityX=-8;
    
    fuel.y=Math.round(random(50,470));
    
  fuelGroup.add(fuel);
    
    
    
    
  }
}