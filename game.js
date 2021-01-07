
var generatedSequence=[]
var userSequence=[]

var buttonColors=["red","blue","green","yellow"]
var start=false
var level=0


$(document).keypress(function(){
  if(!start){
    $("h1").text("Level "+ level);
    sequence();
    start=true;
  }
})



$(".btn").click(function(){
  var chosenColor=$(this).attr("id");
  userSequence.push(chosenColor);
  playSound(chosenColor)
  animate(chosenColor)
  checkAnswer(userSequence.length-1);
})



function sequence(){
  userSequence=[]
  level++;
  $("h1").text("Level "+ level);
  var randomNum=Math.floor(Math.random()*4);
  var randomColor=buttonColors[randomNum]
  generatedSequence.push(randomColor);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}


function checkAnswer(currentLevel){
  if(generatedSequence[currentLevel] === userSequence[currentLevel]){
    if(userSequence.length === generatedSequence.length){
      setTimeout(function(){
        sequence();
      },1000)
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, press any key to Restart!")

    setTimeout(function(){
      $("body").removeClass("game-over")
    },200)
    startOver();
  }
}



function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}



function animate(currentColor){
  $("#"+currentColor).addClass("pressed")
  setTimeout(function(){$("#"+currentColor).removeClass("pressed")}, 100)
}

function startOver(){
  level=0;
  generatedSequence=[];
  start = false;
}
