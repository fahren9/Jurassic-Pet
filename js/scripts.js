window.onload = function ()
	{

		var canvas = document.getElementById('game'),
			context = canvas.getContext('2d'),
			width = canvas.width,
			height = canvas.height,
			keysMap = {
				37: false,
				38: false,
				39: false,
				40: false
			},
			rand_image = 0;


		var tyrex = 
		{
			posX: 20,
			posY: 20,
			width: 27,
			height: 18,
		},

			eat = 
		{
			posX: Math.random() * width,
			posY: Math.random() * height,
			radius: 10
		}


		var tyrexImage = new Image(),
			loaded     = 0;

		tyrexImage.onload = function(){
			loaded++;
			tryInit();
		}
		tyrexImage.src = "img/tyrex.png";

		var eatImage = new Image();
		eatImage.onload = function()
		{
			loaded++;
			tryInit();
		};
		eatImage.src = 'img/eat.png';

		var eatImage2 = new Image();
		eatImage2.onload = function()
		{
			loaded++;
			tryInit();
		};
		eatImage2.src = 'img/chicken.png';

		var eatImage3 = new Image();
		eatImage3.onload = function()
		{
			loaded++;
			tryInit();
		};
		eatImage3.src = 'img/meat.png';

		var eatImage4 = new Image();
		eatImage4.onload = function()
		{
			loaded++;
			tryInit();
		};
		eatImage4.src = 'img/arm.png';

		var eatImage5 = new Image();
		eatImage5.onload = function()
		{
			loaded++;
			tryInit();
		};
		eatImage5.src = 'img/cat.png';

		function tryInit()
		{
			if(loaded === 6)
				init();
		}

		function init () {
			requestAnimationFrame(drawFrame);
			document.onkeydown = function(evt){
				if(keysMap[evt.keyCode] !== undefined){
					keysMap[evt.keyCode] = true;
				}
			}
			document.onkeyup = function(evt){
				if(keysMap[evt.keyCode] !== undefined){
					keysMap[evt.keyCode] = false;
				}
			}
		}

		function drawTyrex () {
			context.save();
			context.translate(tyrex.posX, tyrex.posY);
			context.rotate(tyrex.angle);
			context.drawImage(tyrexImage, -tyrex.width/2,-tyrex.height/2);
			context.restore();
		}

		function drawEat () {
			var eats = [eatImage,eatImage2,eatImage3,eatImage4,eatImage5];
			context.drawImage(eats[rand_image], eat.posX, eat.posY);
		}

		function drawBackground () {
        	context.beginPath(); 
        	context.fillStyle = 'rgba(124,198,92,1)';
        	context.fillRect(0,0,800,600);
			context.fill();
			context.closePath();
		}

		function checkCollision () {
			var distance = Math.sqrt( Math.pow(tyrex.posX - eat.posX, 2) + Math.pow(tyrex.posY - eat.posY, 2));
			if(distance <= 40){
				var score = document.getElementById('score');
				score.innerHTML = parseInt(score.innerHTML) + 10;
				eat.posX = Math.round(Math.random() * width);
				eat.posY = Math.round(Math.random() * height);
				rand_image = Math.round(Math.random());
							if (score.innerHTML >= 20) 
			{
			window.location ="file:///Users/Vincent/Documents/Semaine%20Intensive/Jurassic-Pet-3/index.html#"
			};
			}

		}

		function drawFrame () {
			requestAnimationFrame(drawFrame);

			context.clearRect(0,0,width,height);
			drawBackground();
			moveTyrex();
			drawTyrex();
			checkCollision();
			drawEat();
			
		}

		function moveTyrex () {
				if(keysMap[38] == true){
					tyrex.posY -= 4;
				}
				if(keysMap[40] == true){
					tyrex.posY += 4;
				}
				if(keysMap[37] == true){
					tyrex.posX -= 4;
				}
				if(keysMap[39] == true){
					tyrex.posX += 4;
				}
				if(tyrex.posX < tyrex.width/2) { tyrex.posX = tyrex.width/2 };
				if(tyrex.posX > width - tyrex.width/2) { tyrex.posX = width - tyrex.width/2 };

				if(tyrex.posY < tyrex.width/2) { tyrex.posY = tyrex.width/2 };
				if(tyrex.posY > height - tyrex.width/2) { tyrex.posY = height - tyrex.width/2 };

		}

	};