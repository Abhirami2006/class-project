var player_1;
var playerImg;
var puddle;
var puddleGroup;
var puddleImage;
var coinImage;
var coin;
var coinGroup;
var bground;
var bgImg;
var gameState = "play";
//var PLAY = 1;
//var END = 0;
var score=0;

function preload(){
coinImage = loadImage("coin_img.png");
bgImg = loadImage("bg.jpg");
playerImg = loadAnimation("playerImg1.png","playerImg2.png","playerImg3.png","playerImg4.png","playerImg5.png","playerImg6.png","playerImg7.png");
puddleImage = loadImage("puddleImg.png");
}

function setup() {
  createCanvas(600,800);
  bground = createSprite(300,400);
  bground.addImage(bgImg);
  bground.scale = 2;
  bground.y = bground.height/2;
  bground.velocityY = 1;
  player_1 = createSprite(300, 750, 30, 30);
  player_1.addAnimation("player",playerImg);
  puddleGroup = new Group();
  coinGroup = new Group();
}

function draw() {
  background(bgImg);
  if(gameState === "play"){ 

  if(bground.y>400){
    bground.y = 300;
  }

  
  if(keyDown(LEFT_ARROW)){
    player_1.x = player_1.x-4;
  }

  if(keyDown(RIGHT_ARROW)){
    player_1.x = player_1.x+4;
  }
  if(player_1.isTouching(coinGroup)){
   score = score+1;
   coinGroup.destroyEach();
  }
  spawnPuddles(); 
  spawnCoin();
  drawSprites();

  textSize(20);
  fill("black")
  text("score:" + score,50,150)

  if(puddleGroup.isTouching(player_1)){
    gameState = "end";
  }
  }
  if(gameState === "end"){
    textSize(30);
  fill("green");
    text("GAME ENDED",200,400);
    puddleGroup.setVelocityYEach(0);
    coinGroup.setVelocityYEach(0);
    puddleGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    bground.velocityY = 0;
    if(keyDown("space")){
    gameState = "play";
    }
    
    
  }

  
}

function spawnPuddles(){
  if(frameCount%200===0){
   puddle = createSprite(100,0,10,10);
   puddle.addImage(puddleImage);
   puddle.scale = 0.2;
   puddle.x = Math.round(random(100,500));
   puddle.velocityY = 5;
   puddle.depth = player_1.depth;
   player_1.depth = player_1.depth+1;
   puddle.lifetime = 160;
   puddleGroup.add(puddle);
  }
}

function spawnCoin(){
  if(frameCount%150===0){
    coin = createSprite(100,-30,10,10);
    coin.x = Math.round(random(100,500));
    coin.velocityY = 5;
    coin.shapeColor = "yellow";
    coin.addImage(coinImage);
    coin.scale = 0.1;
    coin.depth = player_1.depth;
    player_1.depth = player_1.depth+1;
    coin.lifetime = 160;
    coinGroup.add(coin);
  }
}