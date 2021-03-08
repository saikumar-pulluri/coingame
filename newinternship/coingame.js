var canvas = document.getElementById("coingame").getContext("2d");
var x=45;
var y=300;
var dx=0;
var dy=0;
var ballradius=40;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 100;
var brickHeight = 25;
var brickPadding = 40;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickX;
var brickY;
var score = 0;




function line(){
canvas.beginPath();
canvas.strokeStyle="green";
canvas.moveTo(0,450);
canvas.lineTo(1000,450);
canvas.lineWidth=10;
canvas.stroke();
}



        function draw() {
              canvas.clearRect(0,0,1000,500);
            drawball();
           drawBricks();
           collisionDetection()
          
            line();
            drawScore()
            if(x>955){
                dx=0;
                x=955;
            }
            if(x<=40){
               dx=0;
               x=40;
           }
           if(y<=40){
               dy=0;
               y=40;
           }
           if(y>380){
               dy=0;
               y=380;
           }
            x+=dx;
            y+=dy;
        }
        setInterval(draw, 10)

       
        
        var bricks=[];
        for(var c=0; c<brickColumnCount; c++) {
            bricks[c] = [];
            for(var r=0; r<brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        function drawBricks() {
            for(var c=0; c<brickColumnCount; c++) {
                for(var r=0; r<brickRowCount; r++) {
                    if(bricks[c][r].status == 1) {
                     brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                     brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    canvas.beginPath();
                    canvas.rect(brickX, brickY, brickWidth, brickHeight);
                    canvas.fillStyle = "gold";
                    canvas.fill();
                    canvas.closePath();
                    canvas.beginPath();
                    canvas.font='24px timesnewroman';
                        canvas.fillStyle="red";
                        canvas.textAlign="center";
                        canvas.fillText('100',brickX+35,brickY+20);
                }
            }
        }
        }
       
       
       
       
       
        function drawball(){
            canvas.beginPath();
            canvas.arc(x,y,ballradius,0,Math.PI*2,false);
            canvas.fillStyle="red";
            canvas.fill()
            canvas.closePath();
        }
        
           

        function moveup() {
            dx=0;
            dy=-1;
            
        }
        function movedown() {
            dx = 0;
            dy=1; 
           
        }
        
        function moveleft() {
            dx =-1;
            dy=0; 
            
        }
        
        function moveright() {
            dx = 1;
            dy=0; 
            
        }

        function collisionDetection() {
            for (var c = 0; c < brickColumnCount; c++) {
                for (var r = 0; r < brickRowCount; r++) {
                    var b = bricks[c][r];
                    if (b.status == 1) {
                        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            score=score+100;
                            if(score == 1500) {
                                alert("YOU WIN, CONGRATULATIONS!");
                                document.location.reload();
                                clearInterval(interval); 
                            }
                        }
                    }
                }
            }
        }
          
        function drawScore() {
            canvas.font = "16px Arial";
            canvas.fillStyle = "#0095DD";
            canvas.fillText("Score: "+score, 100, 20);
        }
        