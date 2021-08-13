const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, rop2, rope3,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,button2, button3, blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

var blower;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  bubble_img = loadImage("bubble.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80, displayHeight);
  }else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);
  }

  //createCanvas(500,700);

  frameRate(80);


  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  bubble1 = createSprite(290,460,20,20);
  bubble1.addImage(bubble_img);
  bubble1.scale = 0.1;

  bubble2 = createSprite(canW-290,460,20,20);
  bubble2.addImage(bubble_img);
  bubble2.scale = 0.1;

  blower_1 = createImg("balloon_1.png");
  blower_1.position(10, 50);
  blower_1.size(140, 120);
  blower_1.mouseClicked(airBlow1);

  blower_2 = createImg("balloon_2.png");
  blower_2.position(canW-170, 50);
  blower_2.size(140, 120);
  blower_2.mouseClicked(airBlow2);

  mute_btn = createImg("mute.png");
  mute_btn.position(canW-100, 30);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute);

  button = createImg('cut_btn.png');
  button.position(canW/2-300,200);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg("cut_btn.png");
  button2.position(canW/2+280,200);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  button3 = createImg("cut_btn.png");
  button3.position(200,300);
  button3.size(50, 50);
  button3.mouseClicked(drop3);

  button4 = createImg("cut_btn.png");
  button4.position(canW-200,300);
  button4.size(50, 50);
  button4.mouseClicked(drop4);

  rope = new Rope(5,{x:canW/2-300,y:200});
  rope2 = new Rope(6, {x:canW/2+280, y:200});
  rope3 = new Rope(7, {x:200, y:300});
  rope4 = new Rope(7, {x:canW-200, y:300});
  ground = new Ground(canW/2,170,180,15);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(canW/2-5,100 ,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(canW/2,canH/2+100,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2, fruit);
  fruit_con_3 = new Link(rope3, fruit);
  fruit_con_4 = new Link(rope4, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  rope4.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    eating_sound.play();
    bunny.changeAnimation('eating');
  }

  if(collide(fruit,bubble1,40) == true)
  {
    engine.world.gravity.y = -1;
    bubble1.position.x = fruit.position.x;
    bubble1.position.y = fruit.position.y;
  }

  if(collide(fruit,bubble2,40) == true)
  {
    engine.world.gravity.y = -1;
    bubble2.position.x = fruit.position.x;
    bubble2.position.y = fruit.position.y;
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    sad_sound.play();
    bunny.changeAnimation('crying');
    fruit=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2(){
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

function drop3(){
  cut_sound.play();
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
}

function drop4(){
  cut_sound.play();
  rope4.break();
  fruit_con_4.detach();
  fruit_con_4 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow1(){
  Matter.Body.applyForce(fruit, {x: 0, y: 0}, {x: 0.01, y: 0});
  air.play();
}

function airBlow2(){
  Matter.Body.applyForce(fruit, {x: 0, y: 0}, {x: -0.01, y: 0});
  air.play();
}

function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop();
  } else {
    bk_song.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

